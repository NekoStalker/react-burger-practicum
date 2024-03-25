import React from 'react';
import burgerConstructorPriceStyle from './BurgerConstructorPrice.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerContext} from '../../services/BurgerContext';
function BurgerConstructorPrice() {
    const burger = React.useContext(BurgerContext);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    }
    const handleCloseModal = () => {
      setOpenModal(false);
    }
    const modal = (
        <Modal title="" onClose={handleCloseModal}>
          <OrderDetails orderID={"034536"} />
        </Modal>
      );
    return (
    <div className={`${burgerConstructorPriceStyle.burger_price} pt-10`}>
         {openModal && modal }
        <p className="text text_type_digits-medium  mt-1 mb-1">{burger.totalPrice} <CurrencyIcon className="pl-1" /></p>
        <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal} >
            Оформить заказ
        </Button>
    </div>
  );
}
export default BurgerConstructorPrice;