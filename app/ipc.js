"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initIpc = initIpc;
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
const mm = require("music-metadata");
const uuid_1 = require("uuid");
const database_1 = require("./database/database");
const uint8array_extras_1 = require("uint8array-extras");
const appDataPath = electron_1.app.getPath('userData');
function saveMp3(fileName, data) {
    if (!fs.existsSync(path.join(appDataPath, 'tracks'))) {
        fs.mkdirSync(path.join(appDataPath, 'tracks'));
    }
    const filePath = path.join(appDataPath, 'tracks', fileName);
    fs.writeFileSync(filePath, data);
}
function picturetoData(picture) {
    return `data:${picture[0].format};base64,${(0, uint8array_extras_1.uint8ArrayToBase64)(picture[0].data)}`;
}
function initIpc() {
    electron_1.ipcMain.handle('open-file-dialog', (event) => __awaiter(this, void 0, void 0, function* () {
        const { filePaths } = yield electron_1.dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Audio Files', extensions: ['mp3', 'wav', 'flac'] }
            ]
        });
        if (!filePaths.length)
            return [];
        const tracks = yield Promise.all(filePaths.map((filePath) => __awaiter(this, void 0, void 0, function* () {
            const metadata = yield mm.parseFile(filePath);
            const artworkUrl = picturetoData(metadata.common.picture || []);
            saveMp3(path.basename(filePath), fs.readFileSync(filePath));
            const track = {
                id: (0, uuid_1.v4)(),
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
        })));
        return tracks;
    }));
    electron_1.ipcMain.handle('save-tracks', (event, tracks) => __awaiter(this, void 0, void 0, function* () {
        for (const track of tracks) {
            (0, database_1.insertTrack)(track); // Update the tracks in the service after inserting into the database
        }
    }));
    electron_1.ipcMain.handle('get-tracks', (event) => __awaiter(this, void 0, void 0, function* () {
        const tracks = yield (0, database_1.getAllTracks)();
        return tracks;
    }));
    electron_1.ipcMain.handle('get-latest-track', (event, number) => __awaiter(this, void 0, void 0, function* () {
        const track = yield (0, database_1.getLatestTrack)(number);
        return track;
    }));
}
//# sourceMappingURL=ipc.js.map