import React from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css';
import {BurgerContext} from '../../services/BurgerContext';
function BurgerConstructorIngredients() {
  const burger = React.useContext(BurgerContext);
  return(
    <div className={`${burgerConstructorIngredientsStyles.burger_ingredients} `} >
    <ConstructorElement

      type="top"
      isLocked={true}
      text={`${burger.selectedBun.name} (верх)`}
      price={burger.selectedBun.price}
      thumbnail={burger.selectedBun.image}
      className="mr-2"
    />
    <ul className={burgerConstructorIngredientsStyles.burger_ingredients__internal}>
      {burger.internalIngredients.map((ingredient) =>
        <li className={burgerConstructorIngredientsStyles.internal_item} key={ingredient._id}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>burger.removeIngredient(ingredient._id)}
          />
        </li>
      )}
    </ul>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${burger.selectedBun.name} (низ)`}
      price={burger.selectedBun.price}
      thumbnail={burger.selectedBun.image}
    />
  </div>
  )
}
export default BurgerConstructorIngredients;