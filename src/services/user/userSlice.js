import {createSlice} from '@reduxjs/toolkit'
import {registerUser,loginUser,resetPasswordUser,forgotPasswordUser,logoutUser,getUser,patchUser} from './userRequests'
const initialState = {
    userInfo: null,
    isLoggedIn: false,
    isLoading: false,
    response: null,
    error: null,
    emailSubmitted: false, 
}
export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
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
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action);
                state.error = action.error || 'Ошибка регистрации';
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error || 'Ошибка авторизации';
            })
            .addCase(forgotPasswordUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPasswordUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.emailSubmitted = true;
                state.response = action.payload
            })
            .addCase(forgotPasswordUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error || 'Ошибка восстановления пароля';
            })
            .addCase(resetPasswordUser.pending, (state) => {
                state.isLoading = true;
                state.emailSubmitted = false;
                state.error = null;
            })
            .addCase(resetPasswordUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.response = action.payload;
            })
            .addCase(resetPasswordUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error || 'Ошибка восстановления пароля';
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
                state.error = action.error || 'Ошибка  выхода';
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.userInfo = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error || 'Ошибка обновления сессии';
            })
            .addCase(patchUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
            })
            .addCase(patchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error || 'Ошибка обновления сессии';
            })

    }
});
export const {setUser} = userSlice.actions;

export default userSlice.reducer;