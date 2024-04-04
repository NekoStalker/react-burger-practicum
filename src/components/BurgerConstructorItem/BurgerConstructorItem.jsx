import React from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css'
import PropTypes from 'prop-types'
import {ingredientType} from '../../utils/types'

function BurgerConstructorItem({ingredient, removeItem, index}) {
  const [{isDragged}, drag] =  useDrag(() => ({
     type: 'ingredient',
     item: { id: ingredient._id, index: index },
     collect: (monitor) => ({
       isDragged: !!monitor.isDragging(),
     }),
  }));
  return (
    <li ref={drag} style={{display: isDragged ? 'none' : ''}} className={burgerConstructorItemStyles.item} >
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>removeItem(ingredient._id)}
          />
    </li>
  )
}

export default BurgerConstructorItem;
BurgerConstructorItem.propTypes = {
  ingredient: ingredientType,
  removeItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};
