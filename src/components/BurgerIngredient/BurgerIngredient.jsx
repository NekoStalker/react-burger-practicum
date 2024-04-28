import React from 'react'
import burgeringredientStyles from './BurgerIngredient.module.css'
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {ingredientType} from '../../utils/types'
import {openModalIngredient} from '../../services/currentIngredient/currentIngredientSlice'
import {useDrag} from 'react-dnd';
function Burgeringredient({ingredient}) {
    const location = useLocation();
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
    const [{isDragged}, drag] =  useDrag(() => ({
      type: 'ingredient',
      item: ingredient,
      collect: (monitor) => ({
        isDragged: !!monitor.isDragging(),
      }),
    }));
    const handleOpenModal = (e) => {
        e.preventDefault(); // 
        dispatch(openModalIngredient(ingredient));
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
    }

    return ( 
    <li >
        <div className={`${burgeringredientStyles.card_item} ${isDragged ? burgeringredientStyles.card_opacity: ''}`} ref={drag}>
          <div className={burgeringredientStyles.card_item__counter}><Counter count={ingredient.__v} size="default" /></div>
          <a className={burgeringredientStyles.card_item__link} href="#" onClick={handleOpenModal}>
            <img className={`${burgeringredientStyles.card_item__img} mr-4 ml-4`} src={ingredient.image}  alt={ingredient.name} width="240" height="120" />
          </a>
          <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon/></p>
          <p className="text text_type_main-small">{ingredient.name}</p>
        </div>
    </li> );
}
Burgeringredient.propTypes = {
  ingredient: ingredientType,
}
export default Burgeringredient;