import React, {FC, useCallback, useState } from 'react';
import { EmailInput,Button,PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
interface LoginState {
  email: string;
  password: string;
}
const LoginComponent: FC =  () => {
    const [form, setValue] = useState<LoginState>({ email: '', password: '' });
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement> ):void => {
        setValue({...form,[e.target.name]: e.target.value})
    };
    return (    
    <div className={styles.wrapper}>
        <div className={`${styles.container}`}>
          <form className={`${styles.form}  mb-10`}>
            <h1 className={styles.heading}>Вход</h1>
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Логин"
              isIcon={true}
              extraClass="mb-2"
             />
             <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                extraClass="mb-2"
            />
            <Button htmlType="button" type="primary" size="large">
              Вход
            </Button>
          </form >
          <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?<Button htmlType="button" type="secondary" size="medium">Зарегистрироваться</Button></p>
          <p className="text text_type_main-default text_color_inactive">Забыли пароль?<Button htmlType="button" type="secondary" size="medium">Восстановить пароль</Button></p>
        </div>
      </div>
      );
}

export default LoginComponent;