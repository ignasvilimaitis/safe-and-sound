"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = initDb;
exports.insertTrack = insertTrack;
exports.getAllTracks = getAllTracks;
exports.getLatestAddedTracks = getLatestAddedTracks;
exports.updateLastPlayed = updateLastPlayed;
exports.getRecentTracks = getRecentTracks;
const electron_1 = require("electron");
const db = require('better-sqlite3')((electron_1.app.getPath('userData'), 'safe-and-sound.db'));
db.pragma('journal_mode = WAL');
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
      lastPlayed INTEGER
    )
  `);
}
function insertTrack(track) {
    const stmt = db.prepare(`
    INSERT INTO tracks VALUES (@id, @title, @artist, @album, @artworkUrl, @path, @duration, @addedAt, @lastPlayed)
  `);
    stmt.run(track);
}
function getAllTracks() {
    const stmt = db.prepare(`SELECT * FROM tracks`);
    return stmt.all();
}
function getLatestAddedTracks(number) {
    const stmt = db.prepare(`SELECT * FROM tracks ORDER BY addedAt DESC LIMIT ?`);
    return stmt.all(number);
}
function updateLastPlayed(id) {
    const stmt = db.prepare(`UPDATE tracks SET lastPlayed = ? WHERE id = ?`);
    stmt.run(Date.now(), id);
}
function getRecentTracks(number) {
    const stmt = db.prepare(`SELECT * FROM tracks WHERE lastPlayed > 0 ORDER BY lastPlayed DESC LIMIT ?`);
    return stmt.all(number);
}
//# sourceMappingURL=database.js.map