import React,{useEffect} from "react"
import ingredientDetailsStyle from './IngredientDetails.module.css'
import IngredientComposition from "../IngredientComposition/IngredientComposition"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentIngredient } from "../../services/currentIngredient/currentIngredientSlice";
import { Puff } from 'react-loader-spinner';
import {IIngredientsStore, ICurrentIngredientStore} from '../../types/ingredientTypes';

function IngredientDetails() {
    const dispatch = useDispatch();
    const { ingredientId } = useParams(); 
    const ingredient = useSelector((store:ICurrentIngredientStore) => store.currentIngredient);
    const ingredients = useSelector((store:IIngredientsStore) => store.ingredients.allIngredients);
    const isLoading = useSelector((store:IIngredientsStore) => store.ingredients.isLoading);
    useEffect(() => {
        if (ingredientId) {
            const currIngredient = ingredients.find((ingredient) => ingredient._id === ingredientId)
            dispatch(setCurrentIngredient(currIngredient)); // Fetch the ingredient details by ID
        }
      }, [ingredientId,ingredients, dispatch]); 
    return ( 
    <div className={ingredientDetailsStyle.ingredient_details}>
          {isLoading && <Puff
            visible={true}
            height="180"
            width="180"
            color="blue"
            ariaLabel="puff-loading"
            wrapperClass="loader"
        />} 
         {!isLoading  && 
         <>
        <div className={ingredientDetailsStyle.ingredient_image}><img src={ingredient.image_large}  alt={ingredient.name} /></div>
        <h3  className={`${ingredientDetailsStyle.ingredient_image} text text_type_main-medium mb-8 mt-4`} >{ingredient.name}</h3>
        <ul className={`${ingredientDetailsStyle.ingredient_compositions} mb-15`}>
            <IngredientComposition composition = {"Калории,ккал"} value={ingredient.calories}></IngredientComposition>
            <IngredientComposition composition = {"Белки, г"} value={ingredient.proteins}></IngredientComposition>
            <IngredientComposition composition = {"Жиры, г"} value={ingredient.fat}></IngredientComposition>
            <IngredientComposition composition = {"Углеводы, г"} value={ingredient.carbohydrates}></IngredientComposition>
        </ul>
        </>
        }
    </div> 
    );
}

export default IngredientDetails;