import React from 'react'
import BurgerIngridient from '../BurgerIngridient/BurgerIngridient';
import burgerIngredientsGroupStyle from './BurgerIngredientsGroup.module.css'
function BurgerIngredientsGroup({groupName, burgerIngridients}) {
  return (
    <>
      <h2 className="mt-6 text text_type_main-medium">{groupName}</h2>
      <ul className={burgerIngredientsGroupStyle.card_list}>
        {burgerIngridients.map((ingredient)=>{return <BurgerIngridient key={ingredient._id} id={ingredient._id} count={ingredient.__v} price={ingredient.price} name={ingredient.name} image={ingredient.image}/>})}
      </ul>
    </>
  )
}
export default BurgerIngredientsGroup;