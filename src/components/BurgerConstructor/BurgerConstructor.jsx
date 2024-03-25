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


function BurgerConstructor ({ingredients, initPrice}) {
    
    // const [selectedBun,setSelectedBun] = React.useState(ingredients.find((ingredient) => ingredient.type === "bun"));
    // const [totalPrice,setTotalPrice] = React.useState(ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice)); 
    
    const selectedBun = ingredients.find((ingredient) => ingredient.type === "bun");
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [internalIngredients, setInternalIngredients] = React.useState(ingredients.filter((ingredient) => ingredient.type !== "bun"));
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const addr = "https://norma.nomoreparties.space/api/orders";
  // useEffect(() => {
  //   const getOrderDetails = async () => {
  //       setIsLoading(true);
  //       setError(null);
  //       try{
    //       const reqBody = ingredients;
  //         const res = await fetch(addr, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(requestBody),
  // });
  //         if(!res.ok){
  //           throw new Error('Ошибка запроса  заказа');
  //         }
  //         const data = await res.json();
  //         console.log(data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //   }
  //   getIngredientsData();
  // },[]);
    //const [BurgerIngredients, setBurgerIngredients ] = React.
  
    React.useEffect(() => {
      setInternalIngredients(ingredients.filter((ingredient) => ingredient.type !== "bun"));
      const totalPrice = ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice);
      setTotalPrice(totalPrice);
    }, [ingredients,initPrice]);

    React.useEffect(() => {
      const totalPrice = internalIngredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice);
      setTotalPrice(totalPrice);
    },[internalIngredients, initPrice]);

    const removeIngredient = (id) => {
        console.log(totalPrice);
        setInternalIngredients(internalIngredients.filter((internalIngredients) => internalIngredients._id !== id));
        console.log(totalPrice);
    }
    const value = {
      ingredients,
      selectedBun,
      internalIngredients,
      totalPrice,
      removeIngredient,
    }
    return (
      <BurgerContext.Provider value={value}>
        <section className={`${burgerConstructorStyles.burgerContainer}`}>
            {ingredients.length > 0 && selectedBun &&
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