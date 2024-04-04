import {createSlice} from '@reduxjs/toolkit'
function updateBurgerConstructorIngredients(state) {
    state.bunCount = state.burgerConstructorIngredients.filter((ingredient) => ingredient.type === "bun").length;
    state.selectedBun = state.burgerConstructorIngredients.find((ingredient) => ingredient.type === "bun");
    const bunPrice = state.selectedBun ? state.selectedBun.price * 2 : 0;
    state.internalIngredients = state.burgerConstructorIngredients.filter((ingredient) => ingredient.type !== "bun");
    state.price = state.internalIngredients.reduce((acc, ingredient) => acc + ingredient.price, bunPrice);
}
export const burgerConstructor = createSlice({
    name: 'burgerConstructor',
    initialState: {
        burgerConstructorIngredients: [],
        selectedBun: {},
        price: 0,
        bunCount: 0,
        internalIngredients: [],
    },
    reducers: {
        setBurgerConstructorIngredients: (state, action) => {
            state.burgerConstructorIngredients = action.payload;
            updateBurgerConstructorIngredients(state)
        },
        addBurgerIngredient: (state, action) => {
            if(action.payload.type === "bun"){
                state.selectedBun = action.payload;
                const bunPrice = state.selectedBun ? state.selectedBun.price * 2 : 0;
                state.price = state.internalIngredients.reduce((acc, ingredient) => acc + ingredient.price, bunPrice);
            }
            else {
                state.burgerConstructorIngredients = [...state.burgerConstructorIngredients, action.payload];
                updateBurgerConstructorIngredients(state);
            }
           
            
        },
        removeBurgerIngredient: (state, action) => {
            state.burgerConstructorIngredients = state.burgerConstructorIngredients.filter((ingredient) => ingredient._id !== action.payload);
            updateBurgerConstructorIngredients(state);
        },
    
    }
});
export const {setBurgerConstructorIngredients, addBurgerIngredient,removeBurgerIngredient } = burgerConstructor.actions;
export default burgerConstructor.reducer;