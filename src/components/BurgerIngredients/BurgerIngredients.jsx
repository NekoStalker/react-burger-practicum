import React, { Component, useState } from 'react'
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import burgerIngredientsStyles from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredients ({data}) {
  const [current, setCurrent] = React.useState('bun');
  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabClick = (value) => {
    setCurrent(value);
    switch (value) {
      case 'bun':
        scrollToRef(bunRef);
        setCurrent('bun');
        break;
      case 'sauce':
        scrollToRef(sauceRef);
        setCurrent('sauce');
        break;
      case 'main':
        scrollToRef(mainRef);
        setCurrent('main');
        break;
      default:
        break;
    }
  };
    return (
      <section className={burgerIngredientsStyles.ingridients_modal}>
        <p className="mt-10 text text text_type_main-large ">
              Соберите бургер
        </p>
        <div className="pt-5 pb-4 " style={{ display: 'flex' }}>
          <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={ () => handleTabClick('main')}>
            Начинки
          </Tab>
        </div>
        <div className={burgerIngredientsStyles.ingridients_container}>
          <div ref={bunRef}>
            <BurgerIngredientsGroup key={"Булки"} groupName={"Булки"} burgerIngridients={data.filter((item)=>item.type === "bun")} />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredientsGroup key={"Соусы"} groupName={"Соусы"} burgerIngridients={data.filter((item)=>item.type === "sauce")} />
          </div>
          <div ref={mainRef}>
            <BurgerIngredientsGroup key={"Начинки"} groupName={"Начинки"} burgerIngridients={data.filter((item)=>item.type === "main")} />
          </div>
        </div>
      </section>
    );
}
export default BurgerIngredients;
