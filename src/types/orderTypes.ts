export interface ICreatedOrder {
  [key: string]: unknown;
}


export interface IOrderState {
  orderID: number | null; 
  orderStatus: string;
  createdOrder: ICreatedOrder;
  isLoading: boolean;
  error: string | null;
  openModal: boolean;
}

export interface IOrderStore {
  order: IOrderState;
}