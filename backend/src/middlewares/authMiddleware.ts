import { getOneUser } from './../services/users.service';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

// Проверка авторизации
const authMiddleware = (req, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asd$123$as
        // Проверка, существует ли пользователь
        const { login } = req.body;
        const user = getOneUser(login);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        // Если токена нет, вернуть ошибку
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        // Если токен есть, расшифровать тело
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};

export default authMiddleware;
