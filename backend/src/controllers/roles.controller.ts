import { createConnection, getConnection, getRepository } from 'typeorm';
import { Role } from './../models/Role';
import { getConnectionManager } from 'typeorm';
import * as express from 'express';
import * as rolesService from '../services/roles.service';
import { RoleProps } from '../repositories/roles.repository';
const rolesRouter = express.Router();

// Получить все роли
rolesRouter.get('/', async (req, res) => {
    const roles = await rolesService.getRoles();
    res.json({ roles });
});

// Создать роль
rolesRouter.post('/', async (req, res) => {
    const props: RoleProps = req.body;
    const role = await rolesService.createRole(props);
    res.json({ role });
});

// Удалить роль
rolesRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const role = await rolesService.deleteRole(+id);
    res.json({ role });
});

//Обновить роль
rolesRouter.put('/', async (req: express.Request, res: express.Response) => {
    const { id, name, rights } = req.body;
    const role = await rolesService.updateRole({ id, name, rights });
    res.json({ role });
});

export default rolesRouter;
