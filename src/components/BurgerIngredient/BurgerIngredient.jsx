import React from 'react';
import burgeringredientStyles from './BurgerIngredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
function Burgeringredient({id, count,price,name,image}) {
    return ( 
    <li>
        <div className={burgeringredientStyles.card_item}>
          <div className={burgeringredientStyles.card_item__counter}><Counter count={count} size="default" /></div>
          <a className={burgeringredientStyles.card_item__link} href="#">
            <img className={`${burgeringredientStyles.card_item__img} mr-4 ml-4`} src={image} aria-labelledby="title_1" alt={name} width="240" height="120" />
          </a>
          <p className="text text_type_digits-default mt-1 mb-1">{price} <CurrencyIcon/></p>
          <p className="text text_type_main-small">{name}</p>
        </div>
    </li> );
}
Burgeringredient.propTypes = {
  id: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
export default Burgeringredient;