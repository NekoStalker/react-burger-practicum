import React from "react";
import ingredientCompositionStyles from "./ingredientComposition.module.css"
function IngredientComposition({composition, value}) {
    return (   
    <li className={ingredientCompositionStyles.ingredient_composition}>
        <p className="text text_type_main-default text_color_inactive">{composition}</p>
        <p className="text text_type_main-default text_color_inactive">{value}</p>
    </li>  );
}

export default IngredientComposition;