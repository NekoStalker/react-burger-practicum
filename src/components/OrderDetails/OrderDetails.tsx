import React, {FC, useEffect, useMemo} from "react";
import DoneIcon from './icons/done.svg';
import orderDetailStyles from "./OrderDetails.module.css";
import {ICurrentOrderState, IOrder, IOrderStore} from '../../services/types/orderTypes';
import OrderDetailsIngredient from "../OrderDetailsIngredient/OrderDetailsIngredient";
import { data } from "../../utils/data" ;
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { shallowEqual } from "react-redux";
import { formatDate } from "../../utils/datetime";
import { useMatch, useParams } from "react-router-dom";
import { setCurrentOrder } from "../../services/currentOrder/currentOrderSlice";
import { getUniqueIngredientsWithCounts, translateOrderStatus } from "../../utils/orderFormat";
import { IIngredientState } from "../../services/types/ingredientTypes";
import { fetchOrderById } from "../../services/currentOrder/currentOrderRequests";
import { Puff } from "react-loader-spinner";
import { ordersListDisconnect } from "../../services/ordersLive/actions";
const OrderDetails:FC = () => {
    const match = useMatch('/profile/orders/:number');
    const orders = useAppSelector((store) => store.ordersList.orders);
    const ordersHist = useAppSelector((store) => store.ordersHistory.orders);
    const { number } = useParams(); 
    const dispatch = useAppDispatch()
    const order = useAppSelector((state) => state.currentOrder);
    const allIngredients = useAppSelector((state) => state.ingredients.allIngredients );

    useEffect(() => {
        if (number) {
          const order: IOrder | undefined = match
            ? ordersHist.find((order) => order.number.toString() === number)
            : orders.find((order) => order.number.toString() === number);
    
          if (order) {
            dispatch(setCurrentOrder(order));
          } else {
            dispatch(fetchOrderById(number));
            dispatch(ordersListDisconnect());
          }
        }
      }, [number, orders, ordersHist, match, dispatch]);
    const { translatedStatus, classStatusName } = translateOrderStatus(order.status);
    const orderIngredients = useMemo(() => {
        return order.ingredients
          .map(id => allIngredients.find(ingredient => ingredient._id === id))
          .filter(ingredient => ingredient !== undefined) as IIngredientState[];
      }, [order.ingredients, allIngredients]);
    
      const price = useMemo(() => {
        return orderIngredients.reduce((acc, ingredient) => {
          return ingredient ? acc + ingredient.price : acc + 0;
        }, 0);
      }, [orderIngredients]);
    
      const uniqueIngredientsWithCounts = useMemo(() => {
        return getUniqueIngredientsWithCounts(orderIngredients);
      }, [orderIngredients]);
    
      const ingredients = useMemo(() => {
        return uniqueIngredientsWithCounts.map((ingredient) => (
          <OrderDetailsIngredient key={ingredient.item._id} ingredient={ingredient.item} count={ingredient.count} />
        ));
      }, [uniqueIngredientsWithCounts]);
    if (order.isLoading || !order){
        return (
            <Puff
              visible={true}
              height="180"
              width="180"
              color="blue"
              ariaLabel="puff-loading"
              wrapperClass="loader"
            />
          );
    }
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
                <span className={orderDetailStyles.order_details_ingredient_date}><p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order?.createdAt || '')} /></p></span>
                <span className={orderDetailStyles.order_details_ingredient_price}><p className="text text_type_digits-default pr-2">{price} </p> <CurrencyIcon  type="primary"/></span>
            </div>
        </section>
     );
}

export default OrderDetails;