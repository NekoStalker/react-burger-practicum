import React, {FC} from "react";
import ingredientCompositionStyles from "./ingredientComposition.module.css";


interface IIngredientComposition {
    composition: string;
    value: number;
};
const IngredientComposition: FC<IIngredientComposition> = ({composition, value}) => {
    return (   
    <li className={ingredientCompositionStyles.ingredient_composition}>
        <p className="text text_type_main-default text_color_inactive">{composition}</p>
        <p className="text text_type_main-default text_color_inactive">{value}</p>
    </li>  );
}

  
export default IngredientComposition;