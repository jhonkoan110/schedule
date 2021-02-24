import db from '../db';

// Получить все расписания
export const getAllSchedule = async () => {
    const schedule = await db.query(`SELECT * FROM schedule`);
    return schedule.rows;
};

// Получить расписание мастера
export const getSchedule = async (master_id) => {
    const schedule = await db.query(`SELECT * FROM schedule WHERE master_id = $1`, [master_id]);
    return schedule.rows[0];
};

// Создать расписание мастера
export const createSchedule = async (reqBody) => {
    const { master_id, working_hours, status } = reqBody;
    const newSchedule = await db.query(
        `INSERT INTO schedule (master_id, working_hours, status) VALUES ($1, $2, $3) RETURNING *`,
        [master_id, working_hours, status],
    );
    return newSchedule.rows[0];
};

// Удалить расписание мастера
export const deleteSchedule = async (master_id) => {
    const deletedSchedule = await db.query(`DELETE FROM schedule WHERE master_id = $1`, [
        master_id,
    ]);
    return deletedSchedule.rows[0];
};
