import React, {FC} from 'react';
import Burgeringredient from '../BurgerIngredient/BurgerIngredient';
import BurgerIngredientsGroupStyle from './BurgerIngredientsGroup.module.css';
import {IIngredientState} from '../../services/types/ingredientTypes';


interface BurgerIngredientsGroupProps {
  burgeringredients:  IIngredientState[];
  groupName: string;
}

const BurgerIngredientsGroup: FC<BurgerIngredientsGroupProps> = ({groupName, burgeringredients}) => {
  return (
    <>
      <h2 className="mt-6 text text_type_main-medium">{groupName}</h2>
      <ul className={BurgerIngredientsGroupStyle.card_list}>
        {burgeringredients.map((ingredient)=>{return <Burgeringredient key={ingredient._id} ingredient={ingredient}/>})}
      </ul>
    </>
  )
}
export default BurgerIngredientsGroup;