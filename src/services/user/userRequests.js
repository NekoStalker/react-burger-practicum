import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request} from '../../utils/fetchRequest'
import { setCookie,deleteCookie, getCookie } from '../../utils/cookie';

import { userRegister, userLogin, userLogout, userToken, userForgotPassword, userResetPassword, userGet, userPatch } from '../api';
export const registerUser = createAsyncThunk(
    'user/register',
    async (form) => {
        const reqBody = JSON.stringify({
            "email": form.email,
            "password": form.password,
            "name": form.login
        });
        const registerOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: reqBody
        };
        const response = await request(userRegister,registerOptions);
        if (response.ok) {
            const accessToken = response.accessToken.split('Bearer ')[1];
            setCookie('accessToken', accessToken, { path: '/' , expires: 20 * 60 });
            localStorage.setItem('refreshToken', response.refreshToken);
            return response.user;
        }
        if (response.message === "jwt malformed") {
            const newAccessToken = await refreshToken(); 
            if (newAccessToken) {
                const retryResponse = await fetch(userLogin, registerOptions);
                const retryData = await retryResponse.json();
                if (retryResponse.ok) {
                    setCookie('accessToken', retryData.accessToken.split('Bearer ')[1], { path: '/', expires: 20 * 60 });
                    localStorage.setItem('refreshToken', retryData.refreshToken);
                    return retryData.user; 
                }
            }
        }
        
        return response;
    }
);


export const loginUser = createAsyncThunk(
    'user/login',
    async (form ,  { dispatch }) => {
        const reqBody = JSON.stringify({
            email: form.email,
            password: form.password
        });

        const loginOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: reqBody
        };

        const response = await fetch(userLogin, loginOptions);
        const data = await response.json();

        if (response.ok) {
            setCookie('accessToken', data.accessToken.split('Bearer ')[1], { path: '/', expires: 20 * 60 });
            localStorage.setItem('refreshToken', data.refreshToken);
            return data.user; 
        }
        if (data.message === "jwt malformed") {
            const newAccessToken = await dispatch(refreshToken()).unwrap();
            if (newAccessToken) {
                response = await fetch(userLogin, loginOptions);
                data = await response.json();
                if (response.ok) {
                    setCookie('accessToken', data.accessToken.split('Bearer ')[1], { path: '/', expires: 20 * 60 });
                    localStorage.setItem('refreshToken', data.refreshToken);
                    return data.user;
                }
            }
        }

        return response; 
    }
);
export const logoutUser = createAsyncThunk(
    'user/logout',
    async () => {
            const reqBody =  {
                token: localStorage.getItem("refreshToken")
            }
            const response = await request(userLogout, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            })
            if(response.success){
                deleteCookie('accessToken')
                localStorage.removeItem('refreshToken')
            }
            
            return response;
            
            
    }
);
export const refreshToken = createAsyncThunk(
    'user/refresh',
    async () => {
        const reqBody =  {
            "token": getCookie('refreshToken')
         }
         const response = await request(userToken, {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        })
        if(response.success){
            setCookie('accessToken', response.accessToken.split('Bearer ')[1], { path: '/', expires: 20 * 60 });
            localStorage.setItem('refreshToken', response.refreshToken);
            return response.accessToken;
        }
        return response;
  }
);
export const resetPasswordUser = createAsyncThunk(
    'user/resetPassword',
    async (form) => {
            const reqBody =  {
                "password": form.password,
                "token": form.code
            }
            const response = await request(userResetPassword, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            return response;
    }
);
export const forgotPasswordUser = createAsyncThunk(
    'user/forgotPassword',
    async (form) => {
            const reqBody =  {
                "email": form.email
            }
            const response = await request(userForgotPassword, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            return response;
    }
);
export const getUser = createAsyncThunk(
    'user/getUser',
    async (_, thunkAPI)  => {
            const accessToken = getCookie('accessToken');
            
            const response = await request(userGet, {
             method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            });
            if(response.success){
                return response.user;
            }
            else if (response.message === "jwt malformed") {
                const newAccessToken = await thunkAPI.dispatch(refreshToken());
                console.log(newAccessToken);
                if (newAccessToken) {
                    response = await request(userLogin, {
                        method: 'GET',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': `${newAccessToken}`,
                       },
                       });
                    if (response.success) {
                        return response.user;
                    }
                }
            }
            return response;     
    }
)
export const patchUser = createAsyncThunk(
    'user/patchUser',
    async (form, thunkAPI) => {
            const accessToken = getCookie('accessToken');
            const reqBody = {
                "email": form.email,
                "password": form.password,
                "name": form.login
            };
            const response = await request(userPatch, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    
                },
                body: JSON.stringify(reqBody),
            });
            if(response.success){
                return response.user;
            }
            else if (response.message === "jwt malformed") {
                const newAccessToken = await thunkAPI.dispatch(refreshToken()).unwrap();
                if (newAccessToken) {
                    response = await fetch(userLogin, {
                        method: 'PATCH',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': `Bearer ${newAccessToken}`,
                         },
                       });
                    if (response.success) {
                        return response.user;
                    }
                }
            }
        
            return response;
    }
);