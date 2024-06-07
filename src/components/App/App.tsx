import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  MainPage, LoginPage, NotFound404, RegisterPage, RestorePasswordPage,
  ForgotPasswordPage, ProfilePagePage, IngredientPage, OrdersPage, OrderInfoPage
} from '../../pages';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';
import Modal from '../Modal/Modal';
import { useAppDispatch } from '../../store';

import ProtectedRouteElement from '../ProtectedRouteElement';
import ProtectedRoutePassword from '../ProtectedRoutePassword';
import OrderInfoModal from '../OrderInfoModal/OrderInfoModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import { getAllIngredients } from '../../services/ingredients/ingredientsRequests';
import { resetConstructor } from '../../services/burgerConstructor/burgerConstructorSlice';
import { closeModalIngredient } from '../../services/currentIngredient/currentIngredientSlice';
import { getUser } from '../../services/user/userRequests';
import { closeModalOrder } from '../../services/order/orderSlice';
import { closeModalOrderDetails } from '../../services/currentOrder/currentOrderSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllIngredients());
    dispatch(resetConstructor());
    if (localStorage.getItem("refreshToken")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const handleCloseModalIngredient = () => {
    dispatch(closeModalIngredient());
    navigate(-1);
  }

  const handleCloseModalOrder = (): void => {
    navigate(-1);
    dispatch(getAllIngredients());
    dispatch(resetConstructor());
    dispatch(closeModalOrder());
  }

  const handleCloseModalOrderInfo = (): void => {
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
        <Route path="/info" element={<OrderInfoPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseModalIngredient}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <Modal title='' onClose={handleCloseModalOrder}>
                <OrderDetailsModal />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal title={'#' + location.pathname.split('/').pop()} onClose={handleCloseModalOrderInfo}>
                <OrderInfoModal />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal title={'#' + location.pathname.split('/').pop()} onClose={handleCloseModalOrderInfo}>
                <OrderInfoModal />
              </Modal>
            }
          />
        </Routes>
      )}
   </>
  );
}

export default App;
