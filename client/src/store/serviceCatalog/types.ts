export interface IServiceCatalog {
    id: number;
    name: string;
    price: number;
    duration: any;
    specialization: any;
}

export interface InitialStateType {
    serviceCatalog: IServiceCatalog[];
    error: null | string;
    isLoading: boolean;
}
