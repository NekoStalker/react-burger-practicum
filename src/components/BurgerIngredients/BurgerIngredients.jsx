import React, { Component, useState } from 'react'
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab  } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter  } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon   } from '@ya.praktikum/react-developer-burger-ui-components'
function BurgerIngredients (props) {
  const [current, setCurrent] = React.useState('one');
    return (
      <div className={burgerIngredientsStyles.ingridientsContainer}>
        <p className="mt-10 mb-5 text text_type_main-large ">
              Соберите бургер
        </p>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
    );
}
export default BurgerIngredients;
