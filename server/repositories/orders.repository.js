import db from '../db';

// Получить все заказа
export const getOrders = async () => {
    const orders = await db.query(`SELECT * FROM orders`);
    return orders.rows;
};

// Создать заказ
export const createOrder = async (data, photoName) => {
    const {
        master_id,
        user_id,
        description,
        start_date,
        end_date,
        status,
        status_color,
        commentary,
        service_id,
    } = data;

    const { photo } = photoName;

    const newOrder = await db.query(
        `INSERT INTO orders (master_id, user_id, description, start_date, end_date, status, status_color, commentary, photo, service_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
            master_id,
            user_id,
            description,
            start_date,
            end_date,
            status,
            status_color,
            commentary,
            photo,
            service_id,
        ],
    );

    return newOrder.rows[0];
};

// Удалить заказ
export const deleteOrder = async (id) => {
    const deletedOrder = await db.query(`DELETE FROM orders WHERE id = $1 RETURNING *`, [id]);
    return deletedOrder.rows[0];
};
