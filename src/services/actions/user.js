import ApiRoutes from "../../api/ApiRoutes";
import { ApiCall } from "../../api/ApiCall";
import { ApiToken } from "../../api/ApiToken";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_FAILED = 'TOKEN_FAILED';
export const TOKEN_REQUEST = 'TOKEN_REQUEST';

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';

export const register = (data) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST
        });
        new ApiCall(ApiRoutes.auth.register).post(data)
        .then((response) => {
            if (response.success) {
                dispatch(({ type: REGISTER_SUCCESS, isAuth: true}));
                ApiToken.setTokens(response.accessToken, response.refreshToken);
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

export const login = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        new ApiCall(ApiRoutes.auth.login).post(data)
        .then((response) => {
            if (response.success) {
                dispatch({ type: LOGIN_SUCCESS, isAuth: true });
                ApiToken.setTokens(response.accessToken, response.refreshToken);
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

export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_REQUEST
        });
        new ApiCall(ApiRoutes.auth.logout).post({ token: ApiToken.getRefreshToken() })
        .then((response) => {
            if (response.success) {
                dispatch({ type: LOGOUT_SUCCESS, isAuth: false });
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

export const forgotPassword = (data) => {
    return (dispatch) => {
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

export const resetPassword = (data) => {
    return (dispatch) => {
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

export const getToken = () => {
    return function(dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        });
        new ApiCall(ApiRoutes.auth.token).post(ApiToken.getRefreshToken())
        .then((response) => {
            if (response.success) {
                dispatch({ type: TOKEN_SUCCESS });
                ApiToken.setTokens(response.accessToken, response.refreshToken);
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

export const getUser = (formData, setFormData) => {
    return function(dispatch) {
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

export const updateUser = (formData) => {
    return function(dispatch) {
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

const registerFailed = () => ({ type: REGISTER_FAILED });

const loginFailed = () => ({ type: LOGIN_FAILED });

const logoutFailed = () => ({ type: LOGOUT_FAILED });

const forgotPasswordFailed = () => ({ type: FORGOT_PASSWORD_FAILED });

const resetPasswordFailed = () => ({ type: RESET_PASSWORD_FAILED });

const tokenFailed = () => ({ type: TOKEN_FAILED });

const getUserFailed = () => ({ type: GET_USER_FAILED });

const updateUserFailed = () => ({ type: UPDATE_USER_FAILED });