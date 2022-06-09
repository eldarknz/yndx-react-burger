import { AppDispatch, AppThunk } from '../types';
import { ApiCall } from "../../api/ApiCall";
import { ApiToken } from "../../api/ApiToken";
import ApiRoutes from "../../api/ApiRoutes";

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
  
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
  
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
  
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
  
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
  
    TOKEN_REQUEST,
    TOKEN_SUCCESS,
    TOKEN_FAILED,
  
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
  
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_CLEAR
} from "../constants/user";
import { TUser } from '../../../declarations';

/**
 * Register action typing
 */
export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

/**
 * Register action creator
 */
export const registerRequest = (): IRegisterRequestAction => ({ type: REGISTER_REQUEST });
export const registerSuccess = (): IRegisterSuccessAction => ({ type: REGISTER_SUCCESS });
export const registerFailed = (): IRegisterFailedAction => ({ type: REGISTER_FAILED });

/**
 * Register thunk
 */

export const register: AppThunk = (data: {name: string, email: string, password: string}) => (dispatch: AppDispatch) => {
    dispatch(registerRequest());
    new ApiCall(ApiRoutes.auth.register).post(data)
    .then((response) => {
        dispatch(response.success ? registerSuccess(): registerFailed());
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(registerFailed());
    });
};

/**
 * Login action typing
 */
export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly isLoggedIn: boolean;
}
export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

/**
 * Login action creator
 */
export const loginRequest = (): ILoginRequestAction => ({ type: LOGIN_REQUEST });
export const loginSuccess = (): ILoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    isLoggedIn: true
});
export const loginFailed = (): ILoginFailedAction => ({ type: LOGIN_FAILED });

/**
 * Login thunk
 */
export const login: AppThunk = (data: {email: string, password: string}) => (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    new ApiCall(ApiRoutes.auth.login).post(data)
    .then((response) => {
        if (response.success) {
            const accessToken = response.accessToken.split('Bearer ')[1];
            ApiToken.setTokens(accessToken, response.refreshToken);
            dispatch(loginSuccess());
        } else {
            dispatch(loginFailed());
        }
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(loginFailed());
    });
};

/**
 * Logout action typing
 */
export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly isLoggedIn: boolean;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

/**
 * Logout action creator
 */
export const logoutRequest = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
export const logoutSuccess = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS, isLoggedIn: false });
export const logoutFailed = (): ILogoutFailedAction => ({ type: LOGOUT_FAILED });

/**
 * Logout thunk
 */
export const logout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(logoutRequest());
    new ApiCall(ApiRoutes.auth.logout).post({ token: ApiToken.getRefreshToken() })
    .then((response) => {
        if (response.success) {
            dispatch(logoutSuccess());
            ApiToken.deleteToken();
        } else {
            dispatch(logoutFailed());
        }
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(logoutFailed());
    });
};

/**
 * ForgotPassword action typing
 */
export interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

/**
 * ForgotPassword action creator
 */
export const forgotPasswordRequest = (): IForgotPasswordRequestAction => ({ type: FORGOT_PASSWORD_REQUEST });
export const forgotPasswordSuccess = (): IForgotPasswordSuccessAction => ({ type: FORGOT_PASSWORD_SUCCESS });
export const forgotPasswordFailed = (): IForgotPasswordFailedAction => ({ type: FORGOT_PASSWORD_FAILED });

/**
 * ForgotPassword thunk
 */
export const forgotPassword: AppThunk = (data: {email: string}) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequest());
    new ApiCall(ApiRoutes.password_reset.forgot_password).post(data)
    .then((response) => {
        dispatch(response.success ? forgotPasswordSuccess(): forgotPasswordFailed());
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(forgotPasswordFailed());
    });
};

/**
 * ResetPassword action typing
 */
export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

/**
 * ResetPassword action creator
 */
export const resetPasswordRequest = (): IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });
export const resetPasswordSuccess = (): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });
export const resetPasswordFailed = (): IResetPasswordFailedAction => ({ type: RESET_PASSWORD_FAILED });

/**
 * ResetPassword thunk
 */
export const resetPassword: AppThunk = (data: {password: string, token: string}) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());
    new ApiCall(ApiRoutes.password_reset.reset_password).post(data)
    .then((response) => {
        dispatch(response.success ? resetPasswordSuccess(): resetPasswordFailed());
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(resetPasswordFailed());
    });
};

/**
 * GetToken action typing
 */
export interface IGetTokenRequestAction {
    readonly type: typeof TOKEN_REQUEST;
}
export interface IGetTokenSuccessAction {
    readonly type: typeof TOKEN_SUCCESS;
}
export interface IGetTokenFailedAction {
    readonly type: typeof TOKEN_FAILED;
}

/**
 * GetToken action creator
 */
export const tokenRequest = (): IGetTokenRequestAction => ({ type: TOKEN_REQUEST });
export const tokenSuccess = (): IGetTokenSuccessAction => ({ type: TOKEN_SUCCESS })
export const tokenFailed = (): IGetTokenFailedAction => ({ type: TOKEN_FAILED });

/**
 * GetToken thunk
 */
export const getToken: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(tokenRequest());
    new ApiCall(ApiRoutes.auth.token).post(ApiToken.getRefreshToken())
    .then((response) => {
        if (response.success) {
            const accessToken = response.accessToken.split('Bearer ')[1];
            dispatch(tokenSuccess());
            ApiToken.setTokens(accessToken, response.refreshToken);
        }
        else {
            dispatch(tokenFailed());
        }
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(tokenFailed());
    });
};

/**
 * GetUser action typing
 */
export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
}
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

/**
 * GetUser action creator
 */
export const getUserRequest = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST });
export const getUserSuccess = (): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS });
export const getUserFailed = (): IGetUserFailedAction => ({ type: GET_USER_FAILED });

/**
 * GetUser thunk
 */
export const getUser: AppThunk = (formData: TUser, setFormData: Function) => (dispatch: AppDispatch) => {
    dispatch(getUserRequest());
    if (!ApiToken.getAccessToken())
        getToken();
    new ApiCall(ApiRoutes.auth.user, { privateCall: true }).get()
    .then((response) => {
        if (response.success) {
            dispatch(getUserSuccess());
            setFormData({...formData, ...response.user});
        }
        else {
            dispatch(getUserFailed());
        }
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(getUserFailed());
    });
};

/**
 * UpdateUser action typing
 */
export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
}
export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}
export interface IUpdateUserClearAction {
    readonly type: typeof UPDATE_USER_CLEAR;
}

/**
 * UpdateUser action creator
 */
export const updateUserRequest = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccess = (): IUpdateUserSuccessAction => ({ type: UPDATE_USER_SUCCESS });
export const updateUserFailed = (): IUpdateUserFailedAction => ({ type: UPDATE_USER_FAILED });
export const updateUserClear = (): IUpdateUserClearAction => ({ type: UPDATE_USER_CLEAR });

/**
 * UpdateUser thunk
 */
export const updateUser: AppThunk = (formData: TUser) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequest());
    if (!ApiToken.getAccessToken())
        getToken();
    new ApiCall(ApiRoutes.auth.user, { privateCall: true }).patch({...formData})
    .then((response) => {
        dispatch(response.success ? updateUserSuccess(): updateUserFailed());
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch(updateUserFailed());
    });
};

/**
 * Union type
 */
export type TUserActions =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction
    | IForgotPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | IGetTokenRequestAction
    | IGetTokenSuccessAction
    | IGetTokenFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction
    | IUpdateUserClearAction;