import db from '../db';

// Получить все локации
export const getLocations = async () => {
    const locations = await db.query(`SELECT * FROM locations`);
    return locations.rows;
}

// Создать локацию
export const createLocation = async () => {

}