import ApiRoutes from "../../api/ApiRoutes";
import { ApiToken } from "api/ApiToken";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

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

const fetchData = async (url, data) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    
    if(!response.ok){
        throw new Error(response.status);
    }

    let json = await response.json();
    return json;
};

export const register = (data) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST
        });
        fetchData(ApiRoutes.auth.register, data)
        .then((response) => {
            console.log(response);
            if (response.success) {
                dispatch(({ type: REGISTER_SUCCESS, user: response.user}));
                ApiToken.setTokens(response.accessToken, response.refreshToken);
            } else {
                dispatch({ type: REGISTER_FAILED });
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: REGISTER_FAILED
            });
        });
    };
};

export const login = (data) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });
        fetchData(ApiRoutes.auth.login, data)
        .then((response) => {
            console.log(response);
            if (response.success) {
                dispatch({ type: LOGIN_SUCCESS, user: response.user });
                ApiToken.setTokens(response.accessToken, response.refreshToken);
            } else {
                dispatch({ type: LOGIN_FAILED });
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: LOGIN_FAILED
            });
        });
    };
};

export const forgotPassword = (data) => {
    return (dispatch) => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });
        fetchData(ApiRoutes.password_reset.forgot_password, data)
        .then((response) => {
            console.log(response);
            if (response.success) {
                dispatch({ type: FORGOT_PASSWORD_SUCCESS });
            }
            else {
                dispatch({ type: FORGOT_PASSWORD_FAILED });
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: FORGOT_PASSWORD_FAILED
            });
        });
    };
};

export const resetPassword = (data) => {
    return (dispatch) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });
        fetchData(ApiRoutes.password_reset.reset_password, data)
        .then((response) => {
            console.log(response);
            if (response.success) {
                dispatch({ type: RESET_PASSWORD_SUCCESS });
            }
            else {
                dispatch({ type: RESET_PASSWORD_FAILED });
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: RESET_PASSWORD_FAILED
            });
        });
    }
};

export function getToken() {
    return function(dispatch) {
        dispatch({
            type: TOKEN_REQUEST
        });

        fetchData(ApiRoutes.auth.token, ApiToken.getRefreshToken())
        .then((response) => {
            console.log(response);
            if (response.success) {
                dispatch({ type: TOKEN_SUCCESS });
                ApiToken.setTokens(response.accessToken, response.refreshToken);
            }
            else {
                dispatch({ type: TOKEN_FAILED });
            }
        })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: TOKEN_FAILED
            });
        });
    }
}
