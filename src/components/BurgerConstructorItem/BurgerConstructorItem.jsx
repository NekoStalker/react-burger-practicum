import React,{useRef} from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css'
import PropTypes from 'prop-types'
import {ingredientType} from '../../utils/types'

function BurgerConstructorItem({ ingredient,index, removeItem, moveItem}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept:'ingredientConstructor',
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
      const dragUid = item.uid; 
      const hoverUid = ingredient.uid; 
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
  
      moveItem(dragUid, hoverUid);
      item.index = hoverIndex;
    },
  });
  const [{isDragged}, drag] =  useDrag(() => ({
     type: 'ingredientConstructor',
     item: { id: ingredient._id, uid: ingredient.uid },
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
            handleClose={()=>removeItem(ingredient._id, ingredient.uid)}
          />
    </li>
  )
}

export default BurgerConstructorItem;
BurgerConstructorItem.propTypes = {
  ingredient: ingredientType,
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  moveItem: PropTypes.func.isRequired
};
