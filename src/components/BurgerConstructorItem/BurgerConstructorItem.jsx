import React,{useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css'
import PropTypes from 'prop-types'
import {ingredientType} from '../../utils/types'

function BurgerConstructorItem({ingredient, removeItem, index, moveItem}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept:'ingredient1',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  });
  const [{isDragged}, drag] =  useDrag(() => ({
     type: 'ingredient1',
     item: { id: ingredient._id, index: ingredient.index },
     collect: (monitor) => ({
       isDragged: monitor.isDragging(),
     }),
  }));
  drag(drop(ref))
  return (
    <li ref={ref}  className={`${burgerConstructorItemStyles.item} ${isDragged ? burgerConstructorItemStyles.item_dragged : ''}`}  data-handler-id={handlerId}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>removeItem(ingredient._id, index)}
          />
    </li>
  )
}

export default BurgerConstructorItem;
BurgerConstructorItem.propTypes = {
  ingredient: ingredientType,
  removeItem: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired
};
