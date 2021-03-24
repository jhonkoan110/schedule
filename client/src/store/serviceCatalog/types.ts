export interface IServiceCatalog {
    id: number;
    name: string;
    price: number;
    duration: string;
    specialization: string;
}

export interface InitialStateType {
    serviceCatalog: IServiceCatalog[];
    error: null | string;
    isLoading: boolean;
}
