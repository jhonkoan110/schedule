import db from '../db';

// Получить все специализации
export const getSpecializations = async () => {
    const specializations = await db.query(`SELECT * FROM specializations`);
    return specializations.rows;
};

// Создать спуциализацию
export const createSpecialization = async (newSpec) => {
    const { name, icon } = newSpec;
    const spec = await db.query(
        `INSERT INTO specializations (name, icon) VALUES ($1, $2) RETURNING *`,
        [name, icon],
    );
    return spec.rows[0];
};

// Удалить специализацию
export const deleteSpecialization = async (id) => {
    const deletedSpec = await db.query(`DELETE FROM specializations WHERE id = $1 RETURNING *`, [
        id,
    ]);
    return deletedSpec.rows[0];
};
