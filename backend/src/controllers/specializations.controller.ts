import { DeleteError } from './../errors/deleteError';
import { NotFoundError } from './../errors/notFoundError';
import * as express from 'express';
import * as specializationsService from '../services/specializations.service';
const specializationsRouter = express.Router();

// Получить все спец-и
specializationsRouter.get('/', async (req, res) => {
    try {
        const specializations = await specializationsService.getSpecializations();
        return res.status(200).json({ specializations });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать спец-ю
specializationsRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const { name, icon } = req.body;
        const specialization = await specializationsService.createSpecialization({ name, icon });
        return res.json({ specialization });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить спец-ю
specializationsRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const specialization = await specializationsService.deleteSpecialization(Number(id));
        return res.status(200).json({ specialization });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else if (error instanceof DeleteError) {
            res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

// Обновить спец-ю
specializationsRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const { id, name, icon } = req.body;
        const specialization = await specializationsService.updateSpecialization({
            id,
            name,
            icon,
        });
        return res.status(200).json({ specialization });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

// Получить по имени
specializationsRouter.get('/', async (req, res) => {
    const { name } = req.body;
    const spec = await specializationsService.findByName(name);
    res.json({ spec });
});

export default specializationsRouter;
