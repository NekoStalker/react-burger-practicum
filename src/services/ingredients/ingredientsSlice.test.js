
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
  
    it('should handle addIngredient action', () => {
      const payload = testIngredient;
      const expectedState = {
        ...initialState,
        allIngredients: [payload],
      };
      expect(reducer(initialState, addIngredient(payload))).toEqual(expectedState);
    });
  
    it('should handle removeIngredient action', () => {
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
  
    it('should handle addIngredientCount action', () => {
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
  
    it('should handle removeIngredientCount action', () => {
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
  
    it('creates getAllIngredients.fulfilled when fetching ingredients has been done', async () => {
      const ingredientsData = testIngredients;
  
      fetchMock.getOnce(apiIngredientsAddr, {
        body: ingredientsData,
        headers: { 'content-type': 'application/json' }
      });
  
      const expectedActions = [
        { type: getAllIngredients.pending.type },
        { type: getAllIngredients.fulfilled.type, payload: ingredientsData }
      ];
  
      const store = mockStore({ allIngredients: [], isLoading: false, error: null });
  
      await store.dispatch(getAllIngredients());
  
      expect(store.getActions()).toEqual(expectedActions);
    });
  
    it('creates getAllIngredients.rejected when fetching ingredients fails', async () => {
      const error = 'Failed to fetch ingredients';
  
      fetchMock.getOnce(apiIngredientsAddr, {
        throws: new Error(error)
      });
  
  
      const store = mockStore({ allIngredients: [], isLoading: false, error: null });
  
      await store.dispatch(getAllIngredients());
  
      const actions = store.getActions();
      expect(actions[0].type).toBe(getAllIngredients.pending.type);
      expect(actions[1].type).toBe(getAllIngredients.rejected.type);
      expect(actions[1].error.message).toBe(error);
    });
  });

  