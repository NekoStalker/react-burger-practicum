import React, { FC, useEffect } from 'react';
import ordersPageStyle from './OrdersPage.module.css';
import AppHeader from '../../components/AppHeader/AppHeader';
import OrderStats from '../../components/OrdersStats/OrderStats';
import OrdersList from '../../components/OrderList/OrdersList';
import { shallowEqual } from 'react-redux';
import { Puff } from 'react-loader-spinner';
import { useAppDispatch, RootState, useAppSelector } from '../../store';
import { ordersListConnect, ordersListDisconnect, ordersListMessage } from '../../services/ordersLive/actions';
import { ordersWebSocket } from '../../services/api';
import { ICalcOrder, WebsocketStatus } from '../../services/types/orderTypes';
import { Outlet, useMatch } from 'react-router-dom';
import classNames from 'classnames';
import { calculateOrderPrice } from '../../utils/orderFormat';
const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, status, error } = useAppSelector((state: RootState) => state.ordersList, shallowEqual);
  const ingredients = useAppSelector((state: RootState) =>state.ingredients.allIngredients, shallowEqual);
  const ordersWithPrices:ICalcOrder[] = orders.map((order) => ({
    ...order,
    price: calculateOrderPrice(order, ingredients),
  }))
  .sort((a, b) => b.number - a.number);
  const match = useMatch('/feed/:number');

  useEffect(() => {
    dispatch(ordersListConnect(ordersWebSocket));
    return () => {
      dispatch(ordersListDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={ordersPageStyle.App}>
      <AppHeader />
      <main className={classNames(ordersPageStyle.main, { [ordersPageStyle.outletMain]: match })}>
  
        {match ? (
          <Outlet />
        ) : (
          <>
            {status === WebsocketStatus.OFFLINE && (
              <Puff
                visible={true}
                height="180"
                width="180"
                color="blue"
                ariaLabel="puff-loading"
                wrapperClass="loader"
              />
            )}
            {status !== WebsocketStatus.OFFLINE && !error && (
              <>
                <OrdersList orders={ordersWithPrices} size="small" />
                <OrderStats />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
