import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { getOrderModal, apiOrdersAdd } from './orderRequests';
import reducer, {
  initialState,
  closeModalOrder,
} from './orderSlice';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testIngredient = {
  _id: "643d69a5c3f7b9001cfa0943",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
  uid: "RkAPuWqwON2psNdI7ijUL"
};

describe('редьюсер orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать действие closeModalOrder', () => {
    const modifiedState = {
      orderID: 123,
      orderStatus: "completed",
      createdOrder: { name: "Test Order", order: { number: 123 }, success: true },
      isLoading: true,
      error: "Some error",
      openModal: true,
    };
    expect(reducer(modifiedState, closeModalOrder())).toEqual(initialState);
  });


});

describe('асинхронные действия orderSlice', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('создает getOrderModal.fulfilled при успешном выполнении запроса на создание заказа', async () => {
    const createdOrder = {
      name: "Test Order",
      order: { number: 123 },
      success: true,
    };

    fetchMock.postOnce(apiOrdersAdd, {
      body: createdOrder,
      headers: { 'content-type': 'application/json' },
    });

    const store = mockStore(initialState);

    await store.dispatch(getOrderModal([testIngredient]));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expect.objectContaining({
      type: getOrderModal.pending.type,
    }));
    expect(actions[1]).toEqual(expect.objectContaining({
      type: getOrderModal.fulfilled.type,
      payload: createdOrder,
    }));
  });

  it('создает getOrderModal.rejected при ошибке выполнения запроса на создание заказа', async () => {
    const error = 'Failed to create order';

    fetchMock.postOnce(apiOrdersAdd, {
      throws: new Error(error),
    });

    const store = mockStore(initialState);

    await store.dispatch(getOrderModal([testIngredient]));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expect.objectContaining({
      type: getOrderModal.pending.type,
    }));
    expect(actions[1]).toEqual(expect.objectContaining({
      type: getOrderModal.rejected.type,
      error: expect.objectContaining({
        message: error,
      }),
    }));
  });
});
