import React,{FC} from 'react'
import orderPageStyle from './OrderInfoPage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader';
import OrderStats from '../../components/OrdersStats/OrderStats';
import OrdersList from '../../components/OrderList/OrdersList';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Puff } from 'react-loader-spinner'
import { IIngredientsStore } from '../../services/types/ingredientTypes';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
const OrderInfoPage:FC = () => {

  return (
    <div className={orderPageStyle.App}>
      <AppHeader />
      <main className={orderPageStyle.main}>
        <OrderDetails />
        {/* {isLoading && <Puff
            visible={true}
            height="180"
            width="180"
            color="blue"
            ariaLabel="puff-loading"
            wrapperClass="loader"
        />}  */}
       
          
      </main>
    </div>
  );
}

export default OrderInfoPage;
