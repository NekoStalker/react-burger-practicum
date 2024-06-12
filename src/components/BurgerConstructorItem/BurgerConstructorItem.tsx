import React,{useRef,FC,RefObject} from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ConstructorElement,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorItemStyles from './BurgerConstructorItem.module.css'
import {IBurgerConstructorIngredient} from '../../services/types/burgerConstructorTypes'
type Identifier = ReturnType<DropTargetMonitor['getHandlerId']>;
interface IBurgerConstructorProps {
  ingredient: IBurgerConstructorIngredient;
  index: number;
  removeItem: (ingredient_id: string, ingredient_uid: string) => void;
  moveItem: (dragUid: string, hoverUid: string) => void;
}

interface IDragItem {
  index: number ;
  uid: string;
}

const  BurgerConstructorItem: FC<IBurgerConstructorProps> = ({ ingredient,index, removeItem, moveItem}) =>{
  const ref: RefObject<HTMLLIElement> = useRef(null);
  const [{ handlerId }, drop] = useDrop<IDragItem, void, { handlerId: Identifier | null }>({
    accept: 'ingredientConstructor',
    collect: (monitor: DropTargetMonitor) => ({
        handlerId: monitor.getHandlerId(),
    }),
    hover: (item: IDragItem, monitor: DropTargetMonitor) => {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index; 
        const dragUid = item.uid;
        const hoverUid = ingredient.uid; 
        
        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();

        if (!clientOffset) {
            return;
        }

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || 
            (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
            return;
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
    <li ref={ref} data-cy={`burger-ingredient-${ingredient.type}`}  className={`${burgerConstructorItemStyles.item} ${isDragged ? burgerConstructorItemStyles.item_dragged : ''}`}  data-handler-id={handlerId}>
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={()=>removeItem(ingredient._id, ingredient.uid)}
            extraClass={burgerConstructorItemStyles.item_ingredient}
            data-cy="constructor-item"
          />
    </li>
  )
}

export default BurgerConstructorItem;

