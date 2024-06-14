

import {IOrdersResponse,IOrdersState} from "../types/orderTypes"



export const liveOrdersUpdate = (prevOrders: IOrdersState, response: any): IOrdersState => {
    return {
        ...prevOrders,
        orders: response.orders,
        total: response.total,
        totalToday: response.totalToday
    };
};

