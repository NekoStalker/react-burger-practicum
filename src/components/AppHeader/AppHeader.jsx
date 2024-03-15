import React, { Component } from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon   } from '@ya.praktikum/react-developer-burger-ui-components'
import appHeaderStyles from './AppHeader.module.css'
function AppHeader (){
    return (
      <header className={appHeaderStyles.header}>
        <nav className={appHeaderStyles.menu}>
            <ul className={appHeaderStyles.listMenu}>
                <a className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menuItem}` } ><BurgerIcon type="primary" /> <span className='pl-2 text text_type_main-default'>Конструктор </span></a>
                <a className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menuItem}` } ><ListIcon  type="secondary" /> <span  className='pl-2 text text_type_main-default text_color_inactive'>Лента заказов</span></a>
            </ul>
        </nav>
        <div className={appHeaderStyles.logo}>
                <Logo />
        </div>
        
        <div className={`${appHeaderStyles.login} `} > <a className={`ml-2 pl-5 pr-5 pt-4 pb-4 ${appHeaderStyles.menuItem}` }> <ProfileIcon type="secondary"/><span  className='pl-1 text_color_inactive'>Личный кабинет </span></a></div>
      </header>
      
    )
}
export default AppHeader;