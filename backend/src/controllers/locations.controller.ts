import { Permissions } from './../seeds/permissions.seed';
import { checkRole } from './../middlewares/CheckRole';
import { defineRole } from './../middlewares/checkRoleMIddleware';
import { RoleRequest } from './../types/Request';
import { Roles } from './../initialState/roles';
import * as express from 'express';
import { ErrorHelper } from '../errors/ErrorHelper';
import { NotFoundError } from '../errors/NotFoundError';
import checkRoleMiddleware from '../middlewares/checkRoleMIddleware';
import * as locationsService from '../services/locations.service';
const locationsRouter = express.Router();

// Получить все локации
locationsRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Location);

            const locations = await locationsService.getLocations();
            return res.status(200).json({ locations });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Создать локацию
locationsRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Location);

            const location = await locationsService.createLocation(req.body);
            return res.status(200).json({ location });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Удалить локацию
locationsRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Location);

            const { id } = req.params;
            const location = await locationsService.deleteLocation(Number(id));

            return res.status(200).json({ location });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    },
);

// Обновить локацию
locationsRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Location);

            const location = await locationsService.updateLocation(req.body);
            return res.status(200).json({ location });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    },
);

export default locationsRouter;
