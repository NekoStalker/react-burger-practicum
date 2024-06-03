import React,{FC,useState} from 'react';
import registerStyles from './RegisterPage.module.css';
import { EmailInput,PasswordInput,Button,Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import {registerUser} from '../../services/user/userRequests';
import { IUserStore } from '../../services/types/userTypes';
import {handleResponse} from "../../utils/fetchRequest";
import { useAppDispatch ,useAppSelector } from'../../store';
import AppHeader from '../../components/AppHeader/AppHeader';
const RegisterPage:FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {isLoading,error} = useAppSelector((store:IUserStore)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);
  const [form, setValue] = useState({ email: '', password: '',name: ''});
  const loginNav = ():void =>{
    navigate('/login');
  } 
  const onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try{
      const res = await dispatch(registerUser(form)).unwrap();
      if (res.success) {
        loginNav()
      }
    }
    catch(error) {
      console.error('Registration failed:', error);
    }
  };
  return (
    <>
    <AppHeader />
    <main>
        <div className={`${registerStyles.container}`}>
          <form className={`${registerStyles.form}  mb-10`} onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input
              type='text'
              onChange={onChange}
              value={form.name}
              name={'login'}
              placeholder="Имя" onPointerEnterCapture onPointerLeaveCapture              
            />
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
             Зарегистрироваться
            </Button>
          </form >
          <div className={`${registerStyles.button_container}`}>
            {/* {error !== null &&
              <p className="text text_type_main-medium">
                {error.message}
              </p>
            } */}
            <p className="text text_type_main-default text_color_inactive">Уже зарегестрированы?<Button onClick={loginNav} htmlType="button" type="secondary" size="medium" 
            extraClass={`${registerStyles.form_ref_button}`}>Войти</Button></p>
 
          </div>
        </div>
      </main>
    </>
  );
}
export default RegisterPage;