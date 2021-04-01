export interface LocationInitialState {}

export interface ILocation {
    id: number;
    name: string;
    coordinates: string;
    parent: null | number;
    location_type_id?: number;
}
