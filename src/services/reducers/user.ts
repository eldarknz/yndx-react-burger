//import { ApiToken } from "api/ApiToken";
import { TUserActions } from "services/actions/user";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,

  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,

  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,

  TOKEN_SUCCESS,
  TOKEN_FAILED,
  TOKEN_REQUEST,

  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,

  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_CLEAR

} from "../constants/user";

export type TUserState = {
  isLoggedIn: boolean,

  loginRequest: boolean,
  loginFailed: boolean,

  logoutSuccess: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,

  registerSuccess: boolean,
  registerRequest: boolean,
  registerFailed: boolean,

  forgotPasswordSuccess: boolean,
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,

  resetPasswordSuccess: boolean,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,

  tokenRequest: boolean,
  tokenSuccess: boolean,
  tokenFailed: boolean,

  getUserRequest: boolean,
  getUserSuccess: boolean,
  getUserFailed: boolean,

  updateUserRequest: boolean,
  updateUserSuccess: boolean,
  updateUserFailed: boolean,
}

const initialState: TUserState = {
    isLoggedIn: false,

    loginRequest: false,
    loginFailed: false,

    logoutSuccess: false,
    logoutRequest: false,
    logoutFailed: false,

    registerSuccess: false,
    registerRequest: false,
    registerFailed: false,

    forgotPasswordSuccess: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,

    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,

    tokenRequest: false,
    tokenSuccess: false,
    tokenFailed: false,

    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: false,

    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: false,
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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
        isLoggedIn: action.isLoggedIn,
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

    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        logoutRequest: false,
        logoutSuccess: true, 
        logoutFailed: false,
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: false,
        logoutFailed: true,
      }
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
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

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordSuccess: true,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false
      }
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordSuccess: false,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true
      }
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordSuccess: true,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
      }
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordSuccess: false,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      }
    }

    case TOKEN_REQUEST: {
      return{
        ...state,
        tokenRequest: true,
      }
    }
    case TOKEN_SUCCESS: {
      return{
        ...state,
        tokenRequest: false,
        tokenSuccess: true,
        tokenFailed: false
    }
    }
    case TOKEN_FAILED: {
      return{
        ...state,
        tokenRequest: false,
        tokenSuccess: false,
        tokenFailed: true,
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserSuccess: true,
        getUserFailed: false,
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserSuccess: false,
        getUserFailed: true
      }
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserSuccess: true,
        updateUserFailed: false,
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserSuccess: false,
        updateUserFailed: true
      }
    }
    case UPDATE_USER_CLEAR: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserSuccess: false,
        updateUserFailed: false
      }
    }

    default: {
      return state;
    }
  }
};