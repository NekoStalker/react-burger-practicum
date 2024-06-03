import React,{useState,useEffect, FC} from 'react';
import profileFormStyles from './EditProfileForm.module.css';
import { EmailInput,Button,PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { IUserStore } from '../../services/types/userTypes';
import { useAppDispatch , useAppSelector} from '../../store';
import {  shallowEqual } from 'react-redux';
import {patchUser, logoutUser} from '../../services/user/userRequests'

const EditProfileForm:FC = () => {

    const dispatch = useAppDispatch();
    const {isLoading,error,userData} = useAppSelector((store:IUserStore)=> ({
        isLoading: store.user.isLoading,
        error: store.user.error,
        userData: store.user.userInfo
      }),shallowEqual);  
    const [form, setForm] = useState({ email: '', password: '',name: '' });

    const onChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setForm({...form,[e.target.name]: e.target.value})
    };
    useEffect(() => {
      if (userData && userData.email !== form.email) {
        setForm({
          email: userData.email || '',
          password: '',
          name: userData.name || ''
        });
      }
    }, [userData]);

    const hasFormChanged = ():boolean => {
      return (
        form.email !== (userData?.email || '') ||
        form.password !== '' || 
        form.name !== (userData?.name || '')
      );
    };
    const resetForm = ():void => {
      setForm({
        email: userData?.email || '',
        password: '',
        name: userData?.name || '',
      });
    };
    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); 
      dispatch(patchUser(form) );
    };
    return ( 
        <section className={`${profileFormStyles.container}`}>
          <form className={`${profileFormStyles.form}`} onSubmit={handleSubmit}>
            <Input
              type='text'
              onChange={onChange}
              value={form.name}
              name={'name'}
              placeholder="Имя"
              icon="EditIcon" onPointerEnterCapture onPointerLeaveCapture  />
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Логин"
             />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              icon="EditIcon"
            />
             {hasFormChanged() && (
            <div className={`${profileFormStyles.form_button}`} >
                <Button htmlType="button" type="secondary" size="medium" onClick={resetForm}>
                  Отменить
                </Button>
              	<Button htmlType="submit" type="primary" size="large">
                  Сохранить
                </Button>
            </div>
             )}
          </form >
        </section>
     );
}

export default EditProfileForm;