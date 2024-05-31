import React, {FC} from "react"
import DoneIcon from './icons/done.svg'
import orderDetailStyles from "./OrderDetails.module.css"
import { useSelector } from "react-redux"
import {IOrderStore} from '../../services/types/orderTypes'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
const OrderDetails:FC = () => {
    //const orderID = useSelector((store:IOrderStore) => store.order.orderID);
    return (
        <section className={orderDetailStyles.order_details}>
            <div className={orderDetailStyles.order_details_header}>
                <h3 className={`text text_type_digits-default`}>#034533</h3>
            </div>
            <div className={`${orderDetailStyles.order_details_title} mt-10 mb-15`}>
                <h3 className="text text_type_main-medium">Black Hole Singularity острый бургер</h3>
                <p className="text text_type_main-default">Создан</p>
                
            </div>
            <div className={`${orderDetailStyles.order_details_content}`}>

            </div>
            <div className={`${orderDetailStyles.order_details_footer}`}>
                <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
                <span><p className="text text_type_digits-default pr-2">228 </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </section>
     );
}

export default OrderDetails;