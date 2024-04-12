import React,{useState} from 'react';
import loginStyles from './LoginPage.module.css';
import { EmailInput,Button,PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
function LoginPage() {
  const [form, setValue] = useState({ email: '', password: '' });
  const navigate = useNavigate();  
  const registerNav = () =>{
    navigate('/register');
  }
  const forgotPasswordNav = () =>{
    navigate('/forgot-password');
  }
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  return (
    <>
    <AppHeader />
    <main>
        <div className={`${loginStyles.container}`}>
          <form className={`${loginStyles.form}  mb-10`}>
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
            <Button htmlType="button" type="primary" size="large">
              Войти
            </Button>
          </form >
          <div className={`${loginStyles.button_container}`}>
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