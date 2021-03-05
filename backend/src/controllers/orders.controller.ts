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

// Удалить заказ
ordersRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const order = await ordersService.deleteOrder(Number(id));
    return res.json({ order });
});

// Обновить заказ
ordersRouter.put('/', async (req: express.Request, res: express.Response) => {
    const order = await ordersService.updateOrder(req.body);
    return res.json({ order });
});

export default ordersRouter;
