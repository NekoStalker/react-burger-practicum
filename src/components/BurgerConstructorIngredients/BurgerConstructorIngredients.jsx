import React from 'react'
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorIngredientsStyles from './BurgerConstructorIngredients.module.css'
import PropTypes from 'prop-types'
import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {removeBurgerIngredient,addBurgerIngredient} from '../../services/burgerConstructor/burgerConstructorSlice'
import {addIngredientCount,removeIngredientCount} from '../../services/ingredients/ingredientsSlice'
import {ingredientType} from '../../utils/types'
import {useDrop} from 'react-dnd';
function BurgerConstructorIngredients() {
  const dispatch = useDispatch();
  // const [{isDragged}, drag] =  useDrag(() => ({
  //   type: 'INGREDIENT',
  //   item: {id},
  //   collect: (monitor) => ({
  //     isDragged: !!monitor.isDragging(),
  //   }),
  // }));
  const [ , drop] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
        isHover: monitor.isOver(),
    }),
    // hover(item, monitor) {
    //   const dragIndex = item.index; // Индекс перетаскиваемой задачи
    //   const hoverIndex = index; //
    // },
    drop(item) {
      dispatch(addBurgerIngredient(item));
      dispatch(addIngredientCount(item))
    },
  });
  const {ingredients, selectedBun} = useSelector((store)=> ({
    ingredients: store.burgerConstructor.burgerConstructorIngredients,
    selectedBun: store.burgerConstructor.selectedBun,
  }),shallowEqual);
  const removeItem = (id) =>{dispatch(removeBurgerIngredient(id));  dispatch(removeIngredientCount(id))}
  const internalIngredients = ingredients.filter((ingredient) => ingredient.type !== "bun");
  return(
    <div ref={drop} className={`${burgerConstructorIngredientsStyles.burger_ingredients} ` }>
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${ selectedBun.name} (верх)`}
      price={ selectedBun.price}
      thumbnail={selectedBun.image}
      className="mr-2"
    />
    <ul className={burgerConstructorIngredientsStyles.burger_ingredients__internal}>

      { internalIngredients.map((ingredient,index) => 
        
        <BurgerConstructorItem ingredient={ingredient} removeItem={removeItem} index={index} key={ingredient._id+index}/>
      
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