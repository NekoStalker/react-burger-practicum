import React, {FC} from "react"
import orderDetailsIngredientStyles from "./OrderDetailsIngredient.module.css"

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import {IIngredientState} from '../../services/types/ingredientTypes'
interface OrderDetailsIngredientProps {
    ingredient: IIngredientState,
    count: number,
}
const OrderDetailsIngredient:FC<OrderDetailsIngredientProps> = ({ ingredient, count }) => {
    return (
        <div className={orderDetailsIngredientStyles.order_details_ingredient}>
        <div className={orderDetailsIngredientStyles.order_details_ingredient_item}>
          <img
            className={orderDetailsIngredientStyles.order_details_ingredient_image}
            src={ingredient.image}
            alt={ingredient.name}
          />
        </div>
        <div className={orderDetailsIngredientStyles.order_details_ingredient_name}>
          <h3 className="text text_type_main-default">{ingredient.name}</h3>
        </div>
        <div className={orderDetailsIngredientStyles.order_details_ingredient_price}>
          <p className="text text_type_digits-small pr-2">{`${count}x${ingredient.price}`} </p> <CurrencyIcon type="primary" />
        </div>
      </div>
     );
}

export default OrderDetailsIngredient;