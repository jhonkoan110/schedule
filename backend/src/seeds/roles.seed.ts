import { Roles } from '../initialState/roles';

export const RoleSeed = [
    {
        id: Roles.Admin,
        name: 'Администратор',
        rights: 'Полные права',
    },
    {
        id: Roles.Client,
        name: 'Клиент',
        rights: 'Ограниченные права',
    },
    {
        id: Roles.Master,
        name: 'Мастер',
        rights: 'Ограниченные права',
    },
    {
        id: Roles.Operator,
        name: 'Оператор',
        rights: 'Ограниченные права',
    },
    {
        id: Roles.ResponsibleForMasters,
        name: 'Ответственный по мастерам',
        rights: 'Ограниченные права',
    },
];
