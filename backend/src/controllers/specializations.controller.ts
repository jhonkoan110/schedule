import * as express from 'express';
import * as specializationsService from '../services/specializations.service';
const specializationsRouter = express.Router();

// Получить все спец-и
specializationsRouter.get('/', async (req, res) => {
    const specializations = await specializationsService.getSpecializations();
    res.json({ specializations });
});

// Создать спец-ю
specializationsRouter.post('/', async (req: express.Request, res: express.Response) => {
    const { name, icon } = req.body;
    const specialization = await specializationsService.createSpecialization({ name, icon });
    res.json({ specialization });
});

// Удалить спец-ю
specializationsRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const specialization = await specializationsService.deleteSpecialization(Number(id));
    res.json({ specialization });
});

// Обновить спец-ю
specializationsRouter.put('/', async (req: express.Request, res: express.Response) => {
    const { id, name, icon } = req.body;
    const specialization = await specializationsService.updateSpecialization({ id, name, icon });
    res.json({ specialization });
});

export default specializationsRouter;
