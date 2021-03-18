import { DeleteError } from './../errors/deleteError';
import * as express from 'express';
import * as rolesService from '../services/roles.service';
import { RoleProps } from '../repositories/roles.repository';
import { NotFoundError } from '../errors/notFoundError';
const rolesRouter = express.Router();

// Получить все роли
rolesRouter.get('/', async (req, res) => {
    try {
        const roles = await rolesService.getRoles();
        return res.status(200).json({ roles });
    } catch (err) {
        return res.status(500).json({ err });
    }
});

// promise.all

// Создать роль
rolesRouter.post('/', async (req, res) => {
    try {
        const props: RoleProps = req.body;
        const role = await rolesService.createRole(props);
        return res.status(200).json({ role });
    } catch (err) {
        return res.status(500).json({ err });
    }
});

// Удалить роль
rolesRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const role = await rolesService.deleteRole(+id);
        res.status(200).json({ role });
    } catch (err) {
        if (err instanceof NotFoundError) {
            res.status(404).json(err);
        } else if (err instanceof DeleteError) {
            res.status(400).json(err.message);
        } else {
            res.status(500).json(err.message);
        }
    }
});

// Обновить роль
rolesRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const { id, name, rights } = req.body;
        const role = await rolesService.updateRole({ id, name, rights });
        return res.status(200).json({ role });
    } catch (err) {
        return res.status(500).json({ err });
    }
});

export default rolesRouter;
