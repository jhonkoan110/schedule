import * as express from 'express';
import { NotFoundError } from '../errors/notFoundError';
import * as locationsService from '../services/locations.service';
const locationsRouter = express.Router();

// Получить все локации
locationsRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const locations = await locationsService.getLocations();
        return res.status(200).json({ locations });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать локацию
locationsRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const location = await locationsService.createLocation(req.body);
        return res.status(200).json({ location });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить локацию
locationsRouter.post('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const location = await locationsService.deleteLocation(Number(id));
        return res.status(200).json({ location });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

// Обновить локацию
locationsRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const location = await locationsService.updateLocation(req.body);
        return res.status(200).json({ location });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

export default locationsRouter;
