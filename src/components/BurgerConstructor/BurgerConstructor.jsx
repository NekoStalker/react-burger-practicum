import React from 'react'
import {Button, ConstructorElement, CurrencyIcon,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients';
import OrderDetails from '../OrderDetails/OrderDetails';
import {ingredientType} from '../../utils/types';
import {BurgerContext} from '../../services/BurgerContext';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice';

function reducer(state, action) {
  switch (action.type) {
   case "SET_INGREDIENTS":
    const bunCount = action.ingredients.filter((ingredient) => ingredient.type === "bun").length;
    const selectedBun = action.ingredients.find((ingredient) => ingredient.type === "bun");
    const bunPrice = selectedBun ? selectedBun.price * 2 : 0;
    const internalIngredients = action.ingredients.filter((ingredient) => ingredient.type !== "bun");
    const totalPrice = internalIngredients.reduce((acc,ingredient) => acc + ingredient.price, bunPrice );
    return {
      ...state,
      ingredients: action.ingredients,
      totalPrice,
      internalIngredients,
      bunCount,
    };
    case 'REMOVE_INGREDIENT':
      const ingredientToRemove = state.internalIngredients.find(ingredient => ingredient._id === action.id);
      console.log(ingredientToRemove);
      const newInternalIngredients = state.internalIngredients.filter(ingredient => ingredient._id !== action.id);
      const newTotalPrice = ingredientToRemove ? state.totalPrice - ingredientToRemove.price : state.totalPrice;
      return {
        ...state,
        internalIngredients: newInternalIngredients,
        totalPrice: newTotalPrice,
      };
   default:
     throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function init(setIngredients, initPrice) {
  const bunCount = setIngredients.filter((ingredient) => ingredient.type === "bun").length;
  const selectedBun = setIngredients.find((ingredient) => ingredient.type === "bun");
  const bunPrice = selectedBun ? selectedBun.price * 2 : 0;
  const internalIngredients = setIngredients.filter((ingredient) => ingredient.type !== "bun");
  const totalPrice = internalIngredients.reduce((acc,ingredient) => acc + ingredient.price, bunPrice+initPrice );
  return {
    ingredients: setIngredients,
    selectedBun,
    internalIngredients,
    totalPrice,
    bunCount,
  };
}

function BurgerConstructor ({ingredients, initPrice = 0}) {
    const [burgerState, burgerDispatch] = React.useReducer(reducer, ingredients, () => init(ingredients,initPrice));
    // const [selectedBun,setSelectedBun] = React.useState(ingredients.find((ingredient) => ingredient.type === "bun"));
    // const [totalPrice,setTotalPrice] = React.useState(ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice)); 
    
    //const [BurgerIngredients, setBurgerIngredients ] = React.
  
    React.useEffect(() => {
      burgerDispatch({ type: 'SET_INGREDIENTS', ingredients });
    }, [ingredients]);

    const value = {
      burgerState, 
      burgerDispatch,
    }
    return (
      <BurgerContext.Provider value={value}>
        <section className={`${burgerConstructorStyles.burgerContainer}`}>
            {burgerState.ingredients.length > 0 && burgerState.selectedBun && burgerState.bunCount===1 &&
            <BurgerConstructorIngredients />
            }
            <BurgerConstructorPrice />
        </section>
      </BurgerContext.Provider>
    )
}
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType),
  initPrice: PropTypes.number.isRequired,
};

export default BurgerConstructor;