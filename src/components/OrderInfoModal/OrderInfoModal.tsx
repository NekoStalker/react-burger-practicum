import React, {FC} from "react";
import orderInfoStyles from "./OrderInfoModal.module.css";
import { shallowEqual, useSelector } from "react-redux";
import {IOrderStore} from '../../services/types/orderTypes';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import OrderDetailsIngredient from "../OrderDetailsIngredient/OrderDetailsIngredient";
import { RootState, useAppSelector } from "../../store";
import { formatDate } from "../../utils/datetime";
const OrderInfoModal:FC = () => {
    const order = useAppSelector((state: RootState) => state.currentOrder,shallowEqual );
    const { allIngredients} = useAppSelector((state: RootState) => state.ingredients,shallowEqual );
    const orderIngredients = allIngredients.filter(ingredient => order?.ingredients.includes(ingredient._id));
    const ingredients = [];
    const price = orderIngredients.reduce((acc, ingredient) => { return acc + ingredient.price}, 0);
    for(let i = 0; i < orderIngredients.length; i++){
         ingredients.push(<OrderDetailsIngredient ingredient={orderIngredients[i]} count={1}/>)
    } 
    return (
        <section className={orderInfoStyles.order_details}>
            <div className={orderInfoStyles.order_details_header}>
                <h3 className={`text text_type_digits-default`}>#{order.number}</h3>
            </div>
            <div className={`${orderInfoStyles.order_details_title} mt-10 mb-15`}>
                <h3 className="text text_type_main-medium">{order.name}</h3>
                <p className="text text_type_main-default">{order.status}</p>
            </div>
            <div className={`${orderInfoStyles.order_details_content}`}>
                <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                <div className={`${orderInfoStyles.order_details_ingredient_container}`}>
                    {ingredients}
                </div>  
            </div>
            <div className={`${orderInfoStyles.order_details_footer} mt-10`}>
                <span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span>
                <span className={orderInfoStyles.order_details_ingredient_price}><p className="text text_type_digits-default pr-2">{price} </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </section>
     );
}

export default OrderInfoModal;