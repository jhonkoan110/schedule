export interface IInitialState {
    error: null | string;
    isLoading: boolean;
    locationTypes: ILocationTypes[];
}

export interface ILocationTypes {
    id: number;
    name: string;
}
