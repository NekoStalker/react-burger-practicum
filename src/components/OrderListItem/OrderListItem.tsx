import React, {useState, useRef, RefObject,useEffect,FC, ReactNode } from 'react'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderListItemStyles from './OrderListItem.module.css';
import { data } from '../../utils/data';
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from '../../store';

import { useDispatch } from 'react-redux';
import { IOrder } from '../../services/types/orderTypes';
import { formatDate } from '../../utils/datetime';
import { useLocation, useNavigate } from 'react-router-dom';
import { openModalOrder } from '../../services/currentOrder/currentOrderSlice';
interface OrderListItemProps {
  order?: IOrder;
  size: boolean;
}
const OrderListItem:FC<OrderListItemProps> = ({order,size}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleOpenModal = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault(); 
    if(order){
      dispatch(openModalOrder(order));
      navigate(`/orders/${order._id}`, { state: { background: location } });
    }
}

  const { allIngredients} = useAppSelector((state: RootState) => state.ingredients);
  const orderIngredients = allIngredients.filter(ingredient => order?.ingredients.includes(ingredient._id));
  const orderIngredientsView: ReactNode = orderIngredients.map((ingredient, index) => (
    <div
        key={ingredient._id}
        className={size ? orderListItemStyles.order_item__specification_ingredient : orderListItemStyles.order_item__specification_ingredient_small}
    >
        <img
            className={`${size ? orderListItemStyles.ingredient_image : orderListItemStyles.ingredient_image_small} ${index === 5 ? orderListItemStyles.blured : '' }` }
            src={ingredient.image}
            alt={ingredient.name}
            
        />
        {index === 5 && (
            <span className={`${orderListItemStyles.ingredient_image_text} text text_type_digits-default`}>
              +{orderIngredients.length - 5}
          </span>
              ) }
            
    </div>
)).slice(0, 6).reverse();

  const price = orderIngredients.reduce((acc, ingredient) => { return acc + ingredient.price}, 0);
    return (
      <div className={size ? orderListItemStyles.order_item : orderListItemStyles.order_item_small} onClick={handleOpenModal} >
        <div className={size ? orderListItemStyles.order_item__header : orderListItemStyles.order_item__header_small }>
          <span className="text text_type_digits-default">#{order?.number}</span>
          <span className="text text_type_main-default text_color_inactive">{formatDate(order?.createdAt)}</span>
        </div>
        <div className={size ? orderListItemStyles.order_item__name : orderListItemStyles.order_item__name_small}>
          <h3 className={`text text_type_main-${(order && order?.name.length > 36) ? 'default' : 'medium'}`}>{order?.name}</h3>
      
          {size && <p className="text text_type_main-small">Создан</p>}
        </div>
        <div className={size ? orderListItemStyles.order_item__specification : orderListItemStyles.order_item__specification_small }>
          <div className={size ? orderListItemStyles.order_item__specification_ingredients : orderListItemStyles.order_item__specification_ingredients_small }>
            {orderIngredientsView}
          </div>
          <div className={size ? orderListItemStyles.order_price : orderListItemStyles.order_price_small}> <p className="text text_type_digits-default pr-2">{price}</p> <CurrencyIcon  type="primary"/></div>
        </div>
      </div>
    );
}
export default OrderListItem;
