import { Track } from '../../src/app/shared/models/track.model';
import { app } from 'electron';
import * as path from 'path';

const db = require('better-sqlite3')((app.getPath('userData'), 'safe-and-sound.db'));
db.pragma('journal_mode = WAL');

export function initDb() {
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
  `)
}

export function insertTrack(track: Track) {
  const stmt = db.prepare(`
    INSERT INTO tracks VALUES (@id, @title, @artist, @album, @artworkUrl, @path, @duration, @addedAt, @lastPlayed)
  `)
  stmt.run(track)
}

export function getAllTracks() {
    const stmt = db.prepare(`SELECT * FROM tracks`);
    return stmt.all();
}

export function getLatestAddedTracks(number: number) {
    const stmt = db.prepare(`SELECT * FROM tracks ORDER BY addedAt DESC LIMIT ?`);
    return stmt.all(number);
}

export function updateLastPlayed(id: string) {
  const stmt = db.prepare(`UPDATE tracks SET lastPlayed = ? WHERE id = ?`);
  stmt.run(Date.now(), id);
}

export function getRecentTracks(number: number) {
  const stmt = db.prepare(`SELECT * FROM tracks WHERE lastPlayed > 0 ORDER BY lastPlayed DESC LIMIT ?`);
  return stmt.all(number);
}
