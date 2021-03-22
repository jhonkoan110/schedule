import { defineRole } from './../middlewares/checkRoleMIddleware';
import { RoleRequest } from './../types/Request';
import { Permissions } from './../seeds/permissions.seed';
import { Roles } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as specializationsService from '../services/specializations.service';
import { checkRole } from '../middlewares/CheckRole';
import checkRoleMiddleware from '../middlewares/checkRoleMIddleware';
const specializationsRouter = express.Router();

// Получить все спец-и
specializationsRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Specialization);
            const specializations = await specializationsService.getSpecializations();
            return res.status(200).json({ specializations });
        } catch (error) {
            ErrorHelper.accessHandle(res, error);
        }
    },
);

// Создать спец-ю
specializationsRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Specialization);
            const { name, icon } = req.body;
            const specialization = await specializationsService.createSpecialization({
                name,
                icon,
            });
            return res.json({ specialization });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Удалить спец-ю
specializationsRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Specialization);
            const { id } = req.params;
            const specialization = await specializationsService.deleteSpecialization(Number(id));
            return res.status(200).json({ specialization });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    },
);

// Обновить спец-ю
specializationsRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const { id, name, icon } = req.body;
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Specialization);
            const specialization = await specializationsService.updateSpecialization({
                id,
                name,
                icon,
            });
            return res.status(200).json({ specialization });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    },
);

// Получить по имени
specializationsRouter.get('/', async (req, res) => {
    const { name } = req.body;
    const spec = await specializationsService.findByName(name);
    res.json({ spec });
});

export default specializationsRouter;
