import React,{useState} from 'react';
import passwordStyles from './ForgotPassword.module.css';
import { EmailInput,Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/AppHeader/AppHeader';
function ForgotPasswordPage() {
  const [form, setValue] = useState({ email: '', password: '',code: '' });
  const navigate = useNavigate(); 
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
        <div className={`${passwordStyles.container}`}>
          <form className={`${passwordStyles.form}  mb-10`}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Укажите e-mail"
            />
            <Button htmlType="button" type="primary" size="large">
              Восстановить
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
export default ForgotPasswordPage;