import { Permissions } from './../seeds/permissions.seed';
import { defineRole } from './../middlewares/checkRoleMIddleware';
import { checkRole } from './../middlewares/CheckRole';
import { RoleRequest } from './../types/Request';
import { Roles } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as locationTypesService from '../services/locationTypes.service';
import checkRoleMiddleware from '../middlewares/checkRoleMIddleware';

const locationTypesRouter = express.Router();

// Получить все типы локации
locationTypesRouter.get(
    '/',
    checkRoleMiddleware([
        Roles.Admin,
        Roles.Client,
        Roles.Operator,
        Roles.Master,
        Roles.ResponsibleForMasters,
    ]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.LocationType);

            const locationTypes = await locationTypesService.getLocationTypes();
            return res.status(200).json({ locationTypes });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
);

// Создать тип локации
locationTypesRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.LocationType);

            const { name } = req.body;
            const locationType = await locationTypesService.createLocationType(
                name
            );
            return res.status(200).json({ locationType });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
);

// Удалить тип локации
locationTypesRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.LocationType);

            const { id } = req.params;
            const locationType = await locationTypesService.deleteLocationType(
                Number(id)
            );
            return res.status(200).json({ locationType });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    }
);

// Обновить тип локации
locationTypesRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.LocationType);

            const locationType = await locationTypesService.updateLocationType(
                req
            );
            return res.status(200).json(locationType);
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    }
);

export default locationTypesRouter;
