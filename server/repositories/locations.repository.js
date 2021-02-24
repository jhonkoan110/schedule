import db from '../db';

// Получить все локации
export const getLocations = async () => {
    const locations = await db.query(`SELECT * FROM locations`);
    return locations.rows;
};

// Создать локацию
export const createLocation = async (data) => {
    const { parent_id, name, coordinates, type_id } = data;
    const newLocation = await db.query(
        `INSERT INTO locations (parent_id, name, coordinates, type_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [parent_id, name, coordinates, type_id],
    );
    return newLocation.rows[0];
};

// Удалить локацию
export const deleteLocation = async (id) => {
    const deletedLocation = await db.query(`DELETE FROM locations WHERE id = $1 RETURNING *`, [id]);
    return deletedLocation.rows[0];
};
