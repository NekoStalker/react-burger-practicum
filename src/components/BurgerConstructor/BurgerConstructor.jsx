import React from 'react'
import burgerConstructorStyles from './BurgerConstructor.module.css'
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients'
import { useDispatch} from 'react-redux'

import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice'
import {resetConstructor} from '../../services/burgerConstructor/burgerConstructorSlice'

function BurgerConstructor () {
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(resetConstructor());
  }, [dispatch]);


    return (
      <section className={`${burgerConstructorStyles.burgerContainer}`}>
          <BurgerConstructorIngredients />
          <BurgerConstructorPrice />
      </section>
    )
}

export default BurgerConstructor;