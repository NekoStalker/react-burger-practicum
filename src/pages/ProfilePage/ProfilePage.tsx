import React,{useState,useEffect, FC} from 'react';
import profileStyles from './ProfilePage.module.css';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import { useNavigate, NavLink,Routes, Route }  from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { IUserStore } from '../../services/types/userTypes';
import { useAppDispatch ,useAppSelector } from'../../store';
import { shallowEqual } from 'react-redux';
import {patchUser, logoutUser} from '../../services/user/userRequests'
import AppHeader from '../../components/AppHeader/AppHeader';
import OrdersList from '../../components/OrderList/OrdersList';
const  ProfilePagePage:FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {isLoading,error} = useAppSelector((store:IUserStore)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,

  }),shallowEqual);  

  const loginNav = ():void =>{
    navigate('/login');
  } 
  const handleLogout = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    try{
      const res = await dispatch(logoutUser()).unwrap();
      if (res.success) {
        loginNav()
      }
    }
    catch(error) {
      console.error('Error during logout:', error);
    }
  }
  
  return (
    <>
    <AppHeader />
    <main className={`${profileStyles.main}`} >
      {isLoading && <Puff
                visible={true}
                height="180"
                width="180"
                color="blue"
                ariaLabel="puff-loading"
                wrapperClass="loader"
            />} 
        <section >
        <nav className={profileStyles.nav_section}>
          <ul className={profileStyles.list_menu}>
          <li className={profileStyles.nav_item}>
              <NavLink to="/profile" end >
                {({ isActive }) => <span className={`text text_type_main-large ${isActive ? '' : 'text_color_inactive'}`}>Профиль</span>}
              </NavLink>
            </li>
            <li className={profileStyles.nav_item}>
              <NavLink to="/profile/orders" >
                {({ isActive }) => <span className={`text text_type_main-large ${isActive ? '' : 'text_color_inactive'}`}>История заказов</span>}
              </NavLink>
            </li>
            <li className={profileStyles.nav_item}>
              <NavLink to="/login" onClick={handleLogout} >
                {({ isActive }) => <span className={`text text_type_main-large ${isActive ? '' : 'text_color_inactive'}`}>Выход</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
          <div className={`${profileStyles.description_container} `}>
            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
          </div>
        </section>
        <Routes>
          <Route path='/' element={<EditProfileForm/>} />
          <Route path='/orders' element={<OrdersList size="large" />} />
        </Routes>
        
       {/* )} */}
      </main>
    </>
  );
}
export default ProfilePagePage;