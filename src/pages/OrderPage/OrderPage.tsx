import React,{FC} from 'react'
import orderPageStyle from './OrderPage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader';
import OrderStats from '../../components/OrdersStats/OrderStats';
import OrdersList from '../../components/OrderList/OrdersList';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Puff } from 'react-loader-spinner'
import { IIngredientsStore } from '../../services/types/ingredientTypes';
const OrderPage:FC = () => {
  const {isLoading,error} = useSelector((store:IIngredientsStore) => ({
    isLoading: store.ingredients.isLoading,
    error: store.ingredients.error,
  }),shallowEqual);
 
  return (
    <div className={orderPageStyle.App}>
      <AppHeader />
      <main className={orderPageStyle.main}>
        {isLoading && <Puff
            visible={true}
            height="180"
            width="180"
            color="blue"
            ariaLabel="puff-loading"
            wrapperClass="loader"
        />} 
        {error && <p>Ошибка: {error}</p>} 
        {!isLoading && !error && (
          <>
            <OrdersList />
            <OrderStats /> 
          </>
        )}
      </main>
    </div>
  );
}

export default OrderPage;
