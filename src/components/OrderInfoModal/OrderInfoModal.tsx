import React, {FC} from "react";
import orderInfoStyles from "./OrderInfoModal.module.css";
import { useSelector } from "react-redux";
import {IOrderStore} from '../../services/types/orderTypes';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import OrderDetailsIngredient from "../OrderDetailsIngredient/OrderDetailsIngredient";
const OrderInfoModal:FC = () => {
    const ingredients = [];
    for(let i = 0; i < 10; i++){
        ingredients.push(<OrderDetailsIngredient ingredient={data[i]} count={1}/>)
    } 
    const orderID = useSelector((store:IOrderStore) => store.order.orderID);
    return (
        <div className={orderInfoStyles.order_details}>
         
            <div className={`${orderInfoStyles.order_details_title} mt-10 mb-5`}>
                <h3 className="text text_type_main-medium">Black Hole Singularity острый бургер</h3>
                <p className="text text_type_main-default">Создан</p>
            </div>
            <div className={`${orderInfoStyles.order_details_content}`}>
                <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                <div className={`${orderInfoStyles.order_details_ingredient_container}`}>
                    {ingredients}
                </div>  
            </div>
            <div className={`${orderInfoStyles.order_details_footer} mt-10`}>
                <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
                <span className={orderInfoStyles.order_details_ingredient_price}><p className="text text_type_digits-default pr-2">228 </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </div>
     );
}

export default OrderInfoModal;