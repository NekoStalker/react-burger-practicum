import React, { FC } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import BurgerConstructorIngredients from '../BurgerConstructorIngredients/BurgerConstructorIngredients';

import BurgerConstructorPrice from '../BurgerConstructorPrice/BurgerConstructorPrice';

const BurgerConstructor = () => {
    return (
      <section className={`${burgerConstructorStyles.burger_constructor_container}`}>
          <BurgerConstructorIngredients />
          <BurgerConstructorPrice />
      </section>
    )
}

export default BurgerConstructor;