
export type TUserInfo = {
    name: string;
    email: string;
};

export type TResetEmailRequest = {
    email: string;
};

export type TResetPasswordRequest = {
    password: string;
    code: string;
};

export type TResetAuthRequest = {
    email: string;
    password: string;
};

export type TRefreshRequest = {
    token: string;
};

export type TLogoutRequest = TRefreshRequest;

export type TRegistrationRequest = {
    email: string;
    password: string;
    name: string;
};

export type TLoginRequest = {
    email: string;
    password: string;
};
export type TPatchRequest = TRegistrationRequest;


export interface IResponse {
    success: boolean;
}

export interface IResetPasswordResponse extends IResponse {
    message: string;
}

export interface IRegistrationResponse extends IResponse {
    user: TUserInfo;
    accessToken: string;
    refreshToken: string;
}

export type TAuthorizationResponse = IRegistrationResponse;

export type TLogoutResponse = IResetPasswordResponse;

export interface IRefreshTokenResponse extends IResponse {
    user: TUserInfo;
}


export interface IUserState {
    userInfo: TUserInfo | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
    emailSubmitted: boolean;
    message: string;
}

export interface IUserStore {
    user: IUserState;
}
