import { Roles } from '../initialState/roles';

export const RoleSeed = [
    {
        id: Roles.Admin,
        name: 'Администратор',
        rights: 'Полные права',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
    },
    {
        id: Roles.Client,
        name: 'Клиент',
        rights: 'Ограниченные права',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
    },
    {
        id: Roles.Master,
        name: 'Мастер',
        rights: 'Ограниченные права',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
    },
    {
        id: Roles.Operator,
        name: 'Оператор',
        rights: 'Ограниченные права',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
    },
    {
        id: Roles.ResponsibleForMasters,
        name: 'Ответственный по мастерам',
        rights: 'Ограниченные права',
        createdAt: `${new Date()}`,
        updatedAt: `${new Date()}`,
    },
];
