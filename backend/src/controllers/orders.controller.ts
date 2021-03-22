import { ErrorHelper } from './../errors/ErrorHelper';
import { NotFoundError } from '../errors/NotFoundError';
import * as express from 'express';
import * as ordersService from '../services/orders.service';
import * as uuid from 'uuid';
const ordersRouter = express.Router();
import * as path from 'path';
import * as fs from 'fs';
const imageToBase64 = require('image-to-base64');

// Получить все заказы
ordersRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const orders = await ordersService.getOrders();
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать заказ
ordersRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const data = req.body;
        // const { photo } = req.files;
        // const filename = photo.name;
        // photo.mv(path.resolve(__dirname, '..', 'images', filename));
        // // Используя путь до файла
        // const base64_str: string = await imageToBase64(__dirname, '..', 'images', filename);

        const order = await ordersService.createOrder(data);
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
        ErrorHelper.deleteHandle(res, error);
    }
});

// Обновить заказ
ordersRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const order = await ordersService.updateOrder(req.body);
        return res.status(200).json({ order });
    } catch (error) {
        ErrorHelper.notFoundHandle(res, error);
    }
});

export default ordersRouter;
