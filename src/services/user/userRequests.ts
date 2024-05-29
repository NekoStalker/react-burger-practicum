import {createAsyncThunk} from '@reduxjs/toolkit'

import {request, fetchWithRefresh} from '../../utils/fetchRequest'
import { setCookie,deleteCookie, getCookie } from '../../utils/cookie';
import {
    TRegistrationRequest,
    IRegistrationResponse,
    TAuthorizationResponse,
    TResetPasswordRequest,
    IResetPasswordResponse,
    TResetEmailRequest,
    TPatchRequest,
    TResetAuthRequest,
    TLogoutResponse,
    TLoginRequest,
    TRefreshRequest,
} from '../types/userTypes';
import { userRegister, userLogin, userLogout, userForgotPassword, userResetPassword, userGet, userPatch } from '../api';
export const registerUser = createAsyncThunk<IRegistrationResponse, TRegistrationRequest>(
    'user/register',
    async (form) => {
        const reqBody = JSON.stringify({
            "email": form.email,
            "password": form.password,
            "name": form.name
        });
        const registerOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: reqBody
        };
        const response = await fetchWithRefresh(userRegister,registerOptions);
        if (response.success) {
            const accessToken = response.accessToken.split('Bearer ')[1];
            setCookie('accessToken', accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        }
        
        return response;
    }
);


export const loginUser = createAsyncThunk<TAuthorizationResponse, TLoginRequest>(
    'user/login',
    async (form ) => {
        const reqBody = JSON.stringify({
            email: form.email,
            password: form.password
        });

        const loginOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: reqBody
        };

        const response = await fetchWithRefresh(userLogin, loginOptions);

        if (response.success) {
            setCookie('accessToken', response.accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', response.refreshToken);
        }

        return response; 
    }
);
export const logoutUser = createAsyncThunk<TLogoutResponse>(
    'user/logout',
    async () => {
            const reqBody =  {
                token: localStorage.getItem("refreshToken")
            }
            const response = await fetchWithRefresh(userLogout, {
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

export const resetPasswordUser = createAsyncThunk<IResetPasswordResponse, TResetPasswordRequest>(
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
export const forgotPasswordUser = createAsyncThunk<IResetPasswordResponse,TResetEmailRequest>(
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
export const getUser = createAsyncThunk<IRegistrationResponse>(
    'user/getUser',
    async (_)  => {
            const accessToken = getCookie('accessToken');
            
            const response = await fetchWithRefresh(userGet, {
             method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            });
     
            return response;     
    }
)
export const patchUser = createAsyncThunk<IRegistrationResponse, TPatchRequest>(
    'user/patchUser',
    async (form, thunkAPI) => {
            const accessToken = getCookie('accessToken');
            const reqBody = {
                "email": form.email,
                "password": form.password,
                "name": form.name
            };
            const response = await fetchWithRefresh(userPatch, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    
                },
                body: JSON.stringify(reqBody),
            });
            return response;
    }
);