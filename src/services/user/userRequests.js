import {createAsyncThunk} from '@reduxjs/toolkit'
import {BASE_URL} from '../api';
import {request} from '../../utils/fetchRequest'
import { setCookie,deleteCookie, getCookie } from '../../utils/cookie';

import { userRegister, userLogin, userLogout, userToken, userForgotPassword, userResetPassword, userGet, userPatch } from '../api';
export const registerUser = createAsyncThunk(
    'user/register',
    async (form) => {
        const reqBody = {
            "email": form.email,
            "password": form.password,
            "name": form.login
        };
        const response = await request(userRegister,{
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        if (response.accessToken) {
            const accessToken = response.accessToken.split('Bearer ')[1];
            setCookie('accessToken', accessToken, { path: '/' , expires: 20 * 60 });
            localStorage.setItem('refreshToken', response.refreshToken);
            return response.user;
        }
        else {
            return response;
        }
    }
);


export const loginUser = createAsyncThunk(
    'user/login',
    async (form) => {
            const reqBody =  {
                "email": form.email, 
                "password": form.password
            }
            const response = await request(userLogin, {
                method: 'POST',
                headers:  {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody),
            });
            if (response.accessToken) {
                const accessToken = response.accessToken.split('Bearer ')[1];
                setCookie('accessToken', accessToken, { path: '/' , expires: 20 * 60 });
                localStorage.setItem('refreshToken', response.refreshToken);
                return response.user;
            }
            else {
                return response;
            }
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
            else{
                return response;
            }
            
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
    async () => {
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
            else{
                return response;
            }
            
    }
);
export const patchUser = createAsyncThunk(
    'user/patchUser',
    async (form) => {
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
            else{
                return response;
            }
    }
);