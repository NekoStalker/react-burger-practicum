import React,{useState} from 'react';
import passwordStyles from './RestorePassword.module.css';
import {Input, Button,PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
function RestorePasswordPage() {
  const [form, setValue] = useState({ password: '',code: '' });
  const navigate = useNavigate();
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  const loginNav = () =>{
    navigate('/login');
  }
  return (
    <>
    <AppHeader />
    <main >
        <div className={`${passwordStyles.container}`}>
          <form className={`${passwordStyles.form}  mb-10`}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
             <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                placeholder="Введите новый пароль"
            />
            <Input
              type='text'
              onChange={onChange}
              value={form.code}
              name={'code'}
              placeholder="Введите код из письма"
              
            />
            <Button htmlType="button" type="primary" size="large">
              Сохранить
            </Button>
          </form >
          <div className={`${passwordStyles.button_container}`}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?<Button onClick={loginNav} htmlType="button" type="secondary" size="medium" 
            extraClass={`${passwordStyles.form_ref_button}`}>Войти</Button></p>
          </div>
        </div>
      </main>
    </>
  );
}
export default RestorePasswordPage;