import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import locationsRouter from './controllers/locations.controller';
import rolesRouter from './controllers/roles.controller';
import usersRouter from './controllers/users.controller';

config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/locations', locationsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
