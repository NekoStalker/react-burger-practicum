import React, {useState, useRef, RefObject,FC } from 'react'

import ordersListStyles from './OrdersList.module.css';
import OrderListItem from '../OrderListItem/OrderListItem';
interface OrderComponentProps {
  size: 'large' | 'small';
}
const OrdersList:FC<OrderComponentProps> = ({size}) => {
    const bigSize:boolean = size === 'large';
    const orders = [];
    for( let i = 0; i < 6; i++){
      orders.push(<OrderListItem key={i} size={bigSize} />);
    }
    return (
      <section className={size === 'large' ? ordersListStyles.orders_section : ordersListStyles.orders_section_small  }>
        {!bigSize && <p className="text text text_type_main-large">
              Лента заказов
        </p> }
        <div className={size === 'large' ? `${ordersListStyles.orders_container} pb-4 ` : `${ordersListStyles.orders_container_small} pb-4 `} >
          <>
            {orders}
          </>
          
        </div>
      </section>
    );
}
export default OrdersList;
