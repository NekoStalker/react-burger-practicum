import React, {FC} from 'react';
import burgeringredientStyles from './BurgerIngredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import {openModalIngredient} from '../../services/currentIngredient/currentIngredientSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import {useDrag} from 'react-dnd';
import {IIngredientState} from '../../services/types/ingredientTypes';
import { useAppDispatch } from '../../services/types/storeType';
interface BurgerIngredientProps {
  ingredient: IIngredientState;
}
const BurgerIngredient: FC<BurgerIngredientProps> =({ingredient}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [{isDragged}, drag] =  useDrag(() => ({
      type: 'ingredient',
      item: ingredient,
      collect: (monitor) => ({
        isDragged: !!monitor.isDragging(),
      }),
    }));
    const handleOpenModal = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault(); 
        dispatch(openModalIngredient(ingredient));
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
    }

    return ( 
          <li>
              <div className={`${burgeringredientStyles.card_item} ${isDragged ? burgeringredientStyles.card_opacity: ''}`} ref={drag}>
              <div className={burgeringredientStyles.card_item__counter}><Counter count={ingredient.__v || 0} size="default" /></div>
              <a className={burgeringredientStyles.card_item__link} href="#" onClick={handleOpenModal}>
                <img className={`${burgeringredientStyles.card_item__img} mr-4 ml-4`} src={ingredient.image}  alt={ingredient.name} width="240" height="120" />
              </a>
              <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon type="primary"/></p>
              <p className="text text_type_main-small">{ingredient.name}</p>
              </div>
          </li> 
        );
}

export default BurgerIngredient;