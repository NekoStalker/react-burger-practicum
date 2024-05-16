import React, { useCallback,FC } from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {removeBurgerIngredient,addBurgerIngredient,changeIngredientsOrder,BUN_NOT_SELECTED} from '../../services/burgerConstructor/burgerConstructorSlice'
import {addIngredientCount,removeIngredientCount} from '../../services/ingredients/ingredientsSlice'
import {useDrop} from 'react-dnd';
import { TDispatch } from '../../types/storeType';
import {  IBurgerConstructorStore} from '../../types/burgerConstructorTypes';
const  BurgerConstructorIngredients:FC = () => {
  const dispatch = useDispatch() as TDispatch;
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
  const { selectedBun, internalIngredients} = useSelector((store:IBurgerConstructorStore)=> ({
    selectedBun: store.burgerConstructor.selectedBun,
    internalIngredients: store.burgerConstructor.internalIngredients,
  }),shallowEqual);
  const moveItem = (dragUid:string, hoverUid:string):void => {
    dispatch(changeIngredientsOrder({fromUid:dragUid, toUid:hoverUid}));
  };
  const removeItem = (id:string,uid:string):void =>{
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
        <BurgerConstructorItem key={ingredient.uid} ingredient={ingredient} index={index} removeItem={removeItem} moveItem={moveItem} />
      )) : (
        <div className={burgerConstructorIngredientsStyles.hide_img}>
            <ConstructorElement
              text="Выберете ингредиенты бургера"
              thumbnail=""
              price={0}
              isLocked={true}
              extraClass={`mr-2 ${burgerConstructorIngredientsStyles.constructor_element}` }
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