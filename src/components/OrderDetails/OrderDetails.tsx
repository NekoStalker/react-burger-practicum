import React, {FC} from "react";
import DoneIcon from './icons/done.svg';
import orderDetailStyles from "./OrderDetails.module.css";
import {ICurrentOrderState, IOrderStore} from '../../services/types/orderTypes';
import OrderDetailsIngredient from "../OrderDetailsIngredient/OrderDetailsIngredient";
import { data } from "../../utils/data" ;
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState, useAppSelector } from "../../store";
import { shallowEqual } from "react-redux";
import { formatDate } from "../../utils/datetime";
const OrderDetails:FC = () => {
    
    // const ingredients = [];
    // for(let i = 0; i < 10; i++){
    //     ingredients.push(<OrderDetailsIngredient ingredient={data[i]} count={1}/>)
    // } 
    const order = useAppSelector((state: RootState) => state.currentOrder,shallowEqual );
    const { allIngredients} = useAppSelector((state: RootState) => state.ingredients,shallowEqual );
    const orderIngredients = allIngredients.filter(ingredient => order?.ingredients.includes(ingredient._id));
    const ingredients = [];
    const price = orderIngredients.reduce((acc, ingredient) => { return acc + ingredient.price}, 0);
    for(let i = 0; i < orderIngredients.length; i++){
         ingredients.push(<OrderDetailsIngredient ingredient={orderIngredients[i]} count={1}/>)
    } 
    return (
        <section className={orderDetailStyles.order_details}>
            <div className={orderDetailStyles.order_details_header}>
                <h3 className={`text text_type_digits-default`}>#{order.number}</h3>
            </div>
            <div className={`${orderDetailStyles.order_details_title} mt-10 mb-15`}>
                <h3 className="text text_type_main-medium">{order.name}</h3>
                <p className="text text_type_main-default">{order.status}</p>
            </div>
            <div className={`${orderDetailStyles.order_details_content}`}>
                <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                <div className={`${orderDetailStyles.order_details_ingredient_container}`}>
                    {ingredients}
                </div>  
            </div>
            <div className={`${orderDetailStyles.order_details_footer} mt-10`}>
                <span className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</span>
                <span className={orderDetailStyles.order_details_ingredient_price}><p className="text text_type_digits-default pr-2">{price} </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </section>
     );
}

export default OrderDetails;