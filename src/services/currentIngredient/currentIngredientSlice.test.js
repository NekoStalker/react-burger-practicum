// currentIngredientSlice.test.js
import reducer, {
    initialState,
    setCurrentIngredient,
    clearCurrentIngredient,
    openModalIngredient,
    closeModalIngredient
  } from './currentIngredientSlice';
  
  const testI = {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  };
  
  describe('currentIngredientSlice reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle setCurrentIngredient action', () => {
      const payload = testI;
      const expectedState = {
        ...initialState,
        ...payload
      };
      expect(reducer(initialState, setCurrentIngredient(payload))).toEqual(expectedState);
    });
  
    it('should handle clearCurrentIngredient action', () => {
      const modifiedState = {
        ...initialState,
        ...testI
      };
      expect(reducer(modifiedState, clearCurrentIngredient())).toEqual(initialState);
    });
  
    it('should handle openModalIngredient action', () => {
      const payload = testI;
      const expectedState = {
        ...initialState,
        ...payload,
        openModal: true
      };
      expect(reducer(initialState, openModalIngredient(payload))).toEqual(expectedState);
    });
  
    it('should handle closeModalIngredient action', () => {
      const modifiedState = {
        ...initialState,
        ...testI,
        openModal: true
      };
      expect(reducer(modifiedState, closeModalIngredient())).toEqual(initialState);
    });
  });
  