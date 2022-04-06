import { API_URL } from "../../utils/constants";

export const IS_REQUEST = 'IS_REQUEST';
export const IS_SUCCESS = 'IS_SUCCESS';
export const IS_FAILED = 'IS_FAILED';

const checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
}

const apiCall = async (url, data) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
    });
}

export function register({ email, password }) {
    return function(dispatch) {
        dispatch({
            type: IS_REQUEST
        });

        fetch(`${API_URL}auth/login`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email, 
              password
            })
        })
        .then(checkResponse)
        .then((response) => {
            console.log(response)
            dispatch(({ type: IS_SUCCESS, isAuth: true}));
          })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: IS_FAILED
            });
        });
    };
}

export function login(data) {
    return function(dispatch) {
        dispatch({
            type: IS_REQUEST
        });

        fetch(`${API_URL}auth/login`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(checkResponse)
        .then((response) => {
            console.log(response)
            dispatch(({ type: IS_SUCCESS, isAuth: true}));
          })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: IS_FAILED
            });
        });
    };
}

export function forgotPassword( data, history, location ) {
    return function(dispatch) {
        dispatch({
            type: IS_REQUEST
        });

        console.log(apiCall(`${API_URL}password-reset`, data));

        fetch(`${API_URL}password-reset`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(checkResponse)
        .then((response) => {
            console.log(response)
            history.push("/reset-password", { from: location });
          })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: IS_FAILED
            });
        });
    };
}

export function resetPassword( data, history ) {
    return function(dispatch) {
        dispatch({
            type: IS_REQUEST
        });

        fetch(`${API_URL}password-reset/reset`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(checkResponse)
        .then((response) => {
            console.log(response)
            history.replace("/login")
          })
        .catch((error) => {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
            dispatch({
                type: IS_FAILED
            });
        });
    };
}