import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import * as express from 'express';
import * as mastersService from '../services/master.service';
const mastersRouter = express.Router();

// Получить всех мастеров
mastersRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const masters = await mastersService.getMasters();
        return res.status(200).json({ masters });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать метсра
mastersRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const master = await mastersService.createMaster(req.body);
        return res.status(200).json({ master });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить мастера
mastersRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const master = await mastersService.deleteMaster(Number(id));
        return res.status(200).json({ master });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else if (error instanceof DeleteError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
});

// Обновить мастера
mastersRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const master = await mastersService.updateMaster(req.body);
        return res.status(200).json({ master });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
});

export default mastersRouter;
