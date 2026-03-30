import { app } from 'electron'
import path from 'path'
import { Track } from '../../../shared/models/track.model';

const Database = require('better-sqlite3');

const db = new Database(path.join(app.getPath('userData'), 'app.db'))

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