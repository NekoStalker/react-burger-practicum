export interface UserInfo {
    name: string;
    email: string;
}

export interface IResponse {
    [key: string]: unknown;
}

export interface IUserState {
    userInfo: UserInfo | null; 
    isLoggedIn: boolean;
    isLoading: boolean;
    response: IResponse;
    error: string | null;
    emailSubmitted: boolean;
  }
  
export interface IUserStore {
    user: IUserState;
}
