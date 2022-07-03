import { userReducer } from "./user";

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

describe('Profile orders reducer', () => {
  it('should handle LOGIN_REQUEST', () => {
    expect(userReducer(initialState, {
      type: LOGIN_REQUEST
    })).toEqual({
      ...initialState,
      loginRequest: true
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(userReducer(initialState, {
      type: LOGIN_SUCCESS,
      isLoggedIn: true
    })).toEqual({
      ...initialState,
      isLoggedIn: true,
      loginRequest: false,
      loginFailed: false
    })
  })

    it('should handle LOGIN_FAILED', () => {
      expect(userReducer(initialState, {
        type: LOGIN_FAILED
      })).toEqual({
        ...initialState,
        loginRequest: false,
        loginFailed: true
      })
    })

    it('should handle LOGOUT_REQUEST', () => {
      expect(userReducer(initialState, {
        type: LOGOUT_REQUEST
      })).toEqual({
        ...initialState,
        logoutRequest: true
      })
    })

    it('should handle LOGOUT_SUCCESS', () => {
      expect(userReducer({
          ...initialState,
          isLoggedIn: true,
        },
        {
          type: LOGOUT_SUCCESS,
          isLoggedIn: false
        }
      )).toEqual({
        ...initialState,
        isLoggedIn: false,
        logoutRequest: false,
        logoutSuccess: true, 
        logoutFailed: false,
      })
    })
    
    it('should handle LOGOUT_FAILED', () => {
      expect(userReducer(initialState, {
        type: LOGOUT_FAILED
      })).toEqual({
        ...initialState,
        logoutRequest: false,
        logoutSuccess: false,
        logoutFailed: true,
      })
    })
    /*
    it('should handle REGISTER_REQUEST', () => {
        expect(userReducer(initialState, {
    ...initialState,
    registerRequest: true,
  }
}
    it('should handle REGISTER_SUCCESS', () => {
        expect(userReducer(initialState, {
    ...initialState,
    registerSuccess: true,
    registerRequest: false,
    registerFailed: false
  }
}
    it('should handle REGISTER_FAILED', () => {
        expect(userReducer(initialState, {
    ...initialState,
    registerSuccess: false,
    registerRequest: false,
    registerFailed: true,
  }
}

    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
    ...initialState,
    forgotPasswordRequest: true,
  }
}
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(userReducer(initialState, {
    ...initialState,
    forgotPasswordSuccess: true,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false
  }
}
    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(userReducer(initialState, {
    ...initialState,
    forgotPasswordSuccess: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: true
  }
}

    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
    ...initialState,
    resetPasswordRequest: true,
  }
}
    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(userReducer(initialState, {
    ...initialState,
    resetPasswordSuccess: true,
    resetPasswordRequest: false,
    resetPasswordFailed: false,
  }
}
    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(userReducer(initialState, {
    ...initialState,
    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: true,
  }
}

    it('should handle TOKEN_REQUEST', () => {
  return{
    ...initialState,
    tokenRequest: true,
  }
}
    it('should handle TOKEN_SUCCESS', () => {
  return{
    ...initialState,
    tokenRequest: false,
    tokenSuccess: true,
    tokenFailed: false
}
}
    it('should handle TOKEN_FAILED', () => {
  return{
    ...initialState,
    tokenRequest: false,
    tokenSuccess: false,
    tokenFailed: true,
  }
}

    it('should handle GET_USER_REQUEST', () => {
        expect(userReducer(initialState, {
    ...initialState,
    getUserRequest: true,
  }
}
    it('should handle GET_USER_SUCCESS', () => {
        expect(userReducer(initialState, {
    ...initialState,
    getUserRequest: false,
    getUserSuccess: true,
    getUserFailed: false,
  }
}
    it('should handle GET_USER_FAILED', () => {
        expect(userReducer(initialState, {
    ...initialState,
    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: true
  }
}

    it('should handle UPDATE_USER_REQUEST', () => {
        expect(userReducer(initialState, {
    ...initialState,
    updateUserRequest: true,
  }
}
    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(userReducer(initialState, {
    ...initialState,
    updateUserRequest: false,
    updateUserSuccess: true,
    updateUserFailed: false,
  }
}
    it('should handle UPDATE_USER_FAILED', () => {
        expect(userReducer(initialState, {
    ...initialState,
    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: true
  }
}
    it('should handle UPDATE_USER_CLEAR', () => {
        expect(userReducer(initialState, {
    ...initialState,
    updateUserRequest: false,
    updateUserSuccess: false,
    updateUserFailed: false
  }
}*/
})