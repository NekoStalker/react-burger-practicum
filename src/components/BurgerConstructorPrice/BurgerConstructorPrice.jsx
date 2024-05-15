import React from 'react'
import burgerConstructorPriceStyle from './BurgerConstructorPrice.module.css'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import {Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {BUN_NOT_SELECTED} from '../../services/burgerConstructor/burgerConstructorSlice'
import {getOrderModal} from '../../services/order/orderRequests'
import {resetConstructor} from '../../services/burgerConstructor/burgerConstructorSlice'
import { Puff } from 'react-loader-spinner'
import { useNavigate,useLocation } from 'react-router-dom';

function BurgerConstructorPrice() {
    const dispatch = useDispatch();
    const isLoggedIn  = useSelector(state => state.user.isLoggedIn);
    const navigate = useNavigate();
    const location = useLocation();
    const {ingredients,selectedBun, price,openModal,isLoading,error, orderId} = useSelector((store)=> ({
      ingredients: store.burgerConstructor.internalIngredients,
      selectedBun:  store.burgerConstructor.selectedBun,
      price: store.burgerConstructor.price,
      openModal: store.order.openModal,
      isLoading: store.order.isLoading,
      error: store.order.error,
      orderId: store.order.orderID
    }),shallowEqual);

    
  const handleOpenModal = async (e) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    await dispatch(getOrderModal([selectedBun, ...ingredients])).then((res) => {
      e.preventDefault(); 
      console.log(res);
      dispatch(resetConstructor()); 
      navigate(`/order/${res.payload.number}`, { state: { background: location } });
      
      })
    };

    
    return (
    <div className={`${burgerConstructorPriceStyle.burger_price} pt-10`}>
         {isLoading && <Puff
            visible={true}
            height="180"
            width="180"
            color="blue"
            ariaLabel="puff-loading"
            wrapperClass={burgerConstructorPriceStyle.loader}
        />}
        <p className="text text_type_digits-medium  mt-1 mb-1">{price} <CurrencyIcon className="pl-1" /></p>
        <Button htmlType="button" type="primary" disabled={selectedBun.name === BUN_NOT_SELECTED} size="medium" onClick={handleOpenModal} >
            Оформить заказ
        </Button>
    </div>
  );
}

export default BurgerConstructorPrice;