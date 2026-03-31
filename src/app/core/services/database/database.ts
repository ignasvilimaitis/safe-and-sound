import { Track } from '../../../shared/models/track.model';
import { app } from 'electron';
import * as path from 'path';

const db = require('better-sqlite3')(path.join(app.getPath('userData'), 'safe-and-sound.db'));

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      title TEXT,
      artist TEXT,
      album TEXT,
      file_path TEXT,
      duration INTEGER,
      created_at INTEGER
    )
  `)
}

export function insertTrack(track: Track) {
  const stmt = db.prepare(`
    INSERT INTO tracks VALUES (@id, @title, @artist, @album, @filePath, @duration, @createdAt)
  `)
  stmt.run(track)
}