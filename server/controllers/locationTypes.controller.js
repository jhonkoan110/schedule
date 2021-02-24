import Router from 'express';
import * as locationTypesService from '../services/locationTypes.service';

const locationTypesRouter = new Router();

// Получить все типы локаций
locationTypesRouter.get('/', async (req, res) => {
    const locationTypes = await locationTypesService.getLocationTypes();
    return res.status(200).json({ locationTypes });
});

// Создать тип локации
locationTypesRouter.post('/', async (req, res) => {
    const newLocationType = await locationTypesService.createLocationType(req.body);
    return res.status(200).json({ newLocationType });
});

// Удалить тип локации
locationTypesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedLocationType = await locationTypesService.deleteLocationType(id);
    return res.status(200).json(deletedLocationType);
});

export default locationTypesRouter;
