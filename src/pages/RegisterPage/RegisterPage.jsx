import React,{useState} from 'react';
import registerStyles from './RegisterPage.module.css';
import { EmailInput,PasswordInput,Button,Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {registerUser} from '../../services/user/userRequests'
import AppHeader from '../../components/AppHeader/AppHeader';
function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading,error} = useSelector((store)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);
  const [form, setValue] = useState({ email: '', password: '',login: ''});
  const loginNav = () =>{
    navigate('/login');
  } 
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    await dispatch(registerUser(form))
      .then(res => {
        if (!res.error) {
          loginNav(); 
        } else {
          console.error('Registration failed:', res.error);
        }
      });
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
              value={form.login}
              name={'login'}
              placeholder="Имя"
              
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
            {error !== null &&
              <p className="text text_type_main-medium">
                {error.message}
              </p>
            }
            <p className="text text_type_main-default text_color_inactive">Уже зарегестрированы?<Button onClick={loginNav} htmlType="button" type="secondary" size="medium" 
            extraClass={`${registerStyles.form_ref_button}`}>Войти</Button></p>
 
          </div>
        </div>
      </main>
    </>
  );
}
export default RegisterPage;