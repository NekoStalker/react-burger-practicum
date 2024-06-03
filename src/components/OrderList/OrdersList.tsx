import React, {useState, useRef, RefObject,FC, useEffect } from 'react'

import ordersListStyles from './OrdersList.module.css';
import OrderListItem from '../OrderListItem/OrderListItem';
import { useAppDispatch } from '../../store';
import { ordersListConnect, ordersListDisconnect, ordersListMessage } from '../../services/ordersLive/actions'
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import {ordersWebSocket} from '../../services/api'
interface OrderComponentProps {
  size: 'large' | 'small';
}
const OrdersList:FC<OrderComponentProps> = ({size}) => {
    const bigSize:boolean = size === 'large';
    // const orders = [];
    // for( let i = 0; i < 6; i++){
    //   orders.push(<OrderListItem key={i} size={bigSize} />);
    // }

    const dispatch =  useAppDispatch();
    const { orders, total, totalToday, status, error } = useSelector((state: RootState) => state.orders);
  
    useEffect(() => {
      dispatch(ordersListConnect(ordersWebSocket));
      return () => {
        dispatch(ordersListDisconnect());
      };
    }, [dispatch]);
    const printOrders = []
    for( let i = 0; i < 6; i++){
        printOrders.push(<OrderListItem key={i} size={bigSize} />);
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

