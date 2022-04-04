import {
    IS_REQUEST,
    IS_SUCCESS,
    IS_FAILED
} from "../actions/user";

const initialState = {
    isRequest: false,
    isFailed: false,
    isAuth: false
};
  
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_REQUEST: {
            return {
              ...state,
              isRequest: true,
              isFailed: false
            }
        }
        case IS_SUCCESS: {
            return {
              ...state,
              isAuth: action.isAuth,
              isRequest: false,
              isFailed: false,
            }
        }
        case IS_FAILED: {
            return {
              ...state,
              isRequest: false,
              isFailed: true
            }
          }
        default: {
            return state;
        }
    }
};