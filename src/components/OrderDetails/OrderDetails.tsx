import React, {FC, useEffect} from "react";
import DoneIcon from './icons/done.svg';
import orderDetailStyles from "./OrderDetails.module.css";
import {ICurrentOrderState, IOrder, IOrderStore} from '../../services/types/orderTypes';
import OrderDetailsIngredient from "../OrderDetailsIngredient/OrderDetailsIngredient";
import { data } from "../../utils/data" ;
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { shallowEqual } from "react-redux";
import { formatDate } from "../../utils/datetime";
import { useParams } from "react-router-dom";
import { setCurrentOrder } from "../../services/currentOrder/currentOrderSlice";
import { getUniqueIngredientsWithCounts, translateOrderStatus } from "../../utils/orderFormat";
import { IIngredientState } from "../../services/types/ingredientTypes";
const OrderDetails:FC = () => {
    const orders = useAppSelector((store: RootState) => store.ordersList.orders);
    const { number } = useParams(); 
    const dispatch = useAppDispatch()
    const order = useAppSelector((state: RootState) => state.currentOrder,shallowEqual );
    const { allIngredients} = useAppSelector((state: RootState) => state.ingredients,shallowEqual );
    useEffect(() => {
        if (number) {
            const order:IOrder | undefined = orders.find((order) => order.number.toString() == number)
            if(order)
            dispatch(setCurrentOrder(order)); 
        }
      }, [number,orders, dispatch]); 
    const { translatedStatus, classStatusName } = translateOrderStatus(order.status);
      const orderIngredients =  order.ingredients.map(id => allIngredients.find(ingredient => ingredient._id === id)).filter(ingredient => ingredient !== undefined) as IIngredientState[];;
      const price = orderIngredients.reduce((acc, ingredient) => { return ingredient ?  acc + ingredient.price : acc + 0 }, 0);
      const uniqueIngredientsWithCounts = getUniqueIngredientsWithCounts(orderIngredients);
      const ingredients = uniqueIngredientsWithCounts.map((ingredient) => (
          <OrderDetailsIngredient ingredient={ingredient.item} count={ingredient.count} />
      ));

    return (
        <section className={orderDetailStyles.order_details}>
            <div className={orderDetailStyles.order_details_header}>
                <h3 className={`text text_type_digits-default`}>#{order.number}</h3>
            </div>
            <div className={`${orderDetailStyles.order_details_title} mt-10 mb-15`}>
                <h3 className={`text text_type_main-${order.name.length > 60 ? 'default' : 'medium'}`}>{order.name}</h3>
                <p className={`text text_type_main-default ${classStatusName}`}>{translatedStatus}</p>
            </div>
            <div className={`${orderDetailStyles.order_details_content}`}>
                <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                <div className={`${orderDetailStyles.order_details_ingredient_container}`}>
                    {ingredients}
                </div>  
            </div>
            <div className={`${orderDetailStyles.order_details_footer} mt-10`}>
                <span className={orderDetailStyles.order_details_ingredient_date}><p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p></span>
                <span className={orderDetailStyles.order_details_ingredient_price}><p className="text text_type_digits-default pr-2">{price} </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </section>
     );
}

export default OrderDetails;