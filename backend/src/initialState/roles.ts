export enum Roles {
    Admin = 1,
    Operator,
    Client,
    Master,
    ResponsibleForMasters, // Ответственный по мастерам
}

export enum Rights {
    Admin = 'Полные права',
    Operator = 'Ограниченные права',
    Client = 'Ограниченные права',
    Master = 'Ограниченные права',
    ResponsibleForMasters = 'Ограниченные права',
}

export enum Names {
    Admin = 'Администратор',
    Operator = 'Оператор',
    Client = 'Клиент',
    Master = 'Мастер',
    ResponsibleForMasters = 'Ответственный по мастерам',
}
