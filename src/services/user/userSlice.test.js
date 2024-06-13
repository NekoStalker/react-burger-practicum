import configureMockStore from 'redux-mock-store'
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
    initialState,
    registerUser,
    loginUser,
    forgotPasswordUser,
    resetPasswordUser,
    logoutUser,
    getUser,
    patchUser
  } from './userSlice';
  import {
    userRegister,
    userLogin,
    userLogout,
    userForgotPassword,
    userResetPassword,
    userGet,
    userPatch,
    resetError
  } from '../api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('Редьюсеры userSlice', () => {
    it('должен вернуть начальное состояние', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('должен обработать экшен resetError', () => {
      const modifiedState = {
        ...initialState,
        error: 'Some error'
      };

      expect(reducer(modifiedState, resetError())).toEqual(initialState);
    });
});
describe('Асинхронные экшены userSlice', () => {
    afterEach(() => {
      fetchMock.restore();
    });
  
    it('создает registerUser.fulfilled при успешной регистрации', async () => {
      const store = mockStore(initialState);
      const payload = { user };
  
      fetchMock.postOnce(userRegister, {
        body: payload,
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(registerUser({ email: user.email, password: 'password', name: user.name }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: registerUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: registerUser.fulfilled.type,
        payload: payload,
      }));
    });
  
    it('создает registerUser.rejected при неудачной регистрации', async () => {
      const store = mockStore(initialState);
      const error = 'Ошибка регистрации';
  
      fetchMock.postOnce(userRegister, {
        throws: new Error(error),
      });
  
      await store.dispatch(registerUser({ email: user.email, password: 'password', name: user.name }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: registerUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: registerUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  
    it('создает loginUser.fulfilled при успешном логине', async () => {
      const store = mockStore(initialState);
      const payload = { user };
  
      fetchMock.postOnce(userLogin, {
        body: payload,
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(loginUser({ email: user.email, password: 'password' }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: loginUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: loginUser.fulfilled.type,
        payload: payload,
      }));
    });
  
    it('создает loginUser.rejected при неудачном логине', async () => {
      const store = mockStore(initialState);
      const error = 'Login failed';
  
      fetchMock.postOnce(userLogin, {
        throws: new Error(error),
      });
  
      await store.dispatch(loginUser({ email: user.email, password: 'password' }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: loginUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: loginUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  
    it('создает forgotPasswordUser.fulfilled при успешной отправке email для восстановления пароля', async () => {
      const store = mockStore(initialState);
      const payload = { message: 'Password reset email sent' };
  
      fetchMock.postOnce(userForgotPassword, {
        body: payload,
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(forgotPasswordUser({ email: user.email }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: forgotPasswordUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: forgotPasswordUser.fulfilled.type,
        payload: payload,
      }));
    });
  
    it('создает forgotPasswordUser.rejected при неудачной отправке email для восстановления пароля', async () => {
      const store = mockStore(initialState);
      const error = 'Failed to send password reset email';
  
      fetchMock.postOnce(userForgotPassword, {
        throws: new Error(error),
      });
  
      await store.dispatch(forgotPasswordUser({ email: user.email }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: forgotPasswordUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: forgotPasswordUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  
    it('создает resetPasswordUser.fulfilled при успешном восстановлении пароля', async () => {
      const store = mockStore(initialState);
      const payload = { message: 'Password reset successful' };
  
      fetchMock.postOnce(userResetPassword, {
        body: payload,
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(resetPasswordUser({ password: 'newpassword', token: 'resetToken' }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: resetPasswordUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: resetPasswordUser.fulfilled.type,
        payload: payload,
      }));
    });
  
    it('создает resetPasswordUser.rejected при неудачном восстановлении пароля', async () => {
      const store = mockStore(initialState);
      const error = 'Failed to reset password';
  
      fetchMock.postOnce(userResetPassword, {
        throws: new Error(error),
      });
  
      await store.dispatch(resetPasswordUser({ password: 'newpassword', token: 'resetToken' }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: resetPasswordUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: resetPasswordUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  
    it('создает logoutUser.fulfilled при успешном логауте', async () => {
      const store = mockStore(initialState);
  
      fetchMock.postOnce(userLogout, {
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(logoutUser());
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: logoutUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: logoutUser.fulfilled.type,
      }));
    });
  
    it('создает logoutUser.rejected при неудачном логауте', async () => {
      const store = mockStore(initialState);
      const error = 'Logout failed';
  
      fetchMock.postOnce(userLogout, {
        throws: new Error(error),
      });
  
      await store.dispatch(logoutUser());
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: logoutUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: logoutUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  
    it('создает getUser.fulfilled при успешной проверке авторизации', async () => {
      const store = mockStore(initialState);
      const payload = { user };
  
      fetchMock.getOnce(userGet, {
        body: payload,
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(getUser());
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: getUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: getUser.fulfilled.type,
        payload: payload,
      }));
    });
  
    it('создает getUser.rejected при неудачной проверке авторизации', async () => {
      const store = mockStore(initialState);
      const error = 'Authorization check failed';
  
      fetchMock.getOnce(userGet, {
        throws: new Error(error),
      });
  
      await store.dispatch(getUser());
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: getUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: getUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  
    it('создает patchUser.fulfilled при успешном обновлении пользователя', async () => {
      const store = mockStore(initialState);
      const payload = { user };
  
      fetchMock.patchOnce(userPatch, {
        body: payload,
        headers: { 'content-type': 'application/json' }
      });
  
      await store.dispatch(patchUser({ email: user.email, name: user.name }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: patchUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: patchUser.fulfilled.type,
        payload: payload,
      }));
    });
  
    it('создает patchUser.rejected при неудачном обновлении пользователя', async () => {
      const store = mockStore(initialState);
      const error = 'Update failed';
  
      fetchMock.patchOnce(userPatch, {
        throws: new Error(error),
      });
  
      await store.dispatch(patchUser({ email: user.email, name: user.name }));
  
      const actions = store.getActions();
      expect(actions[0]).toEqual(expect.objectContaining({
        type: patchUser.pending.type,
      }));
      expect(actions[1]).toEqual(expect.objectContaining({
        type: patchUser.rejected.type,
        error: expect.objectContaining({
          message: error,
        }),
      }));
    });
  });