import { NotFoundError } from './../errors/notFoundError';
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
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
});

// Обновить расписание
schdeuleRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const schedule = await scheduleService.updateSchedule(req.body);
        return res.status(200).json({ schedule });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
});

export default schdeuleRouter;
