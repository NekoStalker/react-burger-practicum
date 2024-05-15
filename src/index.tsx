import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import store from "./store"
import reportWebVitals from './reportWebVitals';


const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
