export enum Roles {
    Admin = 1,
    Client,
    Master,
    Operator,
    ResponsibleForMasters, // Ответственный по мастерам
}

export enum EntitiesAccess {
    Roles = 'Roles',
    Location = 'Location',
    Masters = 'Masters',
    Orders = 'Orders',
    Schedule = 'Schedule',
    ServiceCatalog = 'ServiceCatalog',
    Specializations = 'Specializations',
    Users = 'Users',
    LocationTypes = 'LocationTypes',
}
