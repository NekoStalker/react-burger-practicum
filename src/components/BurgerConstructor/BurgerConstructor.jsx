import React from 'react'
import {Button, ConstructorElement, CurrencyIcon,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients'
import OrderDetails from '../OrderDetails/OrderDetails'
import {ingredientType} from '../../utils/types'
import { useSelector, useDispatch,shallowEqual } from 'react-redux'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice'
import {setBurgerConstructorIngredients} from '../../services/burgerConstructor/burgerConstructorSlice'


function BurgerConstructor () {
  //const initData = data.slice(0,5);
  const dispatch = useDispatch();
  const initData = useSelector((store) => store.ingredients.allIngredients).slice(0,5);
    const {ingredients, selectedBun, bunCount, price} = useSelector((store)=> ({
      ingredients: store.burgerConstructor.burgerConstructorIngredients,
      selectedBun: store.burgerConstructor.selectedBun,
      bunCount: store.burgerConstructor.bunCount,
      price: store.burgerConstructor.price,
    }),shallowEqual);
    
    React.useEffect(() => {
      dispatch(setBurgerConstructorIngredients(initData));
    }, []);


    return (
      <section className={`${burgerConstructorStyles.burgerContainer}`}>
          {ingredients.length > 0 && selectedBun && bunCount===1 &&
            <BurgerConstructorIngredients />
          }
          <BurgerConstructorPrice />
      </section>
    )
}

export default BurgerConstructor;