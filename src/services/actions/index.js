/**
 * Для теста
 */
//import { getItemsRequest } from "../initialIngredients";
import { API_URL } from "utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS';

export const ADD_ORDER_NUMBER = 'ADD_ORDER_NUMBER';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const TAB_SWITCH = 'TAB_SWITCH';

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

/**
 * Для теста
 */
/*export function getIngredients() {
    return (dispatch) => {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });
      getItemsRequest().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      });
    };
}*/

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
}

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(`${API_URL}ingredients`)
    .then(checkResponse)
    .then((response) => {
      dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: [...response.data]
      });
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch({
            type: GET_INGREDIENTS_FAILED
        });
    });
  };
}

export function getOrderNumber(data) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    });

    const body = JSON.stringify({
      ingredients: typeof data === "string" ? JSON.parse(data) : data,
    });

    fetch(`${API_URL}orders`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body,
    })
    .then(checkResponse)
    .then((response) => {
      dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          orderNumber: response.order.number
      });
      dispatch({
        type: CLEAR_CONSTRUCTOR
      });
    })
    .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
        dispatch({
            type: GET_ORDER_NUMBER_FAILED
        });
    });
  }
}

/**
 * Action Creators
 */

export const swapIngredients = (dragIndex, hoverIndex) => {
  return { 
    type: SWAP_INGREDIENTS,
    payload: {
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    }
  }
}