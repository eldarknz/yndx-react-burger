import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

} from "../actions/user";

const initialState = {
    user: null,
    loginFailed: false,
    loginRequest: false,

    registerSuccess: false,
    registerRequest: false,
    registerFailed: false,

    forgotPasswordSuccess: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,

    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
};
  
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginRequest: false,
        loginFailed: false
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true
      }
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        registerSuccess: false,
        registerRequest: true,
        registerFailed: false
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registerSuccess: true,
        registerRequest: false,
        registerFailed: false
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerSuccess: false,
        registerRequest: false,
        registerFailed: true,
      }
    }

    case FORGOT_PASSWORD_REQUEST:{
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS:{
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        forgotPasswordSuccess: false,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true
      }
    }

    case RESET_PASSWORD_REQUEST:{
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_SUCCESS:{
      return {
        ...state,
        resetPasswordSuccess: true,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        resetPasswordSuccess: false,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      }
    }

    default: {
        return state;
    }
  }
};