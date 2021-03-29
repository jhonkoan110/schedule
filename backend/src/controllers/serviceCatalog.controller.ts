import { Permissions } from './../seeds/permissions.seed';
import { checkRole } from './../middlewares/CheckRole';
import { RoleRequest } from './../types/Request';
import { Roles } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as serviceCatalogService from '../services/serviceCatalog.service';
import checkRoleMiddleware, { defineRole } from '../middlewares/checkRoleMIddleware';
const serviceCatalogRouter = express.Router();

// Получить все услуги
serviceCatalogRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin, Roles.Operator]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.ServiceCatalog);

            const serviceCatalog = await serviceCatalogService.getServiceCatalog();
            return res.status(200).json({ serviceCatalog });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Создать услугу
serviceCatalogRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.ServiceCatalog);

            const serviceCatalog = await serviceCatalogService.createServiceCatalog(req.body);
            return res.status(200).json({ serviceCatalog });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Удалить услугу
serviceCatalogRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.ServiceCatalog);

            const { id } = req.params;
            const serviceCatalog = await serviceCatalogService.deleteServiceCatalog(Number(id));
            return res.status(200).json({ serviceCatalog });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    },
);

// Обновить услугу
serviceCatalogRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.ServiceCatalog);

            const serviceCatalog = await serviceCatalogService.updateServicaCatalog(req.body);
            return res.status(200).json({ serviceCatalog });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    },
);

export default serviceCatalogRouter;
