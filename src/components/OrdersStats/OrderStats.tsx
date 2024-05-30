import React, {useState, useRef, RefObject,FC } from 'react'

import orderStatsStyles from './OrderStats.module.css';

const OrderStats:FC = () => {

    return (
      <section className={orderStatsStyles.orderStats_section}>
        <div className={orderStatsStyles.orderStats_header}>
            <div className={orderStatsStyles.orderStats_header_elem }>
              <h4 className="text text_type_main-medium">Готовы:</h4>
              <div className={orderStatsStyles.orderStats_header_elem_nums }>
                <p className="text text_type_digits-default mb-2">034532</p>
                <p className="text text_type_digits-default mb-2">034532</p>
                <p className="text text_type_digits-default mb-2">034532</p>
                <p className="text text_type_digits-default mb-2">034532</p>
              </div>
            </div>
            <div className={orderStatsStyles.orderStats_header_elem }>
              <h4 className="text text_type_main-medium mb-6">Лента заказов:</h4>
              <p className="text text_type_digits-default mb-2">034532</p>
              <p className="text text_type_digits-default mb-2">034532</p>
              <p className="text text_type_digits-default mb-2">034532</p>
              <p className="text text_type_digits-default mb-2">034532</p>
          </div>
        </div>
          
        <div className={orderStatsStyles.orderStats_mid_compleated}>
          <h4 className="text text_type_main-medium mb-5">Выполненно за все время:</h4>
          <h5 className="text text_type_digits-large">5575</h5>
        </div>
        <div className={orderStatsStyles.orderStats_footer_compleated}>
          <h4 className="text text_type_main-medium mb-5">Выполненно за сегодня:</h4>
          <h5 className="text text_type_digits-large">5575</h5>
        </div>
       
        
      </section>
    );
}
export default OrderStats;
