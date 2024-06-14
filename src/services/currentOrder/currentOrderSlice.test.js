import configureMockStore from 'redux-mock-store'
import {thunk} from 'redux-thunk'
import {getOrder} from '../api';
import reducer, {
  initialState,
  setCurrentOrder,
  clearCurrentOrder,
  openModalOrder,
  closeModalOrderDetails
} from './currentOrderSlice';
import fetchMock from 'fetch-mock';
import { fetchOrderById } from './currentOrderRequests';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const testOrder = {
  ingredients: ['60666c42cc7b410027a1a9b1', '60666c42cc7b410027a1a9b1'],
  _id: '1',
  status: 'done',
  name: 'Test Order',
  number: 1,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  openModal: false,
  isLoading: false,
  error: ''
};

describe('редьюсер currentOrderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать действие setCurrentOrder', () => {
    const payload = testOrder;
    const expectedState = {
      ...initialState,
      ...payload
    };
    expect(reducer(initialState, setCurrentOrder(payload))).toEqual(expectedState);
  });

  it('должен обрабатывать действие clearCurrentOrder', () => {
    const modifiedState = {
      ...initialState,
      ...testOrder
    };
    expect(reducer(modifiedState, clearCurrentOrder())).toEqual(initialState);
  });

  it('должен обрабатывать действие openModalOrder', () => {
    const payload = {
      ...testOrder,
     
    };
    const expectedState = {
      ...initialState,
      ...payload,
      openModal: true
    };
    expect(reducer(initialState, openModalOrder(payload))).toEqual(expectedState);
  });

  it('должен обрабатывать действие closeModalOrderDetails', () => {
    const modifiedState = {
      ...initialState,
      ...testOrder,
      openModal: true
    };
    expect(reducer(modifiedState, closeModalOrderDetails())).toEqual(initialState);
  });

});
describe('асинхронные действия fetchOrderById', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('создает fetchOrderById.fulfilled при успешном выполнении запроса заказа', async () => {
    const store = mockStore(initialState);
    const payload = { success: true, orders: [testOrder] };
  
    fetchMock.getOnce(`${getOrder}${testOrder.id}`, {
      body: payload,
      headers: { 'content-type': 'application/json' },
    });
  
    await store.dispatch(fetchOrderById(testOrder.id));
  
    const actions = store.getActions();
    expect(actions[0]).toEqual(expect.objectContaining({
      type: fetchOrderById.pending.type,
    }));
    expect(actions[1]).toEqual(expect.objectContaining({
      type: fetchOrderById.fulfilled.type,
      payload,
    }));
  });
  

  it('создает fetchOrderById.rejected при ошибке выполнения запроса заказа', async () => {
    const store = mockStore(initialState);
    const error = 'Ошибка выполнения заказа';
  
    fetchMock.getOnce(`${getOrder}${testOrder.id}`, {
      throws: new Error(error),
    });
  
    await store.dispatch(fetchOrderById(testOrder.id));
  
    const actions = store.getActions();
    expect(actions[0]).toEqual(expect.objectContaining({
      type: fetchOrderById.pending.type,
    }));
    expect(actions[1]).toEqual(expect.objectContaining({
      type: fetchOrderById.rejected.type,
      error: expect.objectContaining({
        message: error,
      }),
    }));
  });  
});