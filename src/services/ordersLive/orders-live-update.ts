

import { IAllIngredientsState, IIngredientState } from "../types/ingredientTypes";
import {IOrder,ordersActionType,IOrdersResponse, Data, Insert, Update, Delete,ordersAction, Move,IOrdersState} from "../types/orderTypes"


export const liveOrdersUpdate = (prevOrders: IOrdersState, response: IOrdersResponse): IOrdersState => {
    return {
        ...prevOrders,
        orders: response.orders,
        total: response.total,
        totalToday: response.totalToday
    };
};

