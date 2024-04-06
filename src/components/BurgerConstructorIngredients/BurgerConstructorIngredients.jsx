import React, { useCallback } from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {removeBurgerIngredient,addBurgerIngredient,changeIngredientsOrder,BUN_NOT_SELECTED} from '../../services/burgerConstructor/burgerConstructorSlice'
import {addIngredientCount,removeIngredientCount} from '../../services/ingredients/ingredientsSlice'

import {useDrop} from 'react-dnd';
function BurgerConstructorIngredients() {
  const dispatch = useDispatch();
  const [ , drop] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
        isHover: monitor.isOver(),
    }),

    drop(item) {
      dispatch(addBurgerIngredient(item));
      dispatch(addIngredientCount(item))
    },
  });
  const { selectedBun, internalIngredients} = useSelector((store)=> ({
    
    selectedBun: store.burgerConstructor.selectedBun,
    internalIngredients: store.burgerConstructor.internalIngredients,
  }),shallowEqual);
  const moveItem = (dragUid, hoverUid) => {
    dispatch(changeIngredientsOrder({fromUid:dragUid, toUid:hoverUid}));
  };
  const removeItem = (id,uid) =>{
    dispatch(removeBurgerIngredient(uid)); 
    dispatch(removeIngredientCount(id));
  };
  return(
    <div ref={drop} className={`${burgerConstructorIngredientsStyles.burger_ingredients} 
    ${selectedBun.name === BUN_NOT_SELECTED ? burgerConstructorIngredientsStyles.hide_img : '' } ` }>
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${ selectedBun.name} (верх)`}
      price={ selectedBun.price}
      thumbnail={selectedBun.image}
      extraClass="mr-2"
    />
    <ul className={burgerConstructorIngredientsStyles.burger_ingredients__internal}>

      {internalIngredients.length > 0 ? (internalIngredients.map((ingredient,index) => 
        <BurgerConstructorItem ingredient={ingredient} index={index} removeItem={removeItem} uid={ingredient.uid} key={ingredient.uid} moveItem={moveItem} />
      )) : (
        <div className={burgerConstructorIngredientsStyles.hide_img}>
            <ConstructorElement
              text="Выберете ингредиенты бургера"
              extraClass="mr-2"
              isLocked="true"
          />
        </div>)

      }
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