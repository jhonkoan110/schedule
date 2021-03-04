import * as express from 'express';
import * as serviceCatalogService from '../services/serviceCatalog.service';
const serviceCatalogRouter = express.Router();

// Получить все услуги
serviceCatalogRouter.get('/', async (req: express.Request, res: express.Response) => {
    const serviceCatalog = await serviceCatalogService.getServiceCatalog();
    return res.json({ serviceCatalog });
});

// Создать услугу
serviceCatalogRouter.post('/', async (req: express.Request, res: express.Response) => {
    const serviceCatalog = await serviceCatalogService.createServiceCatalog(req.body);
    return res.json({ serviceCatalog });
});

// Удалить услугу
serviceCatalogRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const serviceCatalog = await serviceCatalogService.deleteServiceCatalog(Number(id));
    return res.json({ serviceCatalog });
});

// Обновить услугу
serviceCatalogRouter.put('/', async (req: express.Request, res: express.Response) => {
    const serviceCatalog = await serviceCatalogService.updateServicaCatalog(req.body);
    return res.json({ serviceCatalog });
});

export default serviceCatalogRouter;
