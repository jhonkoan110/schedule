import jwt from 'jsonwebtoken';

// Проверка роли
const checkRoleMiddleware = (role_id) => (req, res, next) => {
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
        // Если ролько токена не совпадает с ролью того, кто делает запрос, вернуть ошибку
        if (decoded.role_id !== role_id) {
            return res.status(403).json({ message: 'Нет доступа' });
        }
        // Если проверки прошли, продолжить выполнение запроса
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};

export default checkRoleMiddleware;
