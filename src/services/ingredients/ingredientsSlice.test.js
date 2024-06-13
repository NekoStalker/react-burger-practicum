
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

describe('ingredientsSlice reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle Add Ingredient action', () => {
      const payload = testIngredient;
      const expectedState = {
        ...initialState,
        allIngredients: [payload],
      };
      expect(reducer(initialState, addIngredient(payload))).toEqual(expectedState);
    });
  
    it('should handle Remove Ingredient action', () => {
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
  
    it('should handle Add Ingredient Count action', () => {
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
  
    it('should handle Remove Ingredient Count action', () => {
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
  

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates getAllIngredients.fulfilled when fetching ingredients has been done action', async () => {
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

  it('creates getAllIngredients.rejected when fetching ingredients fails action', async () => {
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

  