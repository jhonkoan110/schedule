import Router from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersService from '../services/users.service';
import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = new Router();

const generateJwt = (id, login, role_id) => {
    return jwt.sign({ id, login, role_id }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

// Регистрация пользователя
usersRouter.post('/registration', async (req, res) => {
    const user = req.body;
    const candidate = await usersService.getOneUser(user.login);
    if (candidate) {
        return res.status(400).json('Пользователь с таким логином уже существует');
    }

    const hashPassword = await bcrypt.hash(user.password, 5);

    const newUser = await usersService.createUser({ ...user, password: hashPassword });
    const token = generateJwt(newUser.id, newUser.login, newUser.role_id);
    res.status(200).json({ token });
});

// Авторизация пользователя
usersRouter.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await usersService.getOneUser(login);
    if (!user) {
        res.status(400).json('Такого пользователя не существует');
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
        res.status(400).json('Неверный пароль');
    }

    const token = generateJwt(user.id, user.login, user.role_id);
    res.status(200).json({ token });
});

// Проверка, авторизован ли пользователь
usersRouter.get('/auth', authMiddleware, async (req, res) => {
    // Если пользователь авторизован, то токен обновляется
    const token = generateJwt(req.user.id, req.user.login, req.user.role_id);
    return res.status(200).json({ token });
});

export default usersRouter;
