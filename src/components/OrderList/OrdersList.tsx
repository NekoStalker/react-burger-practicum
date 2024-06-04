import React, {useState, useRef, RefObject,FC, useEffect } from 'react'

import ordersListStyles from './OrdersList.module.css';
import OrderListItem from '../OrderListItem/OrderListItem';
import { IOrder } from '../../services/types/orderTypes';

interface OrderComponentProps {
  orders: IOrder[],
  size: 'large' | 'small';
}
const OrdersList:FC<OrderComponentProps> = ({orders,size}) => {
    const bigSize:boolean = size === 'large';

    const printOrders = []
    for( let i = 0; i < orders.length; i++){
        printOrders.push(<OrderListItem order={orders[i]} key={i} size={bigSize} />);
    }
    return (
      <section className={size === 'large' ? ordersListStyles.orders_section : ordersListStyles.orders_section_small  }>
        {!bigSize && <p className="text text text_type_main-large">
              Лента заказов
        </p> }
        <div className={size === 'large' ? `${ordersListStyles.orders_container} pb-4 ` : `${ordersListStyles.orders_container_small} pb-4 `} >
          <>
            {printOrders}
          </>
          
        </div>
      </section>
    );
}
export default OrdersList;
function wsConnect(arg0: string): any {
  throw new Error('Function not implemented.');
}

