import { Rights, Names } from './../initialState/roles';
import { Roles } from '../initialState/roles';

export const RoleSeed = [
    {
        id: Roles.Admin,
        name: Names.Admin,
        rights: Rights.Admin,
    },
    {
        id: Roles.Client,
        name: Names.Client,
        rights: Rights.Client,
    },
    {
        id: Roles.Master,
        name: Names.Master,
        rights: Rights.Master,
    },
    {
        id: Roles.Operator,
        name: Names.Operator,
        rights: Rights.Operator,
    },
    {
        id: Roles.ResponsibleForMasters,
        name: Names.ResponsibleForMasters,
        rights: Rights.ResponsibleForMasters,
    },
];
