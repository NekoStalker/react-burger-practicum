import React,{useState} from 'react';
import passwordStyles from './ForgotPassword.module.css';
import { EmailInput,Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {forgotPasswordUser} from '../../services/user/userRequests'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader';
function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '',code: '' });
  const navigate = useNavigate(); 
  const loginNav = () =>{
    navigate('/login');
  }
  const resetPassNav = () =>{
    navigate('/reset-password');
  }
  const {isLoading,error} = useSelector((store)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);
  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    await dispatch(forgotPasswordUser(form))
      .then(res => {
        if (!res.error) {
          resetPassNav(); 
        } else {
          console.error('Restore error :', res.error);
        }
      });
  };
  const onChange = e => {
      setValue({...form,[e.target.name]: e.target.value})
  };
  return (
    <>
    <AppHeader />
    <main>
        <div className={`${passwordStyles.container}`}>
          <form className={`${passwordStyles.form}  mb-10`}  onSubmit={handleSubmit}>
            <h1 className="text text_type_main-medium">Восстановление пароля</h1>
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Укажите e-mail"
            />
            <Button htmlType="submit" type="primary" size="large">
              Восстановить
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
export default ForgotPasswordPage;