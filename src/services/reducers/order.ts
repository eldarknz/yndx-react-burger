import { TOrderActions } from 'services/actions/order';
import {
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED
} from '../constants/order';

export type TOrderState = {
    orderNumber: string | null,
    orderNumberRequest: boolean,
    orderNumberFailed: boolean,
}

const initialState: TOrderState = {
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderNumberRequest: true
            }
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderNumberRequest: false,
                orderNumberFailed: false,
            }
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderNumber: null,
                orderNumberRequest: false,
                orderNumberFailed: true
            }
        }
        default: {
            return state;
        }
    }
}