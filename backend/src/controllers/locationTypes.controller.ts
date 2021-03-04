import * as express from 'express';
import * as locationTypesService from '../services/locationTypes.service';

const locationTypesRouter = express.Router();

// Получить все типы локации
locationTypesRouter.get('/', async (req: express.Request, res: express.Response) => {
    const locationTypes = await locationTypesService.getLocationTypes();
    return res.json({ locationTypes });
});

// Создать тип локации
locationTypesRouter.post('/', async (req: express.Request, res: express.Response) => {
    const { name } = req.body;
    const locationType = await locationTypesService.createLocationType(name);
    return res.json({ locationType });
});

// Удалить тип локации
locationTypesRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const locationType = await locationTypesService.deleteLocationType(Number(id));
    return res.json({ locationType });
});

// Обновить тип локации
locationTypesRouter.put('/', async (req: express.Request, res: express.Response) => {
    const locationType = await locationTypesService.updateLocationType(req);
    return res.json(locationType);
});

export default locationTypesRouter;
