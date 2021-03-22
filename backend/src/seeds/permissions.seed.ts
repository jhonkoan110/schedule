import { Permission } from './../models/Permission';

export const Permissions = {
    Location: { id: 1, type: 'Location' },
    LocationType: { id: 2, type: 'LocationType' },
    Order: { id: 3, type: 'Order' },
    Master: { id: 4, type: 'Master' },
    Role: { id: 5, type: 'Role' },
    ServiceCatalog: { id: 6, type: 'ServiceCatalog' },
    Specialization: { id: 7, type: 'Specialization' },
    User: { id: 8, type: 'User' },
    Schedule: { id: 9, type: 'Schedule' },
};

export const PermissionSeed: Permission[] = Object.keys(Permissions).map((key) => Permissions[key]);

//     [

//     {
//         id: Entities.Location,
//         type: Entities.Location.toString()
//     },
//     {
//         id: Roles.Client,
//         name: 'Клиент',
//         rights: Rights.Client,
//     },
//     {
//         id: Roles.Master,
//         name: 'Мастер',
//         rights: Rights.Master,
//     },
//     {
//         id: Roles.Operator,
//         name: 'Оператор',
//         rights: Rights.Operator,
//     },
//     {
//         id: Roles.ResponsibleForMasters,
//         name: 'Ответственный по мастерам',
//         rights: Rights.ResponsibleForMasters,
//     },
// ];
