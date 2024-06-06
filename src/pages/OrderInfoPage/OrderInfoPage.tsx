import React,{FC, useEffect} from 'react'
import orderPageStyle from './OrderInfoPage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader';

import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { Outlet, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
const OrderInfoPage:FC = () => {
  const params = useParams();

  // useEffect(() => {

  //     dispatch(getAllIngredients())
    
  // }, [dispatch, ingredient, params.ingredientId]);

 
  return (
    <div className={orderPageStyle.App}>
      <AppHeader />
      <main className={orderPageStyle.main}>
        <OrderDetails />
      </main>
    </div>
  );
}

export default OrderInfoPage;
