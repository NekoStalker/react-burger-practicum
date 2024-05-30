import React, {useState, useRef, RefObject,FC } from 'react'

import ordersListStyles from './OrdersList.module.css';
import OrderListItem from '../OrderListItem/OrderListItem';
const OrdersList:FC = () => {
    const orders = [];
    for( let i = 0; i < 6; i++){
      orders.push(<OrderListItem/>);
    }
    return (
      <section className={ordersListStyles.orders_section}>
        <p className="text text text_type_main-large">
              Лента заказов
        </p>
        <div className={`${ordersListStyles.orders_container} pb-4 `} >
          <>
            {orders}
          </>
          
        </div>
      </section>
    );
}
export default OrdersList;
