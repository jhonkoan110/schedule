import Router from 'express';
import * as scheduleService from '../services/schedule.service';

const scheduleRouter = new Router();

// Получить все расписания
scheduleRouter.get('/', async (req, res) => {
    const schedule = await scheduleService.getAllSchedule();
    return res.status(200).json({ schedule });
});

// Получить расписание мастера
scheduleRouter.get('/:master_id', async (req, res) => {
    const { master_id } = req.params;
    const schedule = await scheduleService.getSchedule(master_id);
    res.status(200).json({ schedule });
});

// Создать расписание мастера
scheduleRouter.post('/', async (req, res) => {
    const newSchedule = await scheduleService.createSchedule(req.body);
    res.status(200).json({ newSchedule });
});

// Удалить расписание мастера
scheduleRouter.delete('/:master_id', async (req, res) => {
    const { master_id } = req.params;
    const deletedSchedule = await scheduleService.deleteSchedule(master_id);
    return res.status(200).json({ deletedSchedule });
});

export default scheduleRouter;
