import reducer, {
    addBurgerIngredient,
    removeBurgerIngredient,
    changeIngredientsOrder,
    resetConstructor,
    initialState,
  } from './burgerConstructorSlice';
  import { BUN_NOT_SELECTED } from './burgerConstructorSlice';
  import { nanoid } from 'nanoid';

  jest.mock('nanoid', () => ({
    nanoid: jest.fn(() => 'test-uid'),
  }));
  
  const testIng1 = {
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
    uid: 'test-uid1',
  };
  
  const testIng2 = {
    _id: "643d69a5c3f7b9001cfa0944",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 10,
    calories: 100,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v: 0,
    uid: 'test-uid2',
  };
  
  const selectedBun = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  };
  
  const testBurger = {
    selectedBun: selectedBun,
    price: selectedBun.price*2+testIng1.price+testIng2.price,
    internalIngredients: [{ ...testIng1 },{ ...testIng2 }],
  };
  
  describe('burgerConstructor reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('should handle addBurgerIngredient action for non-bun', () => {
        const expectedState = {
          ...initialState,
          internalIngredients: [expect.objectContaining({
            ...testIng1,
            uid: expect.any(String),
          })],
          price: testIng1.price,
        };
        expect(reducer(initialState, addBurgerIngredient(testIng1))).toEqual(expectedState);
      });    
    it('should handle addBurgerIngredient action for non-bun', () => {
        const expectedState = {
            ...initialState,
            internalIngredients: [expect.objectContaining({
            ...testIng1,
            uid: expect.any(String),
        })],
            price: testIng1.price,
        };
        expect(reducer(initialState, addBurgerIngredient(testIng1))).toEqual(expectedState);
      });
      it('should handle removeBurgerIngredient action', () => {
        const initialStateWithIngredients = {
          ...initialState,
          internalIngredients: [testIng1, testIng2],
          price: testIng1.price + testIng2.price,
        };
        const expectedState = {
          ...initialState,
          internalIngredients: [testIng2],
          price: testIng2.price,
        };
        expect(reducer(initialStateWithIngredients, removeBurgerIngredient('test-uid1'))).toEqual(expectedState);
      });
    it('should handle change Ingredients Order action', () => {
        const initialStateWithIngredients = {
          ...initialState,
          internalIngredients: [testIng1, testIng2],
        };
        const expectedState = {
          ...initialState,
          internalIngredients: [testIng2, testIng1],
        };
        expect(reducer(initialStateWithIngredients, changeIngredientsOrder({ fromUid: 'test-uid1', toUid: 'test-uid2' }))).toEqual(expectedState);
      });
    it('should handle reset constructor action', () => {
      const modifiedState = {
        ...testBurger
      };
      const expectedState = {
        ...initialState,
    
      };
      expect(reducer(modifiedState, resetConstructor())).toEqual(expectedState);
    });
  });
  