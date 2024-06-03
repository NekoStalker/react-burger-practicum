

import {IOrder,ordersActionType,IOrdersResponse, Data, Insert, Update, Delete,ordersAction, Move,IOrdersState} from "../types/orderTypes"
export const insertData = (orders: IOrder[], action: Insert): IOrder[] => {
    return [...orders, action.order];
};

export const deleteData = (orders: IOrder[], action: Delete): IOrder[] => {
    return orders.filter(order => order._id !== action._id);
};

export const updateData = (orders: IOrder[], action: Update): IOrder[] => {
    return orders.map(order => (order._id === action.order._id ? action.order : order));
};

export const moveData = (orders: IOrder[], action: Move): IOrder[] => {
    const index = orders.findIndex(order => order._id === action._id);
    if (index === -1) {
        return orders;
    }
    const [removedOrder] = orders.splice(index, 1);
    orders.splice(action.newIndex, 0, removedOrder);
    return orders;
};



export const liveOrdersUpdate = (prevOrders: IOrdersState, response: IOrdersResponse): IOrdersState => {
    return {
        ...prevOrders,
        orders: response.orders,
        total: response.total,
        totalToday: response.totalToday
    };;
};

