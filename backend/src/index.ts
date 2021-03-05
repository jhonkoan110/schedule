import 'reflect-metadata';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fileUpload from 'express-fileupload';
import * as cors from 'cors';
import rolesRouter from './controllers/roles.controller';
import { createConnection } from 'typeorm';
import specializationsRouter from './controllers/specializations.controller';
import locationTypesRouter from './controllers/locationTypes.controller';
import serviceCatalogRouter from './controllers/serviceCatalog.controller';
import ordersRouter from './controllers/orders.controller';
import usersRouter from './controllers/users.controller';
import locationsRouter from './controllers/locations.controller';
import mastersRouter from './controllers/masters.controller';
import schdeuleRouter from './controllers/schedule.controller';

dotenv.config({ path: __dirname + '/.env' });

createConnection();

const PORT = process.env.PORT || 4000;

// Необходимые для работы приложения методы
const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(cors());

// API-пути и обработка каждого пути соответствующим роутером
app.use('/api/roles', rolesRouter);
app.use('/api/specializations', specializationsRouter);
app.use('/api/location_types', locationTypesRouter);
app.use('/api/services', serviceCatalogRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/masters', mastersRouter);
app.use('/api/schedule', schdeuleRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
