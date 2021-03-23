export interface IUser {
    id: number;
    login: string;
    password: string;
    firstname: string;
    lastname: string;
    middlename: string;
    role: {
        id: number;
        name: string;
    };
}
