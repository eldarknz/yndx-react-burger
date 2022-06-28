import { AppDispatch, AppThunk } from '../types';
import { ApiCall } from "../../api/ApiCall";
import ApiRoutes from '../../api/ApiRoutes'

import { IRemoveSelectedIngredientsAction } from "./burger";
import { REMOVE_SELECTED_INGREDIENTS } from "../constants/burger";

import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  //ADD_ORDER_NUMBER,
  //REMOVE_ORDER_NUMBER
} from "../constants/order";

/**
 * Action typing
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
 * Action Creator
 */
export const getOrderNumberRequest = (): IGetOrderNumberRequestAction => ({ type: GET_ORDER_NUMBER_REQUEST })
export const getOrderNumberSuccess = (orderNumber: string): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  orderNumber
})
export const getOrderNumberFailed = (): IGetOrderNumberFailedAction => ({ type: GET_ORDER_NUMBER_FAILED });
export const removeSelectedIngredients = (): IRemoveSelectedIngredientsAction => ({ type: REMOVE_SELECTED_INGREDIENTS })

/**
 * Thunk
 */
 export const getOrderNumber: AppThunk = (data: Array<string>) => (dispatch: AppDispatch) => {
  dispatch(getOrderNumberRequest());
  new ApiCall(ApiRoutes.orders, { privateCall: true }).post({ "ingredients": data })
  .then((response) => {
      if (response.success) {
        dispatch(getOrderNumberSuccess(response.order.number));
        dispatch(removeSelectedIngredients());
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
 * Union type
 */
export type TOrderActions =
  | IGetOrderNumberRequestAction
  | IGetOrderNumberSuccessAction
  | IGetOrderNumberFailedAction;