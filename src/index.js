import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {Provider} from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './services/ingredients/ingredientsSlice';
import burgerConstructorReducer from './services/burgerConstructor/burgerConstructorSlice';
import currentIngredientSlice from './services/currentIngredient/currentIngredientSlice';
import reportWebVitals from './reportWebVitals';
//import { rootReducer } from './services/reducers';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    currentIngredient: currentIngredientSlice,
  }, 
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
