import React from 'react'
import { Logo,BurgerIcon,ProfileIcon,ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from './AppHeader.module.css'
function AppHeader (){
    return (
      <header className={appHeaderStyles.header}>
        <nav className={appHeaderStyles.menu}>
            <ul className={appHeaderStyles.list_menu}>
                <a className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menu_item}` } ><BurgerIcon type="primary" /> <span className='pl-2 text text_type_main-default'>Конструктор </span></a>
                <a className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menu_item}` } ><ListIcon  type="secondary" /> <span  className='pl-2 text text_type_main-default text_color_inactive'>Лента заказов</span></a>
            </ul>
        </nav>
        <div className={appHeaderStyles.logo}>
                <Logo />
        </div>
        
        <div className={`${appHeaderStyles.login} `} > <a className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menu_item}` }> <ProfileIcon type="secondary"/><span  className='pl-1 text_color_inactive'>Личный кабинет </span></a></div>
      </header>
      
    )
}
export default AppHeader;