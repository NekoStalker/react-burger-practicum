import React,{useState,useEffect} from 'react';
import profileStyles from './ProfilePage.module.css';
import { EmailInput,Button,PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { useNavigate, NavLink } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {patchUser, logoutUser} from '../../services/user/userRequests'
import AppHeader from '../../components/AppHeader/AppHeader';
function ProfilePagePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userInfo);
  const [form, setForm] = useState({ email: '', password: '',login: '' });
  const {isLoading,error} = useSelector((store)=> ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }),shallowEqual);  
  const onChange = e => {
      setForm({...form,[e.target.name]: e.target.value})
  };
  useEffect(() => {
    if (userData && userData.email !== form.email) {
      setForm({
        email: userData.email || '',
        password: '',
        login: userData.name || ''
      });
    }
  }, [userData]);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser())
      .then(() => {
        setTimeout(() => {
          navigate('/login'); 
        }, 1000); 
      })
      .catch((error) => {
        console.error("Error during logout:", error); // Handle errors during logout
      });
  };
  
  const hasFormChanged = () => {
    return (
      form.email !== (userData?.email || '') ||
      form.password !== '' || 
      form.login !== (userData?.name || '')
    );
  };
  const resetForm = () => {
    setForm({
      email: userData?.email || '',
      password: '',
      login: userData?.name || '',
    });
  };
  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    dispatch(patchUser(form));
  };
  return (
    <>
    <AppHeader />
    <main className={`${profileStyles.main}`} >
        <section >
        <nav className={profileStyles.nav_section}>
          <ul className={profileStyles.list_menu}>
          <li className={profileStyles.nav_item}>
              <NavLink to="/profile" >
                {({ isActive }) => <span className={`text text_type_main-large ${isActive ? '' : 'text_color_inactive'}`}>Профиль</span>}
              </NavLink>
            </li>
            <li className={profileStyles.nav_item}>
              <NavLink to="/profile/orders" >
                {({ isActive }) => <span className={`text text_type_main-large ${isActive ? '' : 'text_color_inactive'}`}>История заказов</span>}
              </NavLink>
            </li>
            <li className={profileStyles.nav_item}>
              <NavLink to="/login" onClick={handleLogout} >
                {({ isActive }) => <span className={`text text_type_main-large ${isActive ? '' : 'text_color_inactive'}`}>Выход</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
          <div className={`${profileStyles.description_container} `}>
            <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
          </div>
        </section>
        {isLoading && <Puff
                visible={true}
                height="180"
                width="180"
                color="blue"
                ariaLabel="puff-loading"
                wrapperClass="loader"
            />} 
            {error && <p>Ошибка: {error.message}</p>} 
            {!isLoading && !error && (
        <section className={`${profileStyles.container}`}>
          <form className={`${profileStyles.form}`} onSubmit={handleSubmit}>
            <Input
              type='text'
              onChange={onChange}
              value={form.login}
              name={'login'}
              placeholder="Имя"
              icon="EditIcon"
            />
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Логин"
              icon="EditIcon"
             />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              icon="EditIcon"
            />
             {hasFormChanged() && (
            <div className={`${profileStyles.form_button}`} >
                <Button htmlType="button" type="secondary" size="medium" onClick={resetForm}>
                  Отменить
                </Button>
              	<Button htmlType="submit" type="primary" size="large">
                  Сохранить
                </Button>
            </div>
             )}
          </form >
        </section>)}
      </main>
    </>
  );
}
export default ProfilePagePage;