import Router from 'express';
import checkRoleMiddleware from '../middlewares/checkRoleMiddleware';
import * as mastersService from '../services/masters.service';

const mastersRouter = new Router();

// Получить всех мастеров
mastersRouter.get('/', checkRoleMiddleware([1, 2]), async (req, res) => {
    const masters = await mastersService.getMasters();
    return res.status(200).json({ masters });
});

// Создать мастера
mastersRouter.post('/', async (req, res) => {
    const newMaster = await mastersService.createMaster(req.body);
    return res.status(200).json({ newMaster });
});

// Удалить мастера
mastersRouter.post('/', async (req, res) => {
    const { id } = req.params;
    const deletedMaster = await mastersService.deleteMaster(id);
    return res.status(200).json({ deletedMaster });
});

export default mastersRouter;
