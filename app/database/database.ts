import { Track } from '../../src/app/shared/models/track.model';
import { app } from 'electron';
import * as path from 'path';

const db = require('better-sqlite3')((app.getPath('userData'), 'safe-and-sound.db'));

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      title TEXT,
      artist TEXT,
      album TEXT,
      path TEXT,
      duration INTEGER,
      addedAt INTEGER,
      modifiedAt INTEGER
    )
  `)
}

export function insertTrack(track: Track) {
  const stmt = db.prepare(`
    INSERT INTO tracks VALUES (@id, @title, @artist, @album, @path, @duration, @addedAt, @modifiedAt)
  `)
  stmt.run(track)
}

export function getAllTracks() {
    const stmt = db.prepare(`SELECT * FROM tracks`);
    return stmt.all();
}
