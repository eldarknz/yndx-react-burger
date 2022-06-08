import { AppDispatch, AppThunk } from "services/types";
import { ApiCall } from "../../api/ApiCall";
import ApiRoutes from '../../api/ApiRoutes'

import { CLEAR_CONSTRUCTOR } from "../constants/burger";

import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  //ADD_ORDER_NUMBER,
  //DELETE_ORDER_NUMBER
} from "../constants/order";

/**
 * GetOrderNumber actions typing
 */

export interface IGetOrderNumberRequestAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: string;
}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

/**
 * GetOrderNumber thunk
 */

export const getOrderNumber: AppThunk = (data: any) => (dispatch: AppDispatch) => {
    dispatch(getOrderNumberRequest());
    new ApiCall(ApiRoutes.orders).post({ "ingredients": data })
    .then((response) => {
        if (response.success) {
          dispatch(getOrderNumberSuccess(response.order.number));
          dispatch({
            type: CLEAR_CONSTRUCTOR
          });
        } else {
          dispatch(getOrderNumberFailed());
        }
    })
    .catch((error) => {
      console.log("Ошибка при выполнении запроса к API: " + error.message);
      dispatch(getOrderNumberFailed());
    });
};

/**
 * GetOrderNumber action creators
 */


const getOrderNumberRequest = (): IGetOrderNumberRequestAction => ({ type: GET_ORDER_NUMBER_REQUEST })
const getOrderNumberSuccess = (orderNumber: string): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  orderNumber
})
const getOrderNumberFailed = (): IGetOrderNumberFailedAction => ({ type: GET_ORDER_NUMBER_FAILED });

/**
 * Union type
 */

 export type TOrderActions =
 | IGetOrderNumberRequestAction
 | IGetOrderNumberSuccessAction
 | IGetOrderNumberFailedAction;