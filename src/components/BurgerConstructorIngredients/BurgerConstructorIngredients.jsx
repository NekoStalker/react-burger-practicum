import React from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css';
import {BurgerContext} from '../../services/BurgerContext';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
function BurgerConstructorIngredients() {
  const {burgerState,burgerDispatch} = React.useContext(BurgerContext);
  return(
    <div className={`${burgerConstructorIngredientsStyles.burger_ingredients} `} >
    <ConstructorElement

      type="top"
      isLocked={true}
      text={`${burgerState.selectedBun.name} (верх)`}
      price={burgerState.selectedBun.price}
      thumbnail={burgerState.selectedBun.image}
      className="mr-2"
    />
    <ul className={burgerConstructorIngredientsStyles.burger_ingredients__internal}>
      {burgerState.internalIngredients.map((ingredient) =>
        <li className={burgerConstructorIngredientsStyles.internal_item} key={ingredient._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>{burgerDispatch({type: 'REMOVE_INGREDIENT', id: ingredient._id})}}
          />
        </li>
      )}
    </ul>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${burgerState.selectedBun.name} (низ)`}
      price={burgerState.selectedBun.price}
      thumbnail={burgerState.selectedBun.image}
    />
  </div>
  )
}
BurgerConstructorIngredients.propTypes = {
  burgerState: PropTypes.shape({
    ingredients: PropTypes.arrayOf(ingredientType),
    selectedBun: ingredientType,
    internalIngredients: PropTypes.arrayOf(ingredientType),
    totalPrice: PropTypes.number.isRequired,
    bunCount: PropTypes.number,
  }),
};
export default BurgerConstructorIngredients;