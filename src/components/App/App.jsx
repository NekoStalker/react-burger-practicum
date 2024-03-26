import React, { useState, useEffect } from 'react';
import appStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
//import {data} from '../../utils/data'
function App() {
  //Контекст использую внутри компонента BurgerConstructor потому что передавать один пропс мне показалось странно
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const addr = "https://norma.nomoreparties.space/api/ingredients";
  useEffect(() => {
    const getIngredientsData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const res = await fetch(addr);
          if(!res.ok){
            throw new Error('Ошибка запроса ингредиентов');
          }
          const data = await res.json();
          setIngredients(data.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
    }
    getIngredientsData();
  },[]);
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        {isLoading && <p>Загрузка...</p>} 
        {error && <p>Ошибка: {error}</p>} 
        {!isLoading && !error && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients.slice(0,3)} initPrice={0} /> 
          </>
        )}
      </main>
      
    </div>
  );
}

export default App;
