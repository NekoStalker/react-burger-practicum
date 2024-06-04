export const BASE_URL:string = "https://norma.nomoreparties.space/api";
export const userRegister:string  = `${BASE_URL}/auth/register`;
export const userLogin:string  = `${BASE_URL}/auth/login`;
export const userLogout:string  = `${BASE_URL}/auth/logout`;
export const userToken:string  = `${BASE_URL}/auth/token`;
export const userForgotPassword:string  = `${BASE_URL}/password-reset`;
export const userResetPassword:string = `${BASE_URL}/password-reset/reset`;
export const userGet:string  = `${BASE_URL}/auth/user`;
export const userPatch:string  = `${BASE_URL}/auth/user`;
export const ordersWebSocket:string =  "wss://norma.nomoreparties.space/orders/all";