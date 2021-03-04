import * as express from 'express';
import * as locationsService from '../services/locations.service';
const locationsRouter = express.Router();

// Получить все локации
locationsRouter.get('/', async (req: express.Request, res: express.Response) => {
    const locations = await locationsService.getLocations();
    return res.json({ locations });
});

// Создать локацию
locationsRouter.post('/', async (req: express.Request, res: express.Response) => {
    const location = await locationsService.createLocation(req.body);
    return res.json({ location });
});

// Удалить локацию
locationsRouter.post('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const location = await locationsService.deleteLocation(Number(id));
    return res.json({ location });
});

export default locationsRouter;
