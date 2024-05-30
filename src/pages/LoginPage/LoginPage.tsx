import React,{useState, FC} from 'react';
import loginStyles from './LoginPage.module.css';
import { EmailInput,Button,PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/types/storeType';
import { IUserStore } from '../../services/types/userTypes';
import {loginUser} from '../../services/user/userRequests';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {handleResponse} from '../../utils/fetchRequest';
import AppHeader from '../../components/AppHeader/AppHeader';
const LoginPage:FC = () => {
  const [form, setValue] = useState({ email: '', password: '' });
  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  const {isLoading,error} = useSelector((store: IUserStore)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);
  const registerNav = ():void =>{
    navigate('/register');
  }
  const forgotPasswordNav = ():void =>{
    navigate('/forgot-password');
  }
  const maindNav = ():void =>{
    navigate('/');
  }
  const onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(form)).unwrap();
      if (res.success) {
        maindNav()
      }
    } catch(error) {
      console.error('Error during login:', error);
    }

  };
  return (
    <>
    <AppHeader />
    <main>
        <div className={`${loginStyles.container}`}>
          <form className={`${loginStyles.form}  mb-10`} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="E-mail"
             />
             <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
            />
            <Button htmlType="submit" type="primary" size="large">
              Войти
            </Button>
          </form >
          <div className={`${loginStyles.button_container}`}>
           {/* {error !== null &&
              <p className="text text_type_main-medium">
                {error.message}
              </p>
            } */}
            <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?<Button onClick={registerNav} htmlType="button" type="secondary" size="medium" 
            extraClass={`${loginStyles.form_ref_button}`}>Зарегистрироваться</Button></p>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?<Button onClick={forgotPasswordNav} htmlType="button" type="secondary" size="medium"
            extraClass={`${loginStyles.form_ref_button}`}>Восстановить пароль</Button></p>
          </div>
        </div>
      </main>
    </>
  );
}
export default LoginPage;