import { RoleRequest } from './../types/Request';
import { Permissions, PermissionSeed } from './../seeds/permissions.seed';
import { Roles, EntitiesAccess } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as specializationsService from '../services/specializations.service';
import { checkRole } from '../middlewares/CheckRole';
import { Rights, RoleSeed } from '../seeds/roles.seed';
import checkRoleMiddleware from '../middlewares/checkRoleMIddleware';
const specializationsRouter = express.Router();

// Получить все спец-и
specializationsRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            checkRole(
                Rights.Admin,
                Permissions.Specialization,
                Permissions.Location,
                Permissions.Master,
            );
            const specializations = await specializationsService.getSpecializations();
            return res.status(200).json({ specializations });
        } catch (error) {
            ErrorHelper.accessHandle(res, error);
        }
    },
);

// Создать спец-ю
specializationsRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const { name, icon } = req.body;
        const specialization = await specializationsService.createSpecialization({ name, icon });
        return res.json({ specialization });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить спец-ю
specializationsRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const specialization = await specializationsService.deleteSpecialization(Number(id));
        return res.status(200).json({ specialization });
    } catch (error) {
        ErrorHelper.deleteHandle(res, error);
    }
});

// Обновить спец-ю
specializationsRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const { id, name, icon } = req.body;
        const specialization = await specializationsService.updateSpecialization({
            id,
            name,
            icon,
        });
        return res.status(200).json({ specialization });
    } catch (error) {
        ErrorHelper.notFoundHandle(res, error);
    }
});

// Получить по имени
specializationsRouter.get('/', async (req, res) => {
    const { name } = req.body;
    const spec = await specializationsService.findByName(name);
    res.json({ spec });
});

export default specializationsRouter;
