import React from "react";
import ingredientDetailsStyle from './IngredientDetails.module.css'
import IngredientComposition from "../IngredientComposition/IngredientComposition";
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
function IngredientDetails({ingredient}) {
    return ( 
    <div className={ingredientDetailsStyle.ingredient_details}>
        <div className={ingredientDetailsStyle.ingredient_image}><img src={ingredient.image_large}  alt={ingredient.name} /></div>
        <h3  className={`${ingredientDetailsStyle.ingredient_image} text text_type_main-medium mb-8 mt-4`} >{ingredient.name}</h3>
        <ul className={`${ingredientDetailsStyle.ingredient_compositions} mb-15`}>
            <IngredientComposition composition = {"Калории,ккал"} value={ingredient.calories}></IngredientComposition>
            <IngredientComposition composition = {"Белки, г"} value={ingredient.proteins}></IngredientComposition>
            <IngredientComposition composition = {"Жиры, г"} value={ingredient.fat}></IngredientComposition>
            <IngredientComposition composition = {"Углеводы, г"} value={ingredient.carbohydrates}></IngredientComposition>
        </ul>
    </div> 
    );
}
IngredientDetails.propTypes = {
    ingredients: ingredientType,
};
  
export default IngredientDetails;