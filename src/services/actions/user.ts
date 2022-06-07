import ApiRoutes from "../../api/ApiRoutes";
import { ApiCall } from "../../api/ApiCall";
import { ApiToken } from "../../api/ApiToken";

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

/**
 * Register actions typing
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
 * Register thunk
 */

export const register = (data: any) => {
    return (dispatch: any) => {
        dispatch({
            type: REGISTER_REQUEST
        });
        new ApiCall(ApiRoutes.auth.register).post(data)
        .then((response) => {
            if (response.success) {
                dispatch(({ type: REGISTER_SUCCESS }));
            } else {
                dispatch(registerFailed());
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch(registerFailed());
        });
    };
};

/**
 * Login actions typing
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
 * Login thunk
 */

export const login = (data: any) => {
    return (dispatch: any) => {
        dispatch({
            type: LOGIN_REQUEST
        });
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
};

/**
 * Logout actions typing
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
 * Logout thunk
 */

export const logout = () => {
    return (dispatch: any) => {
        dispatch({
            type: LOGOUT_REQUEST
        });
        new ApiCall(ApiRoutes.auth.logout).post({ token: ApiToken.getRefreshToken() })
        .then((response) => {
            if (response.success) {
                dispatch({ type: LOGOUT_SUCCESS, isLoggedIn: false });
                ApiToken.deleteToken();
            } else {
                dispatch(logoutFailed());
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch(logoutFailed());
        });
    }
}

/**
 * ForgotPassword actions typing
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
 * ForgotPassword thunk
 */

export const forgotPassword = (data: any) => {
    return (dispatch: any) => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        new ApiCall(ApiRoutes.password_reset.forgot_password).post(data)
        .then((response) => {
            if (response.success) {
                dispatch({ type: FORGOT_PASSWORD_SUCCESS });
            }
            else {
                dispatch(forgotPasswordFailed());
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch(forgotPasswordFailed());
        });
    };
};

/**
 * ResetPassword actions typing
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
 * ResetPassword thunk
 */

export const resetPassword = (data: any) => {
    return (dispatch: any) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        new ApiCall(ApiRoutes.password_reset.reset_password).post(data)
        .then((response) => {
            if (response.success) {
                dispatch({ type: RESET_PASSWORD_SUCCESS });
            }
            else {
                dispatch(resetPasswordFailed());
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch(resetPasswordFailed());
        });
    }
};

/**
 * GetToken actions typing
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
 * GetToken thunk
 */

export const getToken = () => {
    return function(dispatch: any) {
        dispatch({
            type: TOKEN_REQUEST
        });
        new ApiCall(ApiRoutes.auth.token).post(ApiToken.getRefreshToken())
        .then((response) => {
            if (response.success) {
                const accessToken = response.accessToken.split('Bearer ')[1];
                dispatch({ type: TOKEN_SUCCESS });
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
    }
}

/**
 * GetUser actions typing
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
 * GetUser thunk
 */

export const getUser = (formData: any, setFormData: any) => {
    return function(dispatch: any) {
        dispatch({
            type: GET_USER_REQUEST
        });

        if (!ApiToken.getAccessToken()) {
            getToken();
        }

        new ApiCall(ApiRoutes.auth.user, { privateCall: true }).get()
        .then((response) => {
            if (response.success) {
                dispatch({ type: GET_USER_SUCCESS })
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
    }
}

/**
 * UpdateUser actions typing
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
 * UpdateUser thunk
 */

export const updateUser = (formData: any) => {
    return function(dispatch: any) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });

        if (!ApiToken.getAccessToken()) {
            getToken();
        }

        new ApiCall(ApiRoutes.auth.user, { privateCall: true }).patch({...formData})
        .then((response) => {
            if (response.success) {
                dispatch({ type: UPDATE_USER_SUCCESS })
            }
            else {
                dispatch(updateUserFailed());
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch(updateUserFailed());
        });
    }
}

/**
 * Action Creators
 */

export const loginSuccess = (): ILoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    isLoggedIn: true
})

const registerFailed = (): IRegisterFailedAction => ({
    type: REGISTER_FAILED
});

const loginFailed = (): ILoginFailedAction => ({
    type: LOGIN_FAILED
});

const logoutFailed = (): ILogoutFailedAction => ({
    type: LOGOUT_FAILED
});

const forgotPasswordFailed = (): IForgotPasswordFailedAction => ({
    type: FORGOT_PASSWORD_FAILED
});

const resetPasswordFailed = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED
});

const tokenFailed = (): IGetTokenFailedAction => ({
    type: TOKEN_FAILED
});

const getUserFailed = (): IGetUserFailedAction => ({
    type: GET_USER_FAILED
});

const updateUserFailed = (): IUpdateUserFailedAction => ({
    type: UPDATE_USER_FAILED
});

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