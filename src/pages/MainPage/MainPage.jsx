import React, { useState, useEffect } from 'react'
import mainPageStyle from './MainPage.module.css'
import AppHeader from '../../components/AppHeader/AppHeader';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Puff } from 'react-loader-spinner'

function MainPage() {

  const {isLoading,error} = useSelector((store) => ({
    isLoading: store.ingredients.isLoading,
    error: store.ingredients.error,
  }),shallowEqual);
 
  return (
    <div className={mainPageStyle.App}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={mainPageStyle.main}>
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

export default MainPage;
