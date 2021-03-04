import * as express from 'express';
import * as ordersService from '../services/orders.service';
const ordersRouter = express.Router();

// Получить все заказы
ordersRouter.get('/', async (req: express.Request, res: express.Response) => {
    const orders = await ordersService.getOrders();
    return res.json({ orders });
});

// Создать закад
ordersRouter.post('/', async (req: express.Request, res: express.Response) => {
    const order = await ordersService.createOrder(req.body);
    return res.json({ order });
});

export default ordersRouter;
