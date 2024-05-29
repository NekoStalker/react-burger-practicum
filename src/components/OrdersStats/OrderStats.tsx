import React, {useState, useRef, RefObject,FC } from 'react'

import orderStatsStyles from './OrderStats.module.css';

const OrderStats:FC = () => {

    return (
      <section className={orderStatsStyles.ingredients_modal}>
        <p className="text text text_type_main-large">
              Лента заказов
        </p>
        <div className={`${orderStatsStyles.ingredients_tab} pt-5 pb-4 `} >

        </div>
      </section>
    );
}
export default OrderStats;
