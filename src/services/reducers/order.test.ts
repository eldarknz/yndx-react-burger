import { orderReducer } from './order';

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

const orderNumber = '123456';

describe('Order reducer', () => {
    it('should handle GET_ORDER_NUMBER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_NUMBER_REQUEST,
        })).toEqual({
            ...initialState,
            orderNumberRequest: true,
        })
    })

    it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_NUMBER_SUCCESS,
            orderNumber: orderNumber,
        })).toEqual({
            ...initialState,
            orderNumber: orderNumber
        })
    })

    it('should handle GET_ORDER_NUMBER_FAILED', () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_NUMBER_FAILED,
        })).toEqual({
            ...initialState,
            orderNumberFailed: true
        })
    })
});