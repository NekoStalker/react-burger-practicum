import React from 'react';
import burgerConstructorPriceStyle from './BurgerConstructorPrice.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {ingredientType} from '../../utils/types';
function BurgerConstructorPrice() {
    const {ingredients, selectedBun, price} = useSelector((store)=> ({
      ingredients: store.burgerConstructor.burgerConstructorIngredients,
      selectedBun: store.burgerConstructor.selectedBun,
      price: store.burgerConstructor.price,
    }));

    const [openModal, setOpenModal] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [orderNum, setOrderNum] = React.useState({number: -1});

    const addr = "https://norma.nomoreparties.space/api/orders";

    React.useEffect(() => {
      const getOrderDetails = async () => {
        setIsLoading(true);
        setError(null);
          try
          {
            const reqBody = 
            {
              "ingredients": Array.from(ingredients).map(element => element._id).filter(id => id),
            }
            const res = await fetch(addr, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
                body: JSON.stringify(reqBody),
              });
              if(!res.ok){
                throw new Error('Ошибка запроса  заказа');
              }
              const data = await res.json();
              setOrderNum(data.order);
            } 
              catch (error) 
            {
              setError(error);
            } 
              finally 
            {
              setIsLoading(false);
            }
        }
        getOrderDetails();
      },[ingredients ]);
    const handleOpenModal = () => {
      setOpenModal(true);
      console.log(orderNum);
    }
    const handleCloseModal = () => {
      setOpenModal(false);
    }
    const modal = (
        <Modal title="" onClose={handleCloseModal}>
          <OrderDetails orderID={orderNum.number} />
        </Modal>
      );
    return (
    <div className={`${burgerConstructorPriceStyle.burger_price} pt-10`}>
         {openModal && modal }
        <p className="text text_type_digits-medium  mt-1 mb-1">{price} <CurrencyIcon className="pl-1" /></p>
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal} >
            Оформить заказ
        </Button>
    </div>
  );
}
BurgerConstructorPrice.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType),
    selectedBun: ingredientType,
    internalIngredients: PropTypes.arrayOf(ingredientType),
    totalPrice: PropTypes.number.isRequired,
    bunCount: PropTypes.number,

};
export default BurgerConstructorPrice;