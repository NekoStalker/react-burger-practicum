import React from 'react';
import burgerIngrIdientStyles from './BurgerIngridient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerIngridient({id, count,price,name,image}) {
    return ( 
    <li>
        <div className={burgerIngrIdientStyles.card_item}>
          <div className={burgerIngrIdientStyles.card_item__counter}><Counter count={count} size="default" /></div>
          <a className={burgerIngrIdientStyles.card_item__link} href="#">
            <img className={`${burgerIngrIdientStyles.card_item__img} mr-4 ml-4`} src={image} aria-labelledby="title_1" alt="" width="240" height="120" />
          </a>
          <p className="text text_type_main-medium mt-1 mb-1">{price} <CurrencyIcon /></p>
          <p className="text text_type_main-small">{name}</p>
        </div>
    </li> );
}

export default BurgerIngridient;