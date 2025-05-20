// dbService.js
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

const dbName = 'reportsDatabase';

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY NOT NULL,
        farmName TEXT,
        location TEXT,
        crop TEXT,
        fertilizer TEXT,
        soil TEXT,
        photoUri TEXT,
        observation TEXT
      );
    `);
    Alert.alert('Succes', 'DB connection')
  } catch (err) {
    Alert.alert('Error', 'Failed to initialize database.');
  }
};

export const insertReport = async ({
    farmName,
    location,
    crop,
    fertilizer,
    soil,
    photoUri,
    observation,
    }) => {
    try {
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.runAsync(
        `INSERT INTO reports (farmName, location, crop, fertilizer, soil, photoUri, observation) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [farmName, JSON.stringify(location), crop, fertilizer, soil, photoUri, observation]
        );
        return true;
    } catch (err) {
        console.error('Insert error:', err);
        return false;
  }
};
