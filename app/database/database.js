"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = initDb;
exports.insertTrack = insertTrack;
exports.getAllTracks = getAllTracks;
const electron_1 = require("electron");
const db = require('better-sqlite3')((electron_1.app.getPath('userData'), 'safe-and-sound.db'));
function initDb() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      title TEXT,
      artist TEXT,
      album TEXT,
      artworkUrl TEXT,
      path TEXT,
      duration INTEGER,
      addedAt INTEGER,
      modifiedAt INTEGER
    )
  `);
}
function insertTrack(track) {
    const stmt = db.prepare(`
    INSERT INTO tracks VALUES (@id, @title, @artist, @album, @artworkUrl, @path, @duration, @addedAt, @modifiedAt)
  `);
    stmt.run(track);
}
function getAllTracks() {
    const stmt = db.prepare(`SELECT * FROM tracks`);
    return stmt.all();
}
//# sourceMappingURL=database.js.map