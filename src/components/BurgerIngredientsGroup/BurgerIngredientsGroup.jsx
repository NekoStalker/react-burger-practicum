import React from 'react'
import Burgeringredient from '../BurgerIngredient/BurgerIngredient';
import burgerIngredientsGroupStyle from './BurgerIngredientsGroup.module.css'
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
function BurgerIngredientsGroup({groupName, burgeringredients}) {
  return (
    <>
      <h2 className="mt-6 text text_type_main-medium">{groupName}</h2>
      <ul className={burgerIngredientsGroupStyle.card_list}>
        {burgeringredients.map((ingredient)=>{return <Burgeringredient key={ingredient._id} ingredient={ingredient}/>})}
      </ul>
    </>
  )
}
BurgerIngredientsGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  burgeringredients: PropTypes.arrayOf(ingredientType),
}
export default BurgerIngredientsGroup;