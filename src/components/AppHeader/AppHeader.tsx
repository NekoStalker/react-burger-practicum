import React, { FC } from 'react';
import { Logo,BurgerIcon,ProfileIcon,ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
const AppHeader:FC = () =>{  
    return (
      <header className={appHeaderStyles.header}>
        <nav className={appHeaderStyles.menu}>
            <ul className={appHeaderStyles.list_menu}>
              <NavLink to="/"  className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menu_item}` }>
              {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} /> 
                <span className='pl-2 text text_type_main-default'>Конструктор</span>
              </>
              )}
              </NavLink>
              <NavLink to="/profile/orders"  className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menu_item}` }>
              {({ isActive }) => (
              <>
                <ListIcon  type={isActive ? 'primary' : 'secondary'} />
                <span  className='pl-2 text text_type_main-default text_color_inactive'>Лента заказов</span>
                </>
              )}
              </NavLink>
            </ul>
        </nav>
        <div className={appHeaderStyles.logo}>
                <Logo />
        </div>
        
        <div className={`${appHeaderStyles.login} `} > 
          <NavLink to="/profile" className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menu_item}` }  > 
          {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <span  className='pl-1 text_color_inactive'>Личный кабинет </span>
          </>
          )}
          </NavLink>
        </div>
      </header>
    )
}
export default AppHeader;