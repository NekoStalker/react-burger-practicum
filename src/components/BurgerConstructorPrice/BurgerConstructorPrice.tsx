import React, {FC} from 'react'
import burgerConstructorPriceStyle from './BurgerConstructorPrice.module.css'
import {Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {  shallowEqual } from 'react-redux'
import {BUN_NOT_SELECTED} from '../../services/burgerConstructor/burgerConstructorSlice'
import {getOrderModal} from '../../services/order/orderRequests'
import {resetConstructor} from '../../services/burgerConstructor/burgerConstructorSlice'
import { Puff } from 'react-loader-spinner'
import { useNavigate,useLocation } from 'react-router-dom';
import { useAppDispatch , useAppSelector} from '../../store';
import { IIngredientState } from '../../services/types/ingredientTypes'

const BurgerConstructorPrice:FC = () => {
    const dispatch =  useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {ingredients,selectedBun, price,isLoading,isLoggedIn} = useAppSelector((store)=> ({
      ingredients: store.burgerConstructor.internalIngredients,
      selectedBun:  store.burgerConstructor.selectedBun,
      price: store.burgerConstructor.price,
      openModal: store.order.openModal,
      isLoading: store.order.isLoading,
      isLoggedIn: store.user.isLoggedIn
    }),shallowEqual);

    
    const handleOpenModal = ():void => {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        processOrder();
      }
    };
    
    const processOrder = async () => {
      if (!selectedBun) {
        console.error('No bun selected');
        return;
      }
      const orderIngredients: IIngredientState[] = [selectedBun, ...ingredients, selectedBun];
      try
      {
        const res= await dispatch(getOrderModal(orderIngredients)).unwrap();
        if (res.success) {
          dispatch(resetConstructor());
          navigate(`/order/${res.order.number}`, { state: { background: location } });
        }
      }
      catch(error) {
        console.error('Order error:', error);
      }
      
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
        <p className="text text_type_digits-medium  mt-1 mb-1">{price} <span className="pl-1"><CurrencyIcon type="primary" /> </span></p>
        <Button data-cy="send-order" htmlType="button" type="primary" disabled={selectedBun && selectedBun.name === BUN_NOT_SELECTED || false} size="medium" onClick={handleOpenModal} >
            Оформить заказ
        </Button>
    </div>
  );
}

export default BurgerConstructorPrice;