import {
    ordersListConnect,
    ordersListDisconnect,
    orderListConnecting,
    ordersListMessage,
    ordersListError,
    ordersListOpen,
    ordersListClose
  } from './actions';
  
  describe('WebSocket actions', () => {
    it('should create an action to connect to WebSocket', () => {
      const url = 'ws://example.com';
      const expectedAction = {
        type: 'ORDERS_LIST_WS_CONNECT',
        payload: url
      };
      expect(ordersListConnect(url)).toEqual(expectedAction);
    });
  
    it('should create an action to disconnect from WebSocket', () => {
      const expectedAction = {
        type: 'ORDERS_LIST_WS_DISCONNECT'
      };
      expect(ordersListDisconnect()).toEqual(expectedAction);
    });
  
    it('should create an action to indicate WebSocket is connecting', () => {
      const expectedAction = {
        type: 'ORDERS_LIST_WS_CONNECTING'
      };
      expect(orderListConnecting()).toEqual(expectedAction);
    });
  
    it('should create an action for receiving a WebSocket orders', () => {
      const message = { orders: [], total: 0, totalToday: 0 }; 
      const expectedAction = {
        type: 'ORDERS_LIST_WS_MESSAGE',
        payload: message
      };
      expect(ordersListMessage(message)).toEqual(expectedAction);
    });
  
    it('should create an action for WebSocket error', () => {
      const error = 'WebSocket error';
      const expectedAction = {
        type: 'ORDERS_LIST_WS_ERROR',
        payload: error
      };
      expect(ordersListError(error)).toEqual(expectedAction);
    });
  
    it('should create an action to indicate WebSocket is open', () => {
      const expectedAction = {
        type: 'ORDERS_LIST_WS_OPEN'
      };
      expect(ordersListOpen()).toEqual(expectedAction);
    });
  
    it('should create an action to close WebSocket', () => {
      const reason = 'Connection closed by user';
      const expectedAction = {
        type: 'ORDERS_LIST_WS_CLOSE',
        payload: reason
      };
      expect(ordersListClose(reason)).toEqual(expectedAction);
    });
  });
  