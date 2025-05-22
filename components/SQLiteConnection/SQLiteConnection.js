// dbService.js
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

const dbName = 'reportsDatabase';

// FUNTION TO OPEN DATABASE
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

// FUNCTION INSERT DATA IN DATABASE
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

export const deleteAllData = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('reportsDatabase');
            await db.runAsync('DELETE FROM reports');
            const results = await db.getAllAsync('SELECT * FROM reports');
            Alert.alert('Delete data', 'Todos los datos eliminados de la tabla reports.');
        } catch (err) {
            console.error('Error al eliminar datos:', err);
        }
    };
