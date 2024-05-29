import React, {useState, useRef, RefObject,FC } from 'react'

import orderListItemStyles from './OrderListItem.module.css';

const orderListItem:FC = () => {
    return (
      <div className={orderListItemStyles.order_item}>
        <span></span>
      </div>
    );
}
export default orderListItem;
