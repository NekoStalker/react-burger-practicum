import React, {useState, useRef, RefObject,FC } from 'react'

import ordersListStyles from './OrdersList.module.css';
import OrderListItem from '../OrderListItem/OrderListItem';
const OrdersList:FC = () => {

    return (
      <section className={ordersListStyles.ingredients_modal}>
        <p className="text text text_type_main-large">
              Лента заказов
        </p>
        <div className={`${ordersListStyles.ingredients_tab} pt-5 pb-4 `} >
          <>
            <OrderListItem/>
          </>
          
        </div>
      </section>
    );
}
export default OrdersList;
