import { Roles } from '../initialState/roles';
import { Permissions, PermissionSeed } from './permissions.seed';

export const Rights = {
    Admin: PermissionSeed,
    Operator: [
        Permissions.Order,
        Permissions.ServiceCatalog,
        Permissions.Master,
        Permissions.Specialization,
        Permissions.Location,
    ],
    Client: [Permissions.Order, Permissions.Location, Permissions.LocationType],
    Master: [Permissions.Schedule, Permissions.Order],
    ResponsibleForMasters: [Permissions.Specialization, Permissions.Location, Permissions.Master],
};

export const RoleSeed = [
    {
        id: Roles.Admin,
        name: 'Администратор',
        permissions: Rights.Admin,
    },
    {
        id: Roles.Client,
        name: 'Клиент',
        permissions: Rights.Client,
    },
    {
        id: Roles.Master,
        name: 'Мастер',
        permissions: Rights.Master,
    },
    {
        id: Roles.Operator,
        name: 'Оператор',
        permissions: Rights.Operator,
    },
    {
        id: Roles.ResponsibleForMasters,
        name: 'Ответственный по мастерам',
        permissions: Rights.ResponsibleForMasters,
    },
];
