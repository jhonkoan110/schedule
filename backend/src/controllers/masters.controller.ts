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

export default mastersRouter;
