import * as express from 'express';
import * as usersService from '../services/users.service';
const usersRouter = express.Router();

// Получить пользователей
usersRouter.get('/', async (req: express.Request, res: express.Response) => {
    const users = await usersService.getUsers();
    return res.json({ users });
});

// Создать пользователя
usersRouter.post('/', async (req: express.Request, res: express.Response) => {
    const user = await usersService.createUser(req.body);
    return res.json({ user });
});

// Удалить пользователя
usersRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const user = await usersService.deleteUser(Number(id));
    return res.json({ user });
});

// Обновить пользователя
usersRouter.put('/', async (req: express.Request, res: express.Response) => {
    const user = await usersService.updateUser(req.body);
    return res.json({ user });
});

export default usersRouter;
