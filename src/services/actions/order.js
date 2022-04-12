import { ApiCall } from "../../api/ApiCall";
import ApiRoutes from '../../api/ApiRoutes'

import { CLEAR_CONSTRUCTOR } from ".";

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const getOrderNumber = (data) => {
  return (dispatch) => {
      dispatch({
          type: GET_ORDER_NUMBER_REQUEST
      });
      new ApiCall(ApiRoutes.orders).post({ "ingredients": data })
      .then((response) => {
          if (response.success) {
            dispatch({
              type: GET_ORDER_NUMBER_SUCCESS,
              orderNumber: response.order.number
            });
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
};

/**
 * Action Creators
 */

const getOrderNumberFailed = () => ({ type: GET_ORDER_NUMBER_FAILED });