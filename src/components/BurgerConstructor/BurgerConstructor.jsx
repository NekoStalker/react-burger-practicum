import React from 'react'
import {Button, ConstructorElement, CurrencyIcon,DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
function BurgerConstructor ({ingredients, initPrice}) {
    const [internalIngredients,setInternalIngredients] = React.useState(ingredients.filter((ingredient) => ingredient.type !== "bun"));
    // const [selectedBun,setSelectedBun] = React.useState(ingredients.find((ingredient) => ingredient.type === "bun"));
    // const [totalPrice,setTotalPrice] = React.useState(ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice)); 
    const selectedBun = ingredients.find((ingredient) => ingredient.type === "bun");
    const totalPrice = ingredients.reduce((accumulator, ingredient) => accumulator + ingredient.price,initPrice); 
    const handleClose = (id) => {
        setInternalIngredients(internalIngredients.filter((internalIngredients) => internalIngredients._id !== id));
    }
    return (
      <div className={`${burgerConstructorStyles.burgerContainer}`}>
          {ingredients.length > 0 && selectedBun &&
          <div className={`${burgerConstructorStyles.burger_ingredients} `} >
            <ConstructorElement

              type="top"
              isLocked={true}
              text={selectedBun.name}
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
              text={selectedBun.name}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          </div>
          }
          <div className={`${burgerConstructorStyles.burger_price} pt-10`}>
            <p className="text text_type_digits-medium  mt-1 mb-1">{totalPrice} <CurrencyIcon className="pl-1" /></p>
            <Button htmlType="button" type="primary" size="medium" >
              Оформить заказ
            </Button>
          </div>
      </div>
    )
}
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['main', 'sauce', 'bun']).isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number
    })
  ),
  initPrice: PropTypes.number.isRequired,
};

export default BurgerConstructor;