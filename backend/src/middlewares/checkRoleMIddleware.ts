import * as jwt from 'jsonwebtoken';

// Проверка роли
const checkRoleMiddleware = (roles) => (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asdaksdj29$122

        // Если токена нет, вернуть ошибку
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        // Если токен есть, получить его тело
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(roles);
        // console.log(decoded);

        // Если роль токена не совпадает с ролью того, кто делает запрос, вернуть ошибку
        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'Нет доступа' });
        }
        // Если проверки прошли, продолжить выполнение запроса
        req.user = decoded;
        console.log(decoded);

        next();
    } catch (err) {
        res.status(500).json(err);
    }
};

export default checkRoleMiddleware;
