import React, {useState, useRef, RefObject,FC } from 'react'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderListItemStyles from './OrderListItem.module.css';
import { data } from '../../utils/data';
interface OrderListItemProps {
  size: boolean;
}
const orderListItem:FC<OrderListItemProps> = ({size}) => {
    return (
      <div className={size ? orderListItemStyles.order_item : orderListItemStyles.order_item_small}>
        <div className={size ? orderListItemStyles.order_item__header : orderListItemStyles.order_item__header_small }>
          <span className="text text_type_digits-default">#034535</span>
          <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
        </div>
        <div className={size ? orderListItemStyles.order_item__name : orderListItemStyles.order_item__name_small}>
          <h3 className="text text_type_main-medium">Death Star Burger</h3>
      
          {size && <p className="text text_type_main-small">Создан</p>}
        </div>
        <div className={size ? orderListItemStyles.order_item__specification : orderListItemStyles.order_item__specification_small }>
          <div className={size ? orderListItemStyles.order_item__specification_ingredients : orderListItemStyles.order_item__specification_ingredients_small }>
            <div  className={size ? orderListItemStyles.order_item__specification_ingredient : orderListItemStyles.order_item__specification_ingredient_small }>
              <img className={size ? orderListItemStyles.ingredient_image : orderListItemStyles.ingredient_image_small} src="https://code.s3.yandex.net/react/code/bun-01.png" alt="Соус фирменный Space Sauce" />
            </div>
            <div className={size ? orderListItemStyles.order_item__specification_ingredient : orderListItemStyles.order_item__specification_ingredient_small }>
              <img className={size ? orderListItemStyles.ingredient_image : orderListItemStyles.ingredient_image_small } src="https://code.s3.yandex.net/react/code/bun-01.png" alt="Соус фирменный Space Sauce" />
            </div>
          </div>
          <div className={size ? orderListItemStyles.order_price : orderListItemStyles.order_price_small}> <p className="text text_type_digits-default pr-2">228 </p> <CurrencyIcon  type="primary"/></div>
        </div>
      </div>
    );
}
export default orderListItem;
