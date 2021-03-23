import { Permission } from './../models/Permission';
import { AccessError } from './../errors/AccessError';
import * as jwt from 'jsonwebtoken';
import { Rights } from '../seeds/roles.seed';
import { Response } from 'express';

// Проверка роли
const checkRoleMiddleware = (roles: number[]) => (req, res: Response, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        if (!req.headers.authorization) {
            return res
                .status(401)
                .json({ message: 'Пользователь не авторизован' });
        }

        const token = req.headers.authorization.split(' ')[1]; // Bearer asdaksdj29$122

        console.log(token);

        // Если токена нет, вернуть ошибку
        if (!token) {
            return res
                .status(401)
                .json({ message: 'Пользователь не авторизован' });
        }
        // Если токен есть, получить его тело
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);

        // Если роль токена не совпадает с ролью того, кто делает запрос, вернуть ошибку
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Нет доступа' });
        }
        // Если проверки прошли, продолжить выполнение запроса
        req.user = decoded;

        next();
    } catch (err) {
        res.status(500).json(err);
    }
};

export const defineRole = (role: Permission) => {
    switch (Number(role)) {
        case 1:
            return Rights.Admin;

        case 2:
            return Rights.Client;

        case 3:
            return Rights.Master;

        case 4:
            return Rights.Operator;

        case 5:
            return Rights.ResponsibleForMasters;

        default:
            throw new AccessError(403, 'Нет доступа');
    }
};

export default checkRoleMiddleware;
