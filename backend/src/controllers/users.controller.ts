import { NotFoundError } from './../errors/notFoundError';
import * as express from 'express';
import * as usersService from '../services/users.service';
const usersRouter = express.Router();

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
