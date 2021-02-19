import db from '../db';

// Получение пользователя
export const getOneUser = async (login) => {
    const user = await db.query(`SELECT * FROM users WHERE login = $1`, [login]);
    return user.rows[0];
};

// Создание пользователя
export const createUser = async (user) => {
    const { login, password, role_id, firstname, lastname, middlename } = user;
    const newUser = await db.query(
        `INSERT INTO users (login, password, role_id, firstname, lastname, middlename) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [login, password, role_id, firstname, lastname, middlename],
    );
    return newUser.rows[0];
};
