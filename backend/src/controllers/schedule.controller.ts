import { ErrorHelper } from './../errors/ErrorHelper';
import { NotFoundError } from '../errors/NotFoundError';
import * as express from 'express';
import * as scheduleService from '../services/schedule.service';

const schdeuleRouter = express.Router();

// Получить расписание
schdeuleRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const schedule = await scheduleService.getSchedule();
        return res.status(200).json({ schedule });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать расписание
schdeuleRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const schedule = await scheduleService.createSchedule(req.body);
        return res.status(200).json({ schedule });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить расписание
schdeuleRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const schedule = await scheduleService.deleteSchedule(Number(id));
        return res.status(200).json({ schedule });
    } catch (error) {
        ErrorHelper.deleteHandle(res, error);
    }
});

// Обновить расписание
schdeuleRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const schedule = await scheduleService.updateSchedule(req.body);
        return res.status(200).json({ schedule });
    } catch (error) {
        ErrorHelper.notFoundHandle(res, error);
    }
});

export default schdeuleRouter;
