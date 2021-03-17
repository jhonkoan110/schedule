import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import * as express from 'express';
import * as locationTypesService from '../services/locationTypes.service';

const locationTypesRouter = express.Router();

// Получить все типы локации
locationTypesRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const locationTypes = await locationTypesService.getLocationTypes();
        return res.status(200).json({ locationTypes });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать тип локации
locationTypesRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.body;
        const locationType = await locationTypesService.createLocationType(name);
        return res.status(200).json({ locationType });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить тип локации
locationTypesRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const locationType = await locationTypesService.deleteLocationType(Number(id));
        return res.status(200).json({ locationType });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else if (error instanceof DeleteError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

// Обновить тип локации
locationTypesRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const locationType = await locationTypesService.updateLocationType(req);
        return res.status(200).json(locationType);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

export default locationTypesRouter;
