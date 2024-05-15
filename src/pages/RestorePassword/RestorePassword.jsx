import React,{useState} from 'react';
import passwordStyles from './RestorePassword.module.css';
import {Input, Button,PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import {resetPasswordUser} from '../../services/user/userRequests'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader';
function RestorePasswordPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ password: '',code: '' });
  const navigate = useNavigate();
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  const {isLoading,error} = useSelector((store)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);
  const loginNav = () =>{
    navigate('/login');
  }
  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    await dispatch(resetPasswordUser(form))
      .then(res => {
        if (!res.error) {
          loginNav();
        } else {
          console.error('Restore error :', res.error);
        }
      });
  };
  return (
    <>
    <AppHeader />
    <main >
        <div className={`${passwordStyles.container}`}>
          <form className={`${passwordStyles.form}  mb-10`} onSubmit={handleSubmit}>
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
            <Button htmlType="submit" type="primary" size="large">
              Сохранить
            </Button>
          </form >
          <div className={`${passwordStyles.button_container}`}>
            {/* {error !== null &&
              <p className="text text_type_main-medium">
                {error.message}
              </p>
            } */}
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?<Button onClick={loginNav} htmlType="button" type="secondary" size="medium" 
            extraClass={`${passwordStyles.form_ref_button}`}>Войти</Button></p>
          </div>
        </div>
      </main>
    </>
  );
}
export default RestorePasswordPage;