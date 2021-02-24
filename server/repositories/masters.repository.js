import db from '../db';

// Получить всех мастеров
export const getMasters = async () => {
    const masters = await db.query(`SELECT * FROM masters`);
    return masters.rows;
};

// Создать мастера
export const createMaster = async (data) => {
    const { user_id, location_id, specialization_id } = data;
    const newMaster = await db.query(
        `INSERT INTO masters (user_id, location_id, specialization_id) VALUES ($1, $2, $3) RETURNING *`,
        [user_id, location_id, specialization_id],
    );
    return newMaster.rows[0];
};

// Удалить мастера
export const deleteMaster = async (id) => {
    const deletedMaster = await db.query(`DELETE FROM masters WHERE id = $1 RETURNING *`, [id]);
    return deletedMaster.rows[0];
};
