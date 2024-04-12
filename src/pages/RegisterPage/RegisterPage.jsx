import React,{useState} from 'react';
import registerStyles from './RegisterPage.module.css';
import { EmailInput,PasswordInput,Button,Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
function RegisterPage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '', password: '',login: ''});
  const loginNav = () =>{
    navigate('/login');
  } 
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  return (
    <>
    <AppHeader />
    <main>
        <div className={`${registerStyles.container}`}>
          <form className={`${registerStyles.form}  mb-10`}>
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
            <Button htmlType="button" type="primary" size="large">
             Зарегистрироваться
            </Button>
          </form >
          <div className={`${registerStyles.button_container}`}>
            <p className="text text_type_main-default text_color_inactive">Уже зарегестрированы?<Button onClick={loginNav} htmlType="button" type="secondary" size="medium" 
            extraClass={`${registerStyles.form_ref_button}`}>Войти</Button></p>
 
          </div>
        </div>
      </main>
    </>
  );
}
export default RegisterPage;