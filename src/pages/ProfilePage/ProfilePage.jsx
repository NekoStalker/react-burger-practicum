import React,{useState} from 'react';
import profileStyles from './ProfilePage.module.css';
import { EmailInput,Button,PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
function ProfilePagePage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '', password: '',login: '' });
    
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  return (
    <>
    <AppHeader />
    <main className={`${profileStyles.App}`} >
        <section >
          <nav className={`${profileStyles.nav_section}`}>
            <ul className={profileStyles.list_menu}>
                <a className={profileStyles.nav_item}><span className=' text text_type_main-large '>Профиль</span></a>
                <a className={profileStyles.nav_item}> <span  className='text text_type_main-large text_color_inactive '>История заказов</span></a>
                <a className={profileStyles.nav_item}><span  className='text text_type_main-large text_color_inactive '>Выход</span></a>
            </ul>
          </nav>
          <div className={`${profileStyles.description_container} `}>
            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
          </div>
        </section>
        <section className={`${profileStyles.container}`}>
          <form className={`${profileStyles.form}`}>
            <Input
              type='text'
              onChange={onChange}
              value={form.login}
              name={'login'}
              placeholder="Имя"
              icon="EditIcon"
            />
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Логин"
              icon="EditIcon"
             />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              icon="EditIcon"
            />
          </form >
        </section>
      </main>
    </>
  );
}
export default ProfilePagePage;