import db from '../db';

// Получить все типы локаций
export const getLocationTypes = async () => {
    const locationTypes = await db.query(`SELECT * FROM location_types`);
    return locationTypes.rows;
};

// Создать тип локации
export const createLocationType = async (data) => {
    const { name } = data;
    const newLocationType = await db.query(
        `INSERT INTO location_types (name) VALUES ($1) RETURNING *`,
        [name],
    );
    return newLocationType.rows[0];
};

// Удалить тип локации
export const deleteLocationType = async (id) => {
    const deletedLocationType = await db.query(
        `DELETE FROM location_types WHERE id = $1 RETURNING *`,
        [id],
    );
    return deletedLocationType.rows[0];
};
