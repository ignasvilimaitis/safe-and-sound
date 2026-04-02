import {app, BrowserWindow, screen, ipcMain, dialog} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as mm from 'music-metadata';
import { v4 as uuidv4 } from 'uuid';
import { initDb, insertTrack, getAllTracks } from './database/database';
import { Track } from '../src/app/shared/models/track.model';
import {uint8ArrayToBase64} from 'uint8array-extras';

const appDataPath = app.getPath('userData');

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function saveMp3(fileName: string, data: Buffer) {
  if(!fs.existsSync(path.join(appDataPath, 'tracks'))) {
    fs.mkdirSync(path.join(appDataPath, 'tracks'));
  }
  const filePath = path.join(appDataPath, 'tracks', fileName);
  fs.writeFileSync(filePath, data);
}

function picturetoData(picture: mm.IPicture[]) {
  return `data:${picture[0].format};base64,${uint8ArrayToBase64(picture[0].data)}`;
}

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
      webSecurity: !serve
    },
  });

  if (serve) {
    import('electron-debug').then(debug => {
      debug.default({isEnabled: true, showDevTools: true});
    });

    import('electron-reloader').then(reloader => {
      const reloaderFn = (reloader as any).default || reloader;
      reloaderFn(module);
    });
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './browser/index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/browser/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/browser/index.html';
    }

    const fullPath = path.join(__dirname, pathIndex);
    const url = `file://${path.resolve(fullPath).replace(/\\/g, '/')}`;
    win.loadURL(url);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
app.on('ready', () => setTimeout(() => {
  initDb();
  createWindow();
}, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


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
  insertTrack(track);
  }})

ipcMain.handle('get-tracks', async (event) => {
  const tracks = await getAllTracks();
  return tracks;
});
