import Router, { json } from 'express';
import * as serviceCatalogService from '../services/serviceCatalog.service';

const serviceCatalogRouter = new Router();

// Получить все сервисы
serviceCatalogRouter.get('/', async (req, res) => {
    const services = await serviceCatalogService.getServices();
    return res.json({ services });
});

// Создать услугу
serviceCatalogRouter.post('/', async (req, res) => {
    const newService = await serviceCatalogService.createService(req.body);
    return res.json({ newService });
});

// Удалить услугу
serviceCatalogRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedService = await serviceCatalogService.deleteService(id);
    return res.json({ deletedService });
});

export default serviceCatalogRouter;
