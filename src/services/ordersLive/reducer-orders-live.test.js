import reducer, { initialState } from './reducer';
import { WebsocketStatus } from '../types/orderTypes';
import {
  orderListConnecting,
  ordersListMessage,
  ordersListError,
  ordersListOpen,
  ordersListClose
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
describe('редьюсер liveListOrder', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('должен обрабатывать действие подключения к WS', () => {
    const action = orderListConnecting();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать действие открытия WS', () => {
    const action = ordersListOpen();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: null
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать действие ошибки WS', () => {
    const error = 'WebSocket error';
    const action = ordersListError(error);
    const expectedState = {
      ...initialState,
      error
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать действие закрытия WS', () => {
    const action = ordersListClose();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.OFFLINE
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать действие сообщения WS', () => {
    const payload = {
      ordersList: {
        orders: orders,
      },
      total: 100,
      totalToday: 10
    };
    const action = ordersListMessage(payload);
    const expectedState = {
      ...initialState,
      orders: payload.orders,
      total: payload.total,
      totalToday: payload.totalToday
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
