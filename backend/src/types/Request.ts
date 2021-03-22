import { Request } from 'express';
import { Permission } from './../models/Permission';
// export {};

export interface RoleRequest extends Request {
    user: {
        id: number;
        login: string;
        role: Permission;
        iat: number;
        exp: number;
    };
}
