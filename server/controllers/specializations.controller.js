import Router from 'express';
import * as uuid from 'uuid';
import path from 'path';
import fs from 'fs';
import * as specializationsService from '../services/specializations.service';

const specializationsRouter = new Router();

//  Получить все специализации
specializationsRouter.get('/', async (req, res) => {
    const specializations = await specializationsService.getSpecializations();
    res.status(200).json({ specializations });
});

// Создать спец-ю
specializationsRouter.post('/', async (req, res) => {
    const { name } = req.body;
    const { icon } = req.files;
    const fileName = uuid.v4() + '.jpg';
    icon.mv(path.resolve(__dirname, '..', 'static', fileName));

    const newSpec = await specializationsService.createSpecialization({ name, icon: fileName });
    return res.json({ newSpec });
});

// Удалить спец-ю
specializationsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const spec = await specializationsService.deleteSpecialization(id);
    const icon = spec.icon;
    fs.unlink(`../server/static/${icon}`, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Deleted file: ../static/${icon}`);
        }
    });
    res.json({ spec });
});

export default specializationsRouter;
