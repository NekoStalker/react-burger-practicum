
import configureMockStore from 'redux-mock-store';
import { thunk } from "redux-thunk"
import fetchMock from 'fetch-mock';
import { getAllIngredients, apiIngredientsAddr } from './ingredientsRequests';
import reducer, {
    initialState,
    addIngredient,
    removeIngredient,
    addIngredientCount,
    removeIngredientCount,
  } from './ingredientsSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const testIngredient =    {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
 };

const testIngredients = [testIngredient];

describe('редьюсер ingredientsSlice', () => {
    it('должен возвращать начальное состояние', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('должен обрабатывать действие Add Ingredient', () => {
      const payload = testIngredient;
      const expectedState = {
        ...initialState,
        allIngredients: [payload],
      };
      expect(reducer(initialState, addIngredient(payload))).toEqual(expectedState);
    });
  
    it('должен обрабатывать действие Remove Ingredient', () => {
      const initialStateWithIngredients = {
        ...initialState,
        allIngredients: testIngredients,
      };
      const expectedState = {
        ...initialState,
        allIngredients: [],
      };
      expect(reducer(initialStateWithIngredients, removeIngredient(testIngredient._id))).toEqual(expectedState);
    });
  
    it('должен обрабатывать действие Add Ingredient Count', () => {
      const initialStateWithIngredients = {
        ...initialState,
        allIngredients: testIngredients,
      };
      const payload = { ...testIngredient, __v: 2 };
      const expectedState = {
        ...initialState,
        allIngredients: [payload],
      };
      expect(reducer(initialStateWithIngredients, addIngredientCount(testIngredient))).toEqual(expectedState);
    });
  
    it('должен обрабатывать действие Remove Ingredient Count', () => {
      const initialStateWithIngredients = {
        ...initialState,
        allIngredients: testIngredients,
      };
      const payload = { ...testIngredient, __v: 0 };
      const expectedState = {
        ...initialState,
        allIngredients: [payload],
      };
      expect(reducer(initialStateWithIngredients, removeIngredientCount('1'))).toEqual(expectedState);
    });
});
  

describe('асинхронные действия', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('создает getAllIngredients.fulfilled при успешном выполнении запроса ингредиентов', async () => {
    const ingredientsData = { data: testIngredients };

    fetchMock.getOnce(apiIngredientsAddr, {
      body: ingredientsData,
      headers: { 'content-type': 'application/json' }
    });

    const store = mockStore(initialState);

    await store.dispatch(getAllIngredients());

    const actions = store.getActions();
    expect(actions[0]).toEqual(expect.objectContaining({
      type: getAllIngredients.pending.type,
    }));
    expect(actions[1]).toEqual(expect.objectContaining({
      type: getAllIngredients.fulfilled.type,
      payload: ingredientsData,
    }));
  });

  it('создает getAllIngredients.rejected при ошибке выполнения запроса ингредиентов', async () => {
    const error = 'Failed to fetch ingredients';

    fetchMock.getOnce(apiIngredientsAddr, {
      throws: new Error(error),
    });

    const store = mockStore(initialState);

    await store.dispatch(getAllIngredients());

    const actions = store.getActions();
    expect(actions[0]).toEqual(expect.objectContaining({
      type: getAllIngredients.pending.type,
    }));
    expect(actions[1]).toEqual(expect.objectContaining({
      type: getAllIngredients.rejected.type,
      error: expect.objectContaining({
        message: error,
      }),
    }));
  });
});

  