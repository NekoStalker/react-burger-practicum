import React from 'react'
import {Button, ConstructorElement, CurrencyIcon,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients'
import OrderDetails from '../OrderDetails/OrderDetails'
import {ingredientType} from '../../utils/types'
import { useSelector, useDispatch } from 'react-redux'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice'
import {setBurgerConstructorIngredients} from '../../services/burgerConstructor/burgerConstructorSlice'
import { data } from '../../utils/data'
// function reducer(state, action) {
//   switch (action.type) {
//    case "SET_INGREDIENTS":
//     const bunCount = action.ingredients.filter((ingredient) => ingredient.type === "bun").length;
//     const selectedBun = action.ingredients.find((ingredient) => ingredient.type === "bun");
//     const bunPrice = selectedBun ? selectedBun.price * 2 : 0;
//     const internalIngredients = action.ingredients.filter((ingredient) => ingredient.type !== "bun");
//     const totalPrice = internalIngredients.reduce((acc,ingredient) => acc + ingredient.price, bunPrice );
//     return {
//       ...state,
//       ingredients: action.ingredients,
//       totalPrice,
//       internalIngredients,
//       bunCount,
//     };
//     case 'REMOVE_INGREDIENT':
//       const ingredientToRemove = state.internalIngredients.find(ingredient => ingredient._id === action.id);
//       console.log(ingredientToRemove);
//       const newInternalIngredients = state.internalIngredients.filter(ingredient => ingredient._id !== action.id);
//       const newTotalPrice = ingredientToRemove ? state.totalPrice - ingredientToRemove.price : state.totalPrice;
//       return {
//         ...state,
//         internalIngredients: newInternalIngredients,
//         totalPrice: newTotalPrice,
//       };
//    default:
//      throw new Error(`Wrong type of action: ${action.type}`);
//   }
// }

// function init(setIngredients, initPrice) {
//   const bunCount = setIngredients.filter((ingredient) => ingredient.type === "bun").length;
//   const selectedBun = setIngredients.find((ingredient) => ingredient.type === "bun");
//   const bunPrice = selectedBun ? selectedBun.price * 2 : 0;
//   const internalIngredients = setIngredients.filter((ingredient) => ingredient.type !== "bun");
//   const totalPrice = internalIngredients.reduce((acc,ingredient) => acc + ingredient.price, bunPrice+initPrice );
//   return {
//     ingredients: setIngredients,
//     selectedBun,
//     internalIngredients,
//     totalPrice,
//     bunCount,
//   };
// }

function BurgerConstructor () {
  const initData = data.slice(0,5);
  const dispatch = useDispatch();
    const {ingredients, selectedBun, bunCount, price} = useSelector((store)=> ({
      ingredients: store.burgerConstructor.burgerConstructorIngredients,
      selectedBun: store.burgerConstructor.selectedBun,
      bunCount: store.burgerConstructor.bunCount,
      price: store.burgerConstructor.price,
    }));
    
    //const [burgerState, burgerDispatch] = React.useReducer(reducer, ingredients, () => init(ingredients,initPrice));
    // const [selectedBun,setSelectedBun] = React.useState(ingredients.find((ingredient) => ingredient.type === "bun"));
    // const [totalPrice,setTotalPrice] = React.useState(ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice)); 
    
    //const [BurgerIngredients, setBurgerIngredients ] = React.
  
    React.useEffect(() => {
      dispatch(setBurgerConstructorIngredients(initData));
    }, []);

    // const value = {
    //   burgerState, 
    //   burgerDispatch,
    // }

    return (
      <section className={`${burgerConstructorStyles.burgerContainer}`}>
          {ingredients.length > 0 && selectedBun && bunCount===1 &&
            <BurgerConstructorIngredients />
          }
          <BurgerConstructorPrice />
      </section>
    )
}
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType),
  initPrice: PropTypes.number.isRequired,
};

export default BurgerConstructor;