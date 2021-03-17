import { NotFoundError } from './../errors/notFoundError';
import * as express from 'express';
import * as ordersService from '../services/orders.service';
const ordersRouter = express.Router();

// Получить все заказы
ordersRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const orders = await ordersService.getOrders();
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать закад
ordersRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const order = await ordersService.createOrder(req.body);
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить заказ
ordersRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const order = await ordersService.deleteOrder(Number(id));
        return res.status(200).json({ order });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

// Обновить заказ
ordersRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const order = await ordersService.updateOrder(req.body);
        return res.status(200).json({ order });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json(error.message);
        } else {
            return res.status(500).json(error);
        }
    }
});

export default ordersRouter;
