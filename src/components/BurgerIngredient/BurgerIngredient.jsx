import React from 'react';
import burgeringredientStyles from './BurgerIngredient.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
function Burgeringredient({ingredient}) {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
      setOpenModal(true);
    }
    const handleCloseModal = () => {
      setOpenModal(false);
    }
    const modal = (
      <Modal title="Детали ингредиента" onClose={handleCloseModal}>
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    );
    return ( 
    <li>
       {openModal && modal}
        <div className={burgeringredientStyles.card_item}>
          <div className={burgeringredientStyles.card_item__counter}><Counter count={ingredient.__v} size="default" /></div>
          <a className={burgeringredientStyles.card_item__link} href="#" onClick={handleOpenModal}>
            <img className={`${burgeringredientStyles.card_item__img} mr-4 ml-4`} src={ingredient.image}  alt={ingredient.name} width="240" height="120" />
          </a>
          <p className="text text_type_digits-default mt-1 mb-1">{ingredient.price} <CurrencyIcon/></p>
          <p className="text text_type_main-small">{ingredient.name}</p>
        </div>
    </li> );
}
Burgeringredient.propTypes = {
  ingredient: ingredientType,
}
export default Burgeringredient;