import React from 'react'
import burgerConstructorStyles from './BurgerConstructor.module.css'
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients'
import { useDispatch} from 'react-redux'

import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice'

function BurgerConstructor () {
    return (
      <section className={`${burgerConstructorStyles.burger_constructor_container}`}>
          <BurgerConstructorIngredients />
          <BurgerConstructorPrice />
      </section>
    )
}

export default BurgerConstructor;