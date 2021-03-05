import * as express from 'express';
import * as scheduleService from '../services/schedule.service';

const schdeuleRouter = express.Router();

// Получить расписание
schdeuleRouter.get('/', async (req: express.Request, res: express.Response) => {
    const schedule = await scheduleService.getSchedule();
    return res.json({ schedule });
});

// Создать расписание
schdeuleRouter.post('/', async (req: express.Request, res: express.Response) => {
    const schedule = await scheduleService.createSchedule(req.body);
    return res.json({ schedule });
});

// Удалить расписание
schdeuleRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const schedule = await scheduleService.deleteSchedule(Number(id));
    return res.json({ schedule });
});

// Обновить расписание
schdeuleRouter.put('/', async (req: express.Request, res: express.Response) => {
    const schedule = await scheduleService.updateSchedule(req.body);
    return res.json({ schedule });
});

export default schdeuleRouter;
