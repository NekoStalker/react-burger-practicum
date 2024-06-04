import React,{FC, useEffect} from 'react'
import ordersPageStyle from './OrdersPage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader';
import OrderStats from '../../components/OrdersStats/OrderStats';
import OrdersList from '../../components/OrderList/OrdersList';
import { shallowEqual } from 'react-redux'
import { Puff } from 'react-loader-spinner'
import { IIngredientsStore } from '../../services/types/ingredientTypes';
import { useAppDispatch,RootState, useAppSelector  } from '../../store';
import { ordersListConnect, ordersListDisconnect, ordersListMessage } from '../../services/ordersLive/actions';
import { ordersWebSocket } from '../../services/api';
import { WebsocketStatus } from '../../services/types/orderTypes';
const OrdersPage:FC = () => {
  const dispatch =  useAppDispatch();
  const { orders, total, totalToday, status, error } = useAppSelector((state: RootState) => state.orders,shallowEqual );

  useEffect(() => {
    dispatch(ordersListConnect(ordersWebSocket));
    return () => {
      dispatch(ordersListDisconnect());
    };
  }, [dispatch]);
  return (
    <div className={ordersPageStyle.App}>
      <AppHeader />
      <main className={ordersPageStyle.main}>
        { status === WebsocketStatus.OFFLINE  && <Puff
            visible={true}
            height="180"
            width="180"
            color="blue"
            ariaLabel="puff-loading"
            wrapperClass="loader"
        />} 
        {error && <p>Ошибка: {error}</p>} 
        {!(status === WebsocketStatus.OFFLINE) && !error && (
          <>
            <OrdersList orders={orders} size="small" />
            <OrderStats /> 
          </>
        )}
      </main>
    </div>
  );
}

export default OrdersPage;
