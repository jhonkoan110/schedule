import db from '../db';

// Получить все роли
export const getRoles = async () => {
    const roles = await db.query(`SELECT * FROM roles`);
    return roles.rows;
};

// Создать роль
export const createRole = async (name, rights) => {
    const newRole = await db.query(`INSERT INTO roles (name, rights) values ($1, $2) RETURNING *`, [
        name,
        rights,
    ]);
    return newRole.rows[0];
};

// Удалить роль
export const deleteRole = async (role_id) => {
    const deletedRole = await db.query(`DELETE FROM roles WHERE id = $1`, [role_id]);
    return deletedRole.rows[0];
};
