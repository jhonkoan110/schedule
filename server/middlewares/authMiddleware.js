import jwt from 'jsonwebtoken';

// Проверка авторизованности
const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Bearer asdaksdj29$122
        // Если токена нет, вернуть ошибку
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        // Если токен есть, расшифровать тело
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        // Продолжить выполнение
        next();
    } catch (err) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};

export default authMiddleware;
