import { ErrorHelper } from './../errors/ErrorHelper';
import { NotFoundError } from '../errors/NotFoundError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as usersService from '../services/users.service';
import * as mastersService from '../services/master.service';
import authMiddleware from '../middlewares/authMiddleware';
import checkRoleMiddleware, {
    defineRole,
} from '../middlewares/checkRoleMIddleware';
import { Roles } from '../initialState/roles';
import { RoleRequest } from '../types/Request';
import { checkRole } from '../middlewares/CheckRole';
import { Permissions } from '../seeds/permissions.seed';
const usersRouter = express.Router();

const generateJwt = (id: number, login: string, role: number) => {
    return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    });
};

// Получить одного пользователя
usersRouter.get('/one_user', async (req, res) => {
    try {
        const { login } = req.body;
        const user = await usersService.getOneUser(login);
        res.status(200).json({ user });
    } catch (error) {
        if (error instanceof NotFoundError) {
            res.status(error.status).json(error.message);
        } else {
            res.status(500).json(error);
        }
    }
});

// Получить пользователя по id
usersRouter.get(
    '/:id',
    checkRoleMiddleware([Roles.Admin, Roles.Client]),
    async (req: RoleRequest, res) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.User);

            const { id } = req.params;
            const user = await usersService.getUserById(+id);
            // Пользователь без поля "пароль"
            const userWithoutPassword = {
                id: user.id,
                login: user.login,
                firstname: user.firstname,
                lastname: user.lastname,
                middlename: user.middlename,
                role: {
                    id: user.role.id,
                    name: user.role.name,
                },
                orders: user.orders,
            };
            res.status(200).json({ user: userWithoutPassword });
        } catch (error) {
            ErrorHelper.notFoundHandle(res, error);
        }
    }
);

// Регистрация пользователя
usersRouter.post(
    '/registration',
    async (req: express.Request, res: express.Response) => {
        try {
            const user = req.body;

            const candidate = await usersService.getOneUser(user.login);
            console.log('user', user);

            if (candidate) {
                return res
                    .status(400)
                    .json('Пользователь с таким логином уже существует');
            }

            const hashPassword = await bcrypt.hash(user.password, 5);

            const newUser = await usersService.createUser({
                ...user,
                password: hashPassword,
            });
            const token = generateJwt(
                newUser.id,
                newUser.login,
                Number(newUser.role)
            );
            return res.status(200).json({ token });
        } catch (error) {
            res.status(500).json(error);
        }
    }
);

// Авторизация пользователя(Вход)
usersRouter.post(
    '/login',
    async (req: express.Request, res: express.Response) => {
        let master;
        const { login, password } = req.body;
        // Проверка, существует ли пользователь
        const user = await usersService.getOneUser(login);
        console.log(user);
        if (user.role.id === Roles.Master) {
            master = await mastersService.getMasterByUserId(user.id);
        }

        if (!user) {
            return res.status(404).json('Такого пользователя не существует');
        }
        // Проверка пароля
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json('Неверный пароль');
        }

        // Если пользователь существует и пароль верный, сгенерировать токен и отправить на клиент
        const token = generateJwt(user.id, user.login, +user.role.id);
        return res.status(200).json({ token, user, master });
    }
);

// Проверка, авторизован ли пользователь
usersRouter.get('/auth', authMiddleware, async (req, res: express.Response) => {
    // Если пользователь авторизован, то токен обновляется
    const token = generateJwt(req.body.id, req.body.login, req.body.role);
    return res.status(200).json({ token });
});

// Получить пользователей
usersRouter.get(
    '/',
    checkRoleMiddleware([Roles.Admin]),
    async (req: RoleRequest, res: express.Response) => {
        try {
            // Проверка роли
            const role = defineRole(req.user.role);
            checkRole(role, Permissions.Role);
            const users = await usersService.getUsers();
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
);

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
usersRouter.delete(
    '/:id',
    async (req: express.Request, res: express.Response) => {
        try {
            const { id } = req.params;
            const user = await usersService.deleteUser(Number(id));
            return res.status(200).json({ user });
        } catch (error) {
            ErrorHelper.deleteHandle(res, error);
        }
    }
);

// Обновить пользователя
usersRouter.put('/', async (req: express.Request, res: express.Response) => {
    try {
        const user = await usersService.updateUser(req.body);
        return res.status(200).json({ user });
    } catch (error) {
        ErrorHelper.notFoundHandle(res, error);
    }
});

export default usersRouter;
