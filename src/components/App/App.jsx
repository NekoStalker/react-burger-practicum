import React from 'react';
import appStyle from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import {data,burger} from '../../utils/data';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


function App() {
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={burger} initPrice={0} />
      </main>
      
    </div>
  );
}

export default App;
