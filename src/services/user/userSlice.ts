import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import {registerUser,loginUser,resetPasswordUser,forgotPasswordUser,logoutUser,getUser,patchUser} from './userRequests';
import {IUserState,IRegistrationResponse,TAuthorizationResponse,IResetPasswordResponse, IRefreshTokenResponse} from '../types/userTypes'
export const initialState: IUserState = {
    userInfo: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    emailSubmitted: false,
    message: "",
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<IRegistrationResponse>) => {
                state.isLoading = false;
                state.userInfo = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка регистрации';
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<TAuthorizationResponse>) => {
                state.isLoading = false;
                state.userInfo = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка авторизации';
            })
            .addCase(forgotPasswordUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPasswordUser.fulfilled, (state, action: PayloadAction<IResetPasswordResponse>) => {
                state.isLoading = false;
                state.emailSubmitted = true;
                state.message = action.payload.message;
            })
            .addCase(forgotPasswordUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка восстановления пароля';
            })
            .addCase(resetPasswordUser.pending, (state) => {
                state.isLoading = true;
                state.emailSubmitted = false;
                state.error = null;
            })
            .addCase(resetPasswordUser.fulfilled, (state, action: PayloadAction<IResetPasswordResponse>) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPasswordUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка восстановления пароля';
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                Object.assign(state, initialState);
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка  выхода';
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<IRefreshTokenResponse>) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.userInfo = action.payload.user;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message  || 'Ошибка обновления сессии';
            })
            .addCase(patchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(patchUser.fulfilled, (state, action: PayloadAction<IRefreshTokenResponse>) => {
                state.isLoading = false;
                state.userInfo = action.payload.user;
            })
            .addCase(patchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка обновления данных';
            })
           

    }
});
export const {resetError} = userSlice.actions;

export default userSlice.reducer;