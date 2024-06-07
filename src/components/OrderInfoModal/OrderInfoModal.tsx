import React, {FC, useEffect} from "react";
import orderInfoStyles from "./OrderInfoModal.module.css";
import { shallowEqual, useSelector } from "react-redux";
import {IOrder, IOrderStore} from '../../services/types/orderTypes';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import OrderDetailsIngredient from "../OrderDetailsIngredient/OrderDetailsIngredient";
import { useAppDispatch, useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { setCurrentOrder } from "../../services/currentOrder/currentOrderSlice";
import { getUniqueIngredientsWithCounts, translateOrderStatus } from "../../utils/orderFormat";
import { IIngredientState } from "../../services/types/ingredientTypes";
const OrderInfoModal:FC = () => {
    const order = useAppSelector((state) => state.currentOrder,shallowEqual );
    const { allIngredients} = useAppSelector((state) => state.ingredients,shallowEqual );
    const orders = useAppSelector((store) => store.ordersList.orders);
    const { number } = useParams(); 
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (number) {
            const order:IOrder | undefined = orders.find((order) => order.number.toString() === number)
            if(order)
            dispatch(setCurrentOrder(order)); 
        }
      }, [number,orders, dispatch]); 

    const { translatedStatus, classStatusName } = translateOrderStatus(order?.status);
    const orderIngredients =  order.ingredients.map(id => allIngredients.find(ingredient => ingredient._id === id)).filter(ingredient => ingredient !== undefined) as IIngredientState[];;
    const price = orderIngredients.reduce((acc, ingredient) => { return ingredient ?  acc + ingredient.price : acc + 0 }, 0);
    const uniqueIngredientsWithCounts = getUniqueIngredientsWithCounts(orderIngredients);
    const ingredients = uniqueIngredientsWithCounts.map((ingredient) => (
        <OrderDetailsIngredient key={ingredient.item._id} ingredient={ingredient.item} count={ingredient.count} />
    ));
    return (
        <section className={orderInfoStyles.order_details}>
            <div className={`${orderInfoStyles.order_details_title} mt-5 mb-5`}>
                <h3 className={`text text_type_main-${order.name.length > 40 ? 'small' : 'medium'}`}>{order.name}</h3>
                <p className={`text text_type_main-default ${classStatusName}`}>{translatedStatus}</p>
            </div>
            <div className={`${orderInfoStyles.order_details_content}`}>
                <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                <div className={`${orderInfoStyles.order_details_ingredient_container}`}>
                    {ingredients}
                </div>  
            </div>
            <div className={`${orderInfoStyles.order_details_footer} mt-2`}>
            <span className={orderInfoStyles.order_details_ingredient_date}><p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order?.createdAt || '')} /></p></span>
                <span className={orderInfoStyles.order_details_ingredient_price}><p className="text text_type_digits-default pr-2">{price} </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </section>
     );
}

export default OrderInfoModal;