import React, { useState, useEffect } from 'react'
import appStyle from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Puff } from 'react-loader-spinner'
import {getAllIngredients} from '../../services/ingredients/ingredientsRequests'

function App() {
  const dispatch = useDispatch();
  const {isLoading,error} = useSelector((store) => ({
    isLoading: store.ingredients.isLoading,
    error: store.ingredients.error,
  }),shallowEqual);
  useEffect(() => {
    dispatch(getAllIngredients())
  },[dispatch]);
 
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={appStyle.main}>
        {isLoading && <Puff
            visible={true}
            height="180"
            width="180"
            color="blue"
            ariaLabel="puff-loading"
            wrapperClass={appStyle.loader}
        />} 
        {error && <p>Ошибка: {error}</p>} 
        {!isLoading && !error && (
          <>
            <BurgerIngredients />
            <BurgerConstructor /> 
          </>
        )}
      </main>
      </DndProvider>
    </div>
  );
}

export default App;
