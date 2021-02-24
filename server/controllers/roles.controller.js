import Router from 'express';
import checkRole from '../middlewares/checkRoleMiddleware';
import * as rolesService from '../services/roles.service';

const rolesRouter = new Router();

// Получить все роли
rolesRouter.get('/', async (req, res) => {
    const roles = await rolesService.getRoles();
    res.status(200).json(roles);
});

// Создать роль
rolesRouter.post('/', async (req, res) => {
    const { name, rights } = req.body;
    const newRole = await rolesService.createRole(name, rights);
    res.status(200).json(newRole);
});

// Удалить роль
rolesRouter.delete('/:id', checkRole(1), async (req, res) => {
    const { id } = req.params;
    const deletedRole = await rolesService.deleteRole(id);
    res.status(200).json({ deletedRole });
});

export default rolesRouter;
