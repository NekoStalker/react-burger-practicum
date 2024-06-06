import React, {FC ,useEffect } from 'react';
import { MainPage, LoginPage, NotFound404, RegisterPage, RestorePasswordPage, ForgotPasswordPage, ProfilePagePage, IngredientPage, OrdersPage, OrderInfoPage } from './pages';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import OrderDetailsModal from './components/OrderDetailsModal/OrderDetailsModal';
import Modal from './components/Modal/Modal';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { closeModalIngredient } from './services/currentIngredient/currentIngredientSlice';
import { getAllIngredients } from './services/ingredients/ingredientsRequests';
import {resetConstructor} from './services/burgerConstructor/burgerConstructorSlice'
import {closeModalOrder} from './services/order/orderSlice';
import { closeModalOrderDetails } from './services/currentOrder/currentOrderSlice';
import {getUser} from './services/user/userRequests'
import ProtectedRouteElement from './components/ProtectedRouteElement';
import ProtectedRoutePassword from './components/ProtectedRoutePassword';
import { useAppDispatch  } from'./store';
import OrderInfoModal from './components/OrderInfoModal/OrderInfoModal';
import OrderDetails from './components/OrderDetails/OrderDetails';
import EditProfileForm from './components/EditProfileForm/EditProfileForm';
import OrdersList from './components/OrderList/OrdersList';
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
    dispatch(closeModalIngredient());
    navigate(-1);
  }
  const handleCloseModalOrder = ():void => {
    navigate(-1);
    dispatch(getAllIngredients());
    dispatch(resetConstructor());
    dispatch(closeModalOrder());
  }
  const handleCloseModalOrderInfo = ():void => {
    navigate(-1);
    dispatch(closeModalOrderDetails());
  }
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/ingredients" element={<IngredientPage />}>
          <Route path=":ingredientId" element={<IngredientDetails />} />
        </Route>
        <Route path="/feed" element={<OrdersPage />}>
          <Route path=":number" element={<OrderDetails />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRouteElement forGuest={true}>
              <LoginPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement forGuest={true}>
              <RegisterPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement forGuest={true}>
              <ForgotPasswordPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoutePassword>
              <RestorePasswordPage />
            </ProtectedRoutePassword>
          }
        />
        
        <Route
          path="/profile/*"
          element={
            <ProtectedRouteElement>
              <ProfilePagePage />
            </ProtectedRouteElement>
          }
        >
          <Route path="" element={<EditProfileForm />} />
          <Route path="orders/:number" element={<OrderDetails />} />
        </Route>
        <Route
          path="/info"
          element={<OrderInfoPage/>}

        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        
        <Routes>
          <Route path="/ingredients/:ingredientId" element={<Modal title="Детали ингредиента" onClose={handleCloseModalIngredient}>
                                                                <IngredientDetails />
                                                            </Modal>} />
           <Route path="/order/:orderId" element={<Modal title='' onClose={handleCloseModalOrder}>
                                                    <OrderDetailsModal />
                                                  </Modal>
            
          } />
          <Route path="/feed/:number" element={<Modal title={'#'+location.pathname.split('/').pop()} onClose={handleCloseModalOrderInfo}>
                                                    <OrderInfoModal />
                                                  </Modal> }
          />
          <Route path= "/profile/orders/:number" element={<Modal title={'#'+location.pathname.split('/').pop()} onClose={handleCloseModalOrderInfo}>
                                                    <OrderInfoModal />
                                                    </Modal> }
          />                                             
        </Routes>
      )}
    </>
  );
}

export default App;
