import React from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css'
import PropTypes from 'prop-types'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {removeBurgerIngredient} from '../../services/burgerConstructor/burgerConstructorSlice'
import {ingredientType} from '../../utils/types'
function BurgerConstructorIngredients() {
  const dispatch = useDispatch();
  // const [{isDragged}, drag] =  useDrag(() => ({
  //   type: 'INGREDIENT',
  //   item: {id},
  //   collect: (monitor) => ({
  //     isDragged: !!monitor.isDragging(),
  //   }),
  // }));

  const {ingredients, selectedBun} = useSelector((store)=> ({
    ingredients: store.burgerConstructor.burgerConstructorIngredients,
    selectedBun: store.burgerConstructor.selectedBun,
  }),shallowEqual);
  const removeItem = (id) =>{dispatch(removeBurgerIngredient(id))}
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
        
        <BurgerConstructorItem ingredient={ingredient} removeItem={removeItem}  key={ingredient._id}/>
      
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
export default BurgerConstructorIngredients;