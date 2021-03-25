import { Permissions } from './../seeds/permissions.seed';
import { checkRole } from './../middlewares/CheckRole';
import { defineRole } from './../middlewares/checkRoleMIddleware';
import { RoleRequest } from './../types/Request';
import { Roles } from './../initialState/roles';
import { ErrorHelper } from './../errors/ErrorHelper';
import * as express from 'express';
import * as ordersService from '../services/orders.service';
const ordersRouter = express.Router();
import checkRoleMiddleware from '../middlewares/checkRoleMIddleware';
const imageToBase64 = require('image-to-base64');

// Получить все заказы
ordersRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Order);

            const orders = await ordersService.getOrders();
            return res.status(200).json({ orders });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
);

// Получить заказы по id пользователя
ordersRouter.get(
    '/:id',
    checkRoleMiddleware([Roles.Admin, Roles.Client]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            
            checkRole(role, Permissions.Order);

            const { id } = req.params;
            const orders = await ordersService.getOrdersByUserId(+id);
            res.status(200).json({ orders });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    }
);

// Создать заказ
ordersRouter.post(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Order);

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
    }
);

// Удалить заказ
ordersRouter.delete(
    '/:id',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Order);

            const { id } = req.params;
            const order = await ordersService.deleteOrder(Number(id));
            return res.status(200).json({ order });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    }
);

// Обновить заказ
ordersRouter.put(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Order);

            const order = await ordersService.updateOrder(req.body);
            return res.status(200).json({ order });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    }
);

export default ordersRouter;
