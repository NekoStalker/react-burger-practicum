import React from "react";
import ingredientCompositionStyles from "./ingredientComposition.module.css"
import PropTypes from 'prop-types';
function IngredientComposition({composition, value}) {
    return (   
    <li className={ingredientCompositionStyles.ingredient_composition}>
        <p className="text text_type_main-default text_color_inactive">{composition}</p>
        <p className="text text_type_main-default text_color_inactive">{value}</p>
    </li>  );
}
IngredientComposition.propTypes = {
    composition: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};
  
export default IngredientComposition;