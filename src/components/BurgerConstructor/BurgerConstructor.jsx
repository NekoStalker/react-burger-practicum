import React from 'react'
import {Button, ConstructorElement, CurrencyIcon,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {ingredientType} from '../../utils/types';
function BurgerConstructor ({ingredients, initPrice}) {

    // const [selectedBun,setSelectedBun] = React.useState(ingredients.find((ingredient) => ingredient.type === "bun"));
    // const [totalPrice,setTotalPrice] = React.useState(ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice)); 
    
    const selectedBun = ingredients.find((ingredient) => ingredient.type === "bun");
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [internalIngredients, setInternalIngredients] = React.useState([]);
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
    React.useEffect(() => {
      const totalPrice = ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice);
      setInternalIngredients(ingredients.filter((ingredient) => ingredient.type !== "bun"));
      setTotalPrice(totalPrice);
    }, [ingredients,initPrice]);
    const handleClose = (id) => {
        setInternalIngredients(internalIngredients.filter((internalIngredients) => internalIngredients._id !== id));
    }
    return (
      <div className={`${burgerConstructorStyles.burgerContainer}`}>
        {openModal && modal }
          {ingredients.length > 0 && selectedBun &&
          <div className={`${burgerConstructorStyles.burger_ingredients} `} >
            <ConstructorElement

              type="top"
              isLocked={true}
              text={`${selectedBun.name} (верх)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
              className="mr-2"
            />
            <ul className={burgerConstructorStyles.burger_ingredients__internal}>
              {internalIngredients.map((ingredient) =>
                <li className={burgerConstructorStyles.internal_item} key={ingredient._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={()=>handleClose(ingredient._id)}
                  />
                </li>
              )}
            </ul>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun.name} (низ)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          </div>
          }
          <div className={`${burgerConstructorStyles.burger_price} pt-10`}>
            <p className="text text_type_digits-medium  mt-1 mb-1">{totalPrice} <CurrencyIcon className="pl-1" /></p>
            <Button htmlType="button" type="primary" size="medium" onClick={handleOpenModal} >
              Оформить заказ
            </Button>
          </div>
      </div>
    )
}
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType),
  initPrice: PropTypes.number.isRequired,
};

export default BurgerConstructor;