import React, { useState, useEffect } from 'react';
import appStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import {data} from '../../utils/data'
function App() {
  const [ingredients, setIngredients] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const addr = "https://norma.nomoreparties.space/api/ingredients";
  // useEffect(() => {
  //   const getIngredientsData = async () => {
  //       setIsLoading(true);
  //       setError(null);
  //       try {
  //         const res = await fetch(addr);
  //         if(!res.ok){
  //           throw new Error('Ошибка запроса ингредиентов');
  //         }
  //         const data = await res.json();
  //         setIngredients(data.data);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //   }
  //   getIngredientsData();
  // },[]);
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} initPrice={0} />
      </main>
      
    </div>
  );
}

export default App;
