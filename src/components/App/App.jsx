import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import {data} from '../../utils/data';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerIngredientsGroup from '../BurgerIngredientsGroup/BurgerIngredientsGroup';
import BurgerIngridient from '../BurgerIngridient/BurgerIngridient';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients data={data} />
      </main>
      
    </div>
  );
}

export default App;
