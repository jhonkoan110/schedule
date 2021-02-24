import cors from 'cors';
import express from 'express';
import path from 'path';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';
import locationsRouter from './controllers/locations.controller';
import rolesRouter from './controllers/roles.controller';
import usersRouter from './controllers/users.controller';
import scheduleRouter from './controllers/schedule.controller';
import specializationsRouter from './controllers/specializations.controller';
import serviceCatalogRouter from './controllers/serviceCatalog.controller';
import ordersRouter from './controllers/orders.controller';
import locationTypesRouter from './controllers/locationTypes.controller';
import mastersRouter from './controllers/masters.controller';

// Вызов функции config нужен для использования переменных из .env
config();

const PORT = process.env.PORT || 4000;

// Необходимые для работы приложения методы
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(cors());

// API-пути и обработка каждого пути соответствующим роутером
app.use('/api/locations', locationsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/specializations', specializationsRouter);
app.use('/api/services', serviceCatalogRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/location_types', locationTypesRouter);
app.use('/api/masters', mastersRouter);

// Запуск сервера на порту 7000 или 4000, если успешно, вывод в консоль
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
