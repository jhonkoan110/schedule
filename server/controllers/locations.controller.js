import Router from 'express';
import * as locationsService from '../services/locations.service';

const locationsRouter = new Router();

// Получить все локации
locationsRouter.get('/', async (req, res) => {
    const locations = await locationsService.getLocations();
    res.status(200).json({ locations });
});

// Создать локацию
locationsRouter.post('/', async (req, res) => {
    const newLocation = await locationsService.createLocation(req.body);
    res.status(200).json({ newLocation });
});

// Удалить локацию
locationsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedLocation = await locationsService.deleteLocation(id);
    res.status(200).json({ deletedLocation });
});

export default locationsRouter;
