import { NotFoundError } from './../errors/notFoundError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as usersService from '../services/users.service';
import authMiddleware from '../middlewares/authMiddleware';
const usersRouter = express.Router();

const generateJwt = (id: number, login: string, role: number) => {
    return jwt.sign({ id, login, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

// Регистрация пользователя
usersRouter.post('/registration', async (req: express.Request, res: express.Response) => {
    try {
        const user = req.body;
        const candidate = await usersService.getOneUser(user.login);
        if (candidate) {
            return res.status(400).json('Пользователь с таким логином уже существует');
        }

        const hashPassword = await bcrypt.hash(user.password, 5);

        const newUser = await usersService.createUser({ ...user, password: hashPassword });
        const token = generateJwt(newUser.id, newUser.login, Number(newUser.role));
        return res.status(200).json({ token });
    } catch (error) {
        console.log(error);
    }
});

// Авторизация пользователя
usersRouter.post('/login', async (req: express.Request, res: express.Response) => {
    const { login, password } = req.body;
    const user = await usersService.getOneUser(login);
    if (!user) {
        return res.status(400).json('Такого пользователя не существует');
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
        return res.status(400).json('Неверный пароль');
    }

    const token = generateJwt(user.id, user.login, Number(user.role));
    return res.status(200).json({ token });
});

// Проверка, авторизован ли пользователь
usersRouter.get('/auth', authMiddleware, async (req, res: express.Response) => {
    // Если пользователь авторизован, то токен обновляется
    const token = generateJwt(req.body.id, req.body.login, req.body.role);
    return res.status(200).json({ token });
});

// Получить пользователей
usersRouter.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const users = await usersService.getUsers();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Создать пользователя
usersRouter.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const user = await usersService.createUser(req.body);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Удалить пользователя
usersRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await usersService.deleteUser(Number(id));
        return res.status(200).json({ user });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
});

// Обновить пользователя
usersRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const user = await usersService.updateUser(req.body);
        return res.status(200).json({ user });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).json(error.message);
        } else {
            return res.status(500).json(error.message);
        }
    }
});

export default usersRouter;