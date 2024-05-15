import React, {FC} from "react"
import DoneIcon from './icons/done.svg'
import orderDetailStyles from "./OrderDetails.module.css"
import { useSelector } from "react-redux"
import {IOrderStore} from '../../types/orderTypes'
const OrderDetails:FC = () => {
    const orderID = useSelector((store:IOrderStore) => store.order.orderID);
    return (
        <div className={orderDetailStyles.order_details}>
            <div className={orderDetailStyles.order_details_header}>
                <h3 className={`text text_type_digits-large`}>{orderID}</h3>
                <p className="text text_type_main-medium mt-4">
                    идентификатор заказа
                </p>
            </div>
            <div className={`${orderDetailStyles.order_details_body} mt-15 mb-15`}>
                <img src={DoneIcon} alt="Done"  width="120px" height="120px"/>
            </div>
            <div className={`${orderDetailStyles.order_details_footer}`}>
                <p className="text text_type_main-small mb-2">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
     );
}

export default OrderDetails;