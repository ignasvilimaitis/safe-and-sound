import { app, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as mm from 'music-metadata';
import { v4 as uuidv4 } from 'uuid';

import { insertTrack, getAllTracks } from './database/database';
import { Track } from '../src/app/shared/models/track.model';
import { uint8ArrayToBase64 } from 'uint8array-extras';
import { DatabaseService } from '../src/app/core/services/database/database.service';
import { get } from 'http';

const appDataPath = app.getPath('userData');

function saveMp3(fileName: string, data: Buffer) {
    if (!fs.existsSync(path.join(appDataPath, 'tracks'))) {
        fs.mkdirSync(path.join(appDataPath, 'tracks'));
    }
    const filePath = path.join(appDataPath, 'tracks', fileName);
    fs.writeFileSync(filePath, data);
}

function picturetoData(picture: mm.IPicture[]) {
    return `data:${picture[0].format};base64,${uint8ArrayToBase64(picture[0].data)}`; // TODO: Perhaps change from Base64 to a local file.
}


export function initIpc() {
    ipcMain.handle('open-file-dialog', async (event) => { // TODO: Move this to a separate file
        const { filePaths } = await dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Audio Files', extensions: ['mp3', 'wav', 'flac'] }
            ]
        });
        if (!filePaths.length) return [];

        const tracks: Track[] = await Promise.all(filePaths.map(async (filePath) => {

            const metadata = await mm.parseFile(filePath);
            const artworkUrl = picturetoData(metadata.common.picture || []);

            saveMp3(path.basename(filePath), fs.readFileSync(filePath));

            const track: Track = {
                id: uuidv4(),
                title: metadata.common.title || path.basename(filePath),
                artist: metadata.common.artist || 'Unknown Artist',
                album: metadata.common.album || 'Unknown Album',
                artworkUrl: artworkUrl,
                path: path.join(appDataPath, 'tracks', path.basename(filePath)),
                duration: metadata.format.duration || 0,
                addedAt: Date.now(),
                modifiedAt: Date.now(),
            };
            return track;
        }));
        return tracks;
    });


    ipcMain.handle('save-tracks', async (event, tracks) => {
        for (const track of tracks) {
            insertTrack(track);// Update the tracks in the service after inserting into the database
        }
    })

    ipcMain.handle('get-tracks', async (event) => {
        const tracks = await getAllTracks();
        return tracks;
    });
}