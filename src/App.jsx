import React, { useEffect } from 'react';
import { MainPage, LoginPage, NotFound404, RegisterPage, RestorePasswordPage, ForgotPasswordPage, ProfilePagePage, IngredientPage } from './pages';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Modal from './components/Modal/Modal';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModalIngredient } from '../src/services/currentIngredient/currentIngredientSlice';
import { getAllIngredients } from '../src/services/ingredients/ingredientsRequests';
import {resetConstructor} from '../src/services/burgerConstructor/burgerConstructorSlice'
import {closeModalOrder} from '../src/services/order/orderSlice'
import {getUser} from '../src/services/user/userRequests'
import ProtectedRouteElement from './components/ProtectedRouteElement';
import ProtectedRoutePassword from './components/ProtectedRoutePassword';
function App() {
  const dispatch = useDispatch();
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

function AppContent() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const handleCloseModalIngredient = () => {
    dispatch(closeModalIngredient());
    navigate(-1);
  }
  const handleCloseModalOrder = () => {
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
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:ingredientId" element={<Modal title="Детали ингредиента" onClose={handleCloseModalIngredient}>
                                                                <IngredientDetails />
                                                            </Modal>} />
           <Route path="/order/:orderId" element={<Modal onClose={handleCloseModalOrder}>
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
