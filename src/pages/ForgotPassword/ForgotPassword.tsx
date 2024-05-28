import React,{useState, FC} from 'react';
import passwordStyles from './ForgotPassword.module.css';
import { EmailInput,Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {forgotPasswordUser} from '../../services/user/userRequests'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { TDispatch } from '../../services/types/storeType';
import { IUserStore } from '../../services/types/userTypes';
import {handleResponse} from "../../utils/fetchRequest"
import AppHeader from '../../components/AppHeader/AppHeader';
type TOnChange = (e:React.ChangeEvent<HTMLInputElement>)=>void;
const ForgotPasswordPage:FC = () => {
  const dispatch = useDispatch() as TDispatch;
  const [form, setValue] = useState({ email: '', password: '',code: '' });
  const navigate = useNavigate(); 
  const loginNav = ():void =>{
    navigate('/login');
  }
  const resetPassNav = ():void =>{
    navigate('/reset-password');
  }
  const {isLoading,error} = useSelector((store:IUserStore)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);
  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>):Promise<any> => {
    e.preventDefault();
    // @ts-ignore 
    const res: Response = await dispatch(forgotPasswordUser(form));
    handleResponse(res,resetPassNav, "Restore error ");
  };
  const onChange:TOnChange  = (e):void => {
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