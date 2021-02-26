import db from '../db';

// Получить все заказа
export const getOrders = async () => {
    const orders = await db.query(`SELECT * FROM orders`);
    return orders.rows;
};

// Получить заказы по id клиента
export const getOrdersByClient = async (user_id) => {
    const orders = await db.query(`SELECT * FROM orders WHERE user_id = $1`, [user_id]);
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

// Обновить заказ (взять в работу, завершить, отказать)
export const updateOrder = async (data) => {
    const {
        id,
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

    const updatedOrder = await db.query(
        `UPDATE orders SET master_id = $1, user_id = $2, description = $3, start_date = $4, end_date = $5, status = $6, status_color = $7, commentary = $8, photo = $9, service_id = $10 WHERE id = $11 RETURNING *`,
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
            id,
        ],
    );

    return updatedOrder.rows[0];
};

// Удалить заказ
export const deleteOrder = async (id) => {
    const deletedOrder = await db.query(`DELETE FROM orders WHERE id = $1 RETURNING *`, [id]);
    return deletedOrder.rows[0];
};
