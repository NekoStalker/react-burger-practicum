import reducer, { initialState } from './reducer';
import { WebsocketStatus } from '../types/orderTypes';

describe('liveListOrder reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle orderListConnecting', () => {
    const action = orderListConnecting();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.CONNECTING
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ordersListOpen', () => {
    const action = ordersListOpen();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: null
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ordersListError', () => {
    const error = 'WebSocket error';
    const action = ordersListError(error);
    const expectedState = {
      ...initialState,
      error
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ordersListClose', () => {
    const action = ordersListClose();
    const expectedState = {
      ...initialState,
      status: WebsocketStatus.OFFLINE
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ordersListMessage', () => {
    const payload = {
      orders: [{ id: 1, name: 'Order 1' }],
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
