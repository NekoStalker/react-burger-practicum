import React from 'react';
import burgerConstructorPriceStyle from './BurgerConstructorPrice.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerContext} from '../../services/BurgerContext';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
function BurgerConstructorPrice() {
    const {burgerState} = React.useContext(BurgerContext);
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
              "ingredients": Array.from(burgerState.ingredients).map(element => element._id).filter(id => id),
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
      },[burgerState.ingredients,burgerState.internalIngredients ]);
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
        <p className="text text_type_digits-medium  mt-1 mb-1">{burgerState.totalPrice} <CurrencyIcon className="pl-1" /></p>
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal} >
            Оформить заказ
        </Button>
    </div>
  );
}
BurgerConstructorPrice.propTypes = {
  burgerState: PropTypes.shape({
    ingredients: PropTypes.arrayOf(ingredientType),
    selectedBun: ingredientType,
    internalIngredients: PropTypes.arrayOf(ingredientType),
    totalPrice: PropTypes.number.isRequired,
    bunCount: PropTypes.number,
  }),
};
export default BurgerConstructorPrice;