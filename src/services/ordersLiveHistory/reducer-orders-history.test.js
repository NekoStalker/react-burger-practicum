import reducer, { initialState } from './reducer';
import { WebsocketStatus } from '../types/orderTypes';
import {
  orderHistoryConnecting,
  ordersHistoryMessage,
  ordersHistoryError,
  ordersHistoryOpen,
  ordersHistoryClose
} from './actions';
const orders = [
  {
    _id: '6666d47997ede0001d06fc37',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0949',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Экзо-плантаго флюоресцентный spicy бургер',
    createdAt: '2024-06-10T10:24:57.990Z',
    updatedAt: '2024-06-10T10:24:58.689Z',
    number: 42039
  }];
describe('liveHistoryOrder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle connecting to WS action', () => {
    const action = orderHistoryConnecting();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle open WS action', () => {
    const action = ordersHistoryOpen();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: null
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS Error action', () => {
    const error = 'WebSocket error';
    const action = ordersHistoryError(error);
    const expectedState = {
      ...initialState,
      error
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS close action', () => {
    const action = ordersHistoryClose();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.OFFLINE
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS message action', () => {
    const payload = {
      ordersList: {
        orders: orders,
      },
      total: 100,
      totalToday: 10
    };
    const action = ordersHistoryMessage(payload);
    const expectedState = {
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
