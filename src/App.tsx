import React, {FC ,useEffect } from 'react';
import { MainPage, LoginPage, NotFound404, RegisterPage, RestorePasswordPage, ForgotPasswordPage, ProfilePagePage, IngredientPage, OrderPage } from './pages';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Modal from './components/Modal/Modal';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { closeModalIngredient } from './services/currentIngredient/currentIngredientSlice';
import { getAllIngredients } from './services/ingredients/ingredientsRequests';
import {resetConstructor} from './services/burgerConstructor/burgerConstructorSlice'
import {closeModalOrder} from './services/order/orderSlice'
import {getUser} from './services/user/userRequests'
import ProtectedRouteElement from './components/ProtectedRouteElement';
import ProtectedRoutePassword from './components/ProtectedRoutePassword';
import { useAppDispatch } from './services/types/storeType';
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllIngredients());
    dispatch(resetConstructor());
    if(localStorage.getItem("refreshToken")){
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent:FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCloseModalIngredient = () => {
    dispatch(closeModalIngredient({}));
    navigate(-1);
  }
  const handleCloseModalOrder = ():void => {
    navigate(-1);
    dispatch(getAllIngredients());
    dispatch(resetConstructor());
    dispatch(closeModalOrder());
  }
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients" element={<IngredientPage />}>
          <Route path=":ingredientId" element={<IngredientDetails />} />
        </Route>
        <Route
          path="/login"
          element={<ProtectedRouteElement element={<LoginPage />} forGuest={true} path="/profile" />}
        />
        <Route
          path="/register"
          element={<ProtectedRouteElement element={<RegisterPage />} forGuest={true} path="/profile" />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRouteElement element={<ForgotPasswordPage />} forGuest={true} path="/profile" />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRoutePassword element={<RestorePasswordPage />}  />}
        /> 
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePagePage />} forGuest={false} path="/login" />}
        />
        <Route
          path="/feed"
          element={<OrderPage />} 
        />  
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:ingredientId" element={<Modal title="Детали ингредиента" onClose={handleCloseModalIngredient}>
                                                                <IngredientDetails />
                                                            </Modal>} />
           <Route path="/order/:orderId" element={<Modal title='' onClose={handleCloseModalOrder}>
                                                    <OrderDetails />
                                                  </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
