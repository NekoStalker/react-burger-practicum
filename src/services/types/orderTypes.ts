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