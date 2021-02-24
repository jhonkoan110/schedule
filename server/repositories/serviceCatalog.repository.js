import db from '../db';

// Получить все услуги
export const getServices = async () => {
    const services = await db.query(`SELECT * FROM services`);
    return services.rows;
};

// Создать услугу
export const createService = async (data) => {
    const { name, price, duration, specialization } = data;
    const newService = await db.query(
        `INSERT INTO services (name, price, duration, specialization) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, price, duration, specialization],
    );
    return newService.rows[0];
};

// Удалить услугу
export const deleteService = async (id) => {
    const deletedService = await db.query(`DELETE FROM services WHERE id = $1 RETURNING *`, [id]);
    return deletedService.rows[0];
};
