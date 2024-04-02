import React, { useState, useEffect } from 'react';
import appStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useSelector, useDispatch } from 'react-redux';
import {getAllIngredients} from '../../services/ingredients/ingredientsRequests'
import { data } from '../../utils/data';

function App() {
  const dispatch = useDispatch();
  const ingredients = data;
  const {isLoading,error} = useSelector((store) => ({
    isLoading: store.ingredients.isLoading,
    error: store.ingredients.error,
  }));
  useEffect(() => {
    dispatch(getAllIngredients())
  },[dispatch]);
 
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        {isLoading && <p>Загрузка...</p>} 
        {error && <p>Ошибка: {error}</p>} 
        {!isLoading && !error && (
          <>
            <BurgerIngredients />
            <BurgerConstructor /> 
          </>
        )}
      </main>
      
    </div>
  );
}

export default App;
