import { Permissions } from './../seeds/permissions.seed';
import { checkRole } from './../middlewares/CheckRole';
import { RoleRequest } from './../types/Request';
import { Roles } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as scheduleService from '../services/schedule.service';
import checkRoleMiddleware, { defineRole } from '../middlewares/checkRoleMIddleware';

const schdeuleRouter = express.Router();

// Получить расписание
schdeuleRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Schedule);

            const schedule = await scheduleService.getSchedule();
            return res.status(200).json({ schedule });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Создать расписание
schdeuleRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Schedule);

            const schedule = await scheduleService.createSchedule(req.body);
            return res.status(200).json({ schedule });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
);

// Удалить расписание
schdeuleRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Schedule);

            const { id } = req.params;
            const schedule = await scheduleService.deleteSchedule(Number(id));
            return res.status(200).json({ schedule });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    },
);

// Обновить расписание
schdeuleRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Schedule);

            const schedule = await scheduleService.updateSchedule(req.body);
            return res.status(200).json({ schedule });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    },
);

export default schdeuleRouter;
