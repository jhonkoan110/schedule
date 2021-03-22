import { RoleRequest } from './../types/Request';
import { defineRole } from './../middlewares/checkRoleMIddleware';
import { Roles } from './../initialState/roles';
import { Rights } from './../seeds/roles.seed';
import { Permissions } from './../seeds/permissions.seed';
import { DeleteError } from '../errors/DeleteError';
import * as express from 'express';
import * as rolesService from '../services/roles.service';
import { RoleProps } from '../repositories/roles.repository';
import { NotFoundError } from '../errors/NotFoundError';
import { EntitiesAccess } from '../initialState/roles';
import { ErrorHelper } from '../errors/ErrorHelper';
import { checkRole } from '../middlewares/CheckRole';
import { Permission } from '../models/Permission';
import checkRoleMiddleware from '../middlewares/checkRoleMIddleware';

const rolesRouter = express.Router();

// Получить все роли
rolesRouter.get('/', checkRoleMiddleware([Roles.Admin]), async (req: RoleRequest, res) => {
    try {
        // Проверка роли
        const roleCheck = defineRole(req.user.role);
        checkRole(roleCheck, Permissions.Role);

        const roles = await rolesService.getRoles();
        return res.status(200).json({ roles });
    } catch (err) {
        return res.status(500).json({ err });
    }
});

// Создать роль
rolesRouter.post('/', checkRoleMiddleware([Roles.Admin]), async (req: RoleRequest, res) => {
    try {
        // Проверка роли
        const roleCheck = defineRole(req.user.role);
        checkRole(roleCheck, Permissions.Role);

        if (!req.body.roles) {
            res.status(403).json({ message: 'Нет прав' });
        }

        if (!req.body.roles.some(EntitiesAccess.Roles)) {
            res.status(403).json({ message: 'Нет прав' });
        }

        const props: RoleProps = req.body;
        const role = await rolesService.createRole(props);
        return res.status(200).json({ role });
    } catch (err) {
        ErrorHelper.accessHandle(res, err);
    }
});

// Удалить роль
rolesRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const roleCheck = defineRole(req.user.role);
            checkRole(roleCheck, Permissions.Role);

            const { id } = req.params;
            const role = await rolesService.deleteRole(+id);
            res.status(200).json({ role });
        } catch (err) {
            ErrorHelper.deleteHandle(res, err);
        }
    },
);

// Обновить роль
rolesRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const roleCheck = defineRole(req.user.role);
            checkRole(roleCheck, Permissions.Role);

            const { id, name, permissions } = req.body;
            const role = await rolesService.updateRole({ id, name, permissions });
            return res.status(200).json({ role });
        } catch (err) {
            ErrorHelper.notFoundHandle(res, err);
        }
    },
);

export default rolesRouter;
