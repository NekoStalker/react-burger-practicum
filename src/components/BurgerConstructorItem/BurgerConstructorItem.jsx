import React from 'react'
import { useDrag } from 'react-dnd';
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css'
function BurgerConstructorItem({ingredient, removeItem}) {
     const [{isDragged}, drag] =  useDrag(() => ({
     type: 'INGREDIENT',
     item: ingredient._id,
     collect: (monitor) => ({
       isDragged: !!monitor.isDragging(),
     }),
   }));
  return (
    <li ref={drag} style={{opacity: isDragged ? 0.5 : 1}} className={burgerConstructorItemStyles.item} >
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
