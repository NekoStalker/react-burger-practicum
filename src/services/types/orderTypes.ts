export interface ICreatedOrder {
  name: string;
  order: {
      number: number;
  };
  success: boolean;
}


export interface IOrderState {
  orderID: number | null; 
  orderStatus: string;
  createdOrder: ICreatedOrder | null;
  isLoading: boolean;
  error: string | null;
  openModal: boolean;
}

export interface IOrderStore {
  order: IOrderState;
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  status: 'done' | 'pending' | 'created'; 
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrdersResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}
export interface IOrdersState {
  orders: IOrder[];
  total: number;
  totalToday: number;
  status: WebsocketStatus;
  error: string | null;
}
export enum WebsocketStatus  {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}
export enum ordersActionType {
  DATA = 'data',
  INSERT = 'insert',
  DELETE = 'delete',
  UPDATE = 'update',
  MOVE = 'move'
}

export type Data = {
  type: ordersActionType.DATA,
  data: IOrder[],
  total: number,
  totalToday: number,
}
export type Insert = {
  type: ordersActionType.INSERT,
  order: IOrder
}
export type Update = {
  type: ordersActionType.UPDATE,
  order: IOrder;
}
export type Delete = {
  type: ordersActionType.DELETE,
  _id: string;
}

export type Move = {
  type: ordersActionType.MOVE;
  _id: string;
  newIndex: number;
}
export type ordersAction =
    | Data
    | Insert
    | Update
    | Delete
    | Move