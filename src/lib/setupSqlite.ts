import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(':memory:');

export async function setupDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE awards (
      year INTEGER,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner TEXT
    )`);
  });

}


