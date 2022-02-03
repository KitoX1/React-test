export interface IOrder {
    orderNumber: number,
    status: string,
    type: string,
    sum: number,
    restaurantId: number,
    id: number
}

export type GetOrderType = {
    restaurantId: string | number,
    filters: string
}
export type OrderAPIType = {
    getOrders: (values: GetOrderType) => Promise<IOrder[]>,
    addOrder: (values: IOrder) => Promise<IOrder>,
    editOrder: (values: IOrder) => Promise<IOrder>,
}

export type OrdersInitialState = {
    loadingInProgress: boolean,
    orders: IOrder[],
}

export type OrderType = 'hall' | 'delivery';

export type OrderStatus = 'new' | 'cooking' | 'assembling' | 'done';