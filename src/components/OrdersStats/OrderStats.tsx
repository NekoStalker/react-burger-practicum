import React, {useState, useRef, RefObject,FC } from 'react'

import orderStatsStyles from './OrderStats.module.css';
import { useAppSelector } from '../../store';

const OrderStats:FC = () => {
  const { orders, total, totalToday} = useAppSelector((state) => state.ordersList);
  const lastOrders = orders.filter(order => order.status === "pending").slice(0,20).map((order) => (
    <div key={order._id} ><p className="text text_type_digits-default mb-2">{order.number}</p></div>
  ));
  const lastPrepared = orders.filter(order => order.status === "done").slice(0,20).map((order) => (
    <div key={order._id} ><p className="text text_type_digits-default mb-2">{order.number}</p></div>
  ));
    return (
      <section className={orderStatsStyles.orderStats_section}>
        <div className={orderStatsStyles.orderStats_header}>
            <div className={orderStatsStyles.orderStats_header_elem }>
              <h4 className="text text_type_main-medium">Готовы:</h4>
              <div className={orderStatsStyles.orderStats_header_elem_nums }>
                {lastPrepared}
              </div>
            </div>
            <div className={orderStatsStyles.orderStats_header_elem }>
              <h4 className="text text_type_main-medium mb-6">В работе:</h4>
              <div className={orderStatsStyles.orderStats_header_elem_list}>
                {lastOrders}
              </div>
          </div>
        </div>
          
        <div className={orderStatsStyles.orderStats_mid_compleated}>
          <h4 className="text text_type_main-medium mb-5">Выполненно за все время:</h4>
          <h5 className="text text_type_digits-large">{total}</h5>
        </div>
        <div className={orderStatsStyles.orderStats_footer_compleated}>
          <h4 className="text text_type_main-medium mb-5">Выполненно за сегодня:</h4>
          <h5 className="text text_type_digits-large">{totalToday}</h5>
        </div>
       
        
      </section>
    );
}
export default OrderStats;
