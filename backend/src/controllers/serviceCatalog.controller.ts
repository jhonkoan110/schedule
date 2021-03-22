import { ErrorHelper } from './../errors/ErrorHelper';
import { DeleteError } from '../errors/DeleteError';
import { NotFoundError } from '../errors/NotFoundError';
import * as express from 'express';
import * as serviceCatalogService from '../services/serviceCatalog.service';
const serviceCatalogRouter = express.Router();

// Получить все услуги
serviceCatalogRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const serviceCatalog = await serviceCatalogService.getServiceCatalog();
        return res.status(200).json({ serviceCatalog });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать услугу
serviceCatalogRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const serviceCatalog = await serviceCatalogService.createServiceCatalog(req.body);
        return res.status(200).json({ serviceCatalog });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить услугу
serviceCatalogRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const serviceCatalog = await serviceCatalogService.deleteServiceCatalog(Number(id));
        return res.status(200).json({ serviceCatalog });
    } catch (error) {
        ErrorHelper.deleteHandle(res, error);
    }
});

// Обновить услугу
serviceCatalogRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const serviceCatalog = await serviceCatalogService.updateServicaCatalog(req.body);
        return res.status(200).json({ serviceCatalog });
    } catch (error) {
        ErrorHelper.notFoundHandle(res, error);
    }
});

export default serviceCatalogRouter;
