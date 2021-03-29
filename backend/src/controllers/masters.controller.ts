import { Permissions } from './../seeds/permissions.seed';
import { checkRole } from './../middlewares/CheckRole';
import { RoleRequest } from './../types/Request';
import { Roles } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as mastersService from '../services/master.service';
import checkRoleMiddleware, { defineRole } from '../middlewares/checkRoleMIddleware';

const mastersRouter = express.Router();

// Получить всех мастеров
mastersRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin, Roles.Operator]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Master);

            const masters = await mastersService.getMasters();
            return res.status(200).json({ masters });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Создать метсра
mastersRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Master);

            const master = await mastersService.createMaster(req.body);
            return res.status(200).json({ master });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Удалить мастера
mastersRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Master);

            const { id } = req.params;
            const master = await mastersService.deleteMaster(Number(id));
            return res.status(200).json({ master });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    },
);

// Обновить мастера
mastersRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Master);

            const master = await mastersService.updateMaster(req.body);
            return res.status(200).json({ master });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    },
);

export default mastersRouter;
