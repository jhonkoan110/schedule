export const ADMIN: string = 'Администратор';
export const CLIENT: string = 'Клиент';
export const OPERATOR: string = 'Оператор';
export const MASTER: string = 'Мастер';
export const RESPONSIBLE_FOR_MASTERS: string = 'Ответственный по мастерам';

export enum StatusColors {
    ORDER_PROCESSING = '#FFA400',
    REJECTED = '#FB000D',
    ASSIGNED_TO_MASTER = '#1049A9',
}

export enum LocationTypes {
    DISTRICT = 5,
    STREET = 3,
    HOUSE = 7,
}
