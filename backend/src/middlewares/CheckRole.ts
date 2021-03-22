import { Permissions } from './../seeds/permissions.seed';
import { Permission } from './../models/Permission';
import { AccessError } from './../errors/AccessError';

// Принимает массив текущих ролей и массив нужных ролей
export const checkRole = (userRoles: Permission[], ...neededRoles: Permission[]) => {
    console.log(userRoles);
    // console.log(neededRoles);

    for (let role of neededRoles) {
        console.log(role);

        if (!userRoles.some((ur) => ur.id === role.id && ur.type === role.type)) {
            throw new AccessError(403, 'Нет прав');
        }
    }
};
