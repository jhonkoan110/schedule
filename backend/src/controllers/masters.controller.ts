import * as express from 'express';
import * as mastersService from '../services/master.service';
const mastersRouter = express.Router();

// Получить всех мастеров
mastersRouter.get('/', async (req: express.Request, res: express.Response) => {
    const masters = await mastersService.getMasters();
    return res.json({ masters });
});

// Создать метсра
mastersRouter.post('/', async (req: express.Request, res: express.Response) => {
    const master = await mastersService.createMaster(req.body);
    return res.json({ master });
});

// Удалить мастера
mastersRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const master = await mastersService.deleteMaster(Number(id));
    return res.json({ master });
});

// Обновить мастера
mastersRouter.put('/', async (req: express.Request, res: express.Response) => {
    const master = await mastersService.updateMaster(req.body);
    return res.json({ master });
});

export default mastersRouter;
