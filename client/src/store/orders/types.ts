// export interface IOrder {
//     id?: number;
//     master_id: number;
//     user_id: number;
//     description: string;
//     start_date: string;
//     end_date: string;
//     status: string;
//     statusColor: string;
//     commentary: string;
//     photo: string;
// }

export interface OrdersInitialState {
    orders: any[];
    error: null | string;
    isLoading: boolean;
}