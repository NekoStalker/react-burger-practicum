import React, { useEffect } from "react";
import ingredientStyle from "./IngredientPage.module.css"
import AppHeader from "../../components/AppHeader/AppHeader";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import {getAllIngredients} from '../../services/ingredients/ingredientsRequests'
import { Puff } from 'react-loader-spinner';
import { TDispatch } from '../../types/storeType';
import { IIngredientsStore } from '../../types/ingredientTypes';
import {setCurrentIngredient} from '../../services/currentIngredient/currentIngredientSlice'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Outlet,useParams } from 'react-router-dom';
const IngredientPage =  () => {
    const params = useParams();
    const dispatch:TDispatch = useDispatch();
    const { isLoading, error } = useSelector((store:IIngredientsStore) => ({
        isLoading: store.ingredients.isLoading,
        error: store.ingredients.error,
    }), shallowEqual);
    const ingredients = useSelector((store:IIngredientsStore) => store.ingredients.allIngredients);
    const ingredient = ingredients.find(ingredient => ingredient._id === params.ingredientId);

    useEffect(() => {
        if (!ingredient) {
            dispatch(getAllIngredients())
        } else {
            dispatch(setCurrentIngredient(ingredient));
        }
    }, [dispatch, ingredient, params.ingredientId]);

    if (!ingredient && !isLoading && !error) {
        return <p>Ингредиент не найден</p>;
    }
    return(
        <>
            <AppHeader />
            <main className={`${ingredientStyle.main}`}>
            {isLoading && <Puff
                visible={true}
                height="180"
                width="180"
                color="blue"
                ariaLabel="puff-loading"
                wrapperClass="loader"
            />} 
            {error && <p>Ошибка: {error}</p>} 
            {!isLoading && !error && (
            <div className={`${ingredientStyle.ingredient_container}`}>
                <Outlet />
            </div>
                
            )}  
            </main>
        </>
    );
}
export default IngredientPage