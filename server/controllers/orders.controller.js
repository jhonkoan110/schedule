import Router from 'express';
import * as ordersService from '../services/orders.service';
import * as uuid from 'uuid';
import path from 'path';
import fs from 'fs';

const ordersRouter = new Router();

// Получить все заказы
ordersRouter.get('/', async (req, res) => {
    const orders = await ordersService.getOrders();
    return res.status(200).json({ orders });
});

// Создать заказ
ordersRouter.post('/', async (req, res) => {
    const data = req.body;
    const { photo } = req.files;
    const fileName = uuid.v4() + '.jpg';
    photo.mv(path.resolve(__dirname, '..', 'static', fileName));

    const newOrder = await ordersService.createOrder(data, { photo: fileName });
    return res.status(200).json({ newOrder });
});

// Удалить заказ
ordersRouter.delete('/:id', async (req, res) => {
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
