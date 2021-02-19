import Router from 'express';
import * as locationsService from '../services/locations.service';

const locationsRouter = new Router();

// Получить все локации
locationsRouter.get('/', async (req, res) => {
    const locations = await locationsService.getLocations();
    res.status(200).json(locations);
});

// Создать локацию
// locationsRouter.post('/', async (req, res => {}))

export default locationsRouter;