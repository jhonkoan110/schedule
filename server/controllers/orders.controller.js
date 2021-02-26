import Router from 'express';
import * as ordersService from '../services/orders.service';
import * as uuid from 'uuid';
import path from 'path';
import fs from 'fs';
import checkRoleMiddleware from '../middlewares/checkRoleMiddleware';

const ordersRouter = new Router();

// Получить все заказы
ordersRouter.get('/', checkRoleMiddleware([1, 3, 2]), async (req, res) => {
    const orders = await ordersService.getOrders();
    return res.status(200).json({ orders });
});

// Получить заказы по id клиента
ordersRouter.get('/:user_id', checkRoleMiddleware([1, 3, 4]), async (req, res) => {
    const { user_id } = req.params;
    const orders = await ordersService.getOrdersByClient(user_id);
    return res.status(200).json({ orders });
});

// Создать заказ
ordersRouter.post('/', checkRoleMiddleware([1, 3, 4]), async (req, res) => {
    const data = req.body;
    const { photo } = req.files;
    const fileName = uuid.v4() + '.jpg';
    photo.mv(path.resolve(__dirname, '..', 'static', fileName));

    const newOrder = await ordersService.createOrder(data, { photo: fileName });
    return res.status(200).json({ newOrder });
});

// Обновить заказ (взять в работу, завершить, отказать)
ordersRouter.put('/', checkRoleMiddleware([1, 2, 3, 4]), async (req, res) => {
    const data = req.body;
    const { photo } = req.files;
    const fileName = uuid.v4() + '.jpg';
    photo.mv(path.resolve(__dirname, '..', 'static', fileName));

    const updatedOrder = await ordersService.updateOrder(data, { photo: fileName });
    return res.status(200).json({ updatedOrder });
});

// Удалить заказ
ordersRouter.delete('/:id', checkRoleMiddleware([1, 3]), async (req, res) => {
    const { id } = req.params;
    const deletedOrder = await ordersService.deleteOrder(id);
    const photo = deletedOrder.photo;
    fs.unlink(`../server/static/${photo}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Deleted file: ../static/${photo}`);
        }
    });
    return res.status(200).json({ deletedOrder });
});

export default ordersRouter;
