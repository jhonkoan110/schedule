export interface IRole {
    id: number;
    name: string;
}

export interface IInitialState {
    roles: IRole[];
    error: null | string;
    isLoading: boolean;
}
