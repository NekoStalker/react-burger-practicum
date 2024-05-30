import React, {useState, useRef, RefObject,FC } from 'react'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderListItemStyles from './OrderListItem.module.css';
import { data } from '../../utils/data';
const orderListItem:FC = () => {
    return (
      <div className={orderListItemStyles.order_item}>
        <div className={orderListItemStyles.order_item__header}>
          <span>tesst</span>
          <span>test</span>
        </div>
        <div className={orderListItemStyles.order_item__name}>
          <h3 className="text text_type_main-medium">Death Star Burger</h3>
        </div>
        <div className={orderListItemStyles.order_item__specification}>
          <div className={orderListItemStyles.order_item__specification_ingredients}>
            <div className={orderListItemStyles.order_item__specification_ingredient}>
              <img className={orderListItemStyles.ingredient_image} src="https://code.s3.yandex.net/react/code/sauce-04.png" alt="Соус фирменный Space Sauce" />
            </div>
            <div className={orderListItemStyles.order_item__specification_ingredient}>
              <img className={orderListItemStyles.ingredient_image} src="https://code.s3.yandex.net/react/code/sauce-04.png" alt="Соус фирменный Space Sauce" />
            </div>
          </div>
          <div> <p className="text text_type_digits-default mt-1 mb-1">228 <CurrencyIcon type="primary"/></p></div>
        </div>
      </div>
    );
}
export default orderListItem;
