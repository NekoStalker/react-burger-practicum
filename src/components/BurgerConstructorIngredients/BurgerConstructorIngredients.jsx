import React from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {removeBurgerIngredient} from '../../services/burgerConstructor/burgerConstructorSlice'
import {ingredientType} from '../../utils/types'
function BurgerConstructorIngredients() {
  const dispatch = useDispatch();
  const {ingredients, selectedBun} = useSelector((store)=> ({
    ingredients: store.burgerConstructor.burgerConstructorIngredients,
    selectedBun: store.burgerConstructor.selectedBun,
  }));
  const internalIngredients = ingredients.filter((ingredient) => ingredient.type !== "bun");
  return(
    <div className={`${burgerConstructorIngredientsStyles.burger_ingredients} `} >
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${ selectedBun.name} (верх)`}
      price={ selectedBun.price}
      thumbnail={selectedBun.image}
      className="mr-2"
    />
    <ul className={burgerConstructorIngredientsStyles.burger_ingredients__internal}>
      { internalIngredients.map((ingredient) =>
        <li className={burgerConstructorIngredientsStyles.internal_item} key={ingredient._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>{dispatch(removeBurgerIngredient(ingredient._id))}}
          />
        </li>
      )}
    </ul>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${selectedBun.name} (низ)`}
      price={selectedBun.price}
      thumbnail={selectedBun.image}
    />
  </div>
  )
}
BurgerConstructorIngredients.propTypes = {

    ingredients: PropTypes.arrayOf(ingredientType),
    selectedBun: ingredientType,
    internalIngredients: PropTypes.arrayOf(ingredientType),
    totalPrice: PropTypes.number.isRequired,
    bunCount: PropTypes.number,
};
export default BurgerConstructorIngredients;