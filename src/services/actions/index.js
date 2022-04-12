/**
 * Для теста
 */
//import { getItemsRequest } from "../initialIngredients";
import { v4 as uuidv4 } from 'uuid';

import { ApiCall } from "../../api/ApiCall";
import ApiRoutes from '../../api/ApiRoutes'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS';

export const ADD_ORDER_NUMBER = 'ADD_ORDER_NUMBER';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const GET_INGREDIENT_DETAILS = 'GET_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const TAB_SWITCH = 'TAB_SWITCH';

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

/**
 * Для теста
 */
/*export const getIngredients = () => {
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

export const getIngredients = () => {
  return (dispatch) => {
      dispatch({
          type: GET_INGREDIENTS_REQUEST
      });
      new ApiCall(ApiRoutes.ingredients).get()
      .then((response) => {
          if (response.success) {
            dispatch({
              type: GET_INGREDIENTS_SUCCESS,
              ingredients: [...response.data]
            });
          } else {
              dispatch(getIngredientsFailed());
          }
      })
      .catch((error) => {
          console.log("Ошибка при выполнении запроса к API: " + error.message);
          dispatch(getIngredientsFailed());
      });
  };
};

/**
 * Action Creators
 */

const getIngredientsFailed = () => ({ type: GET_INGREDIENTS_FAILED });

export const swapIngredients = ( dragIndex, hoverIndex ) => {
  return { 
    type: SWAP_INGREDIENTS,
    payload: {
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    }
  };
}

export const addIngredient = ( ingredient ) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ingredient,
      uuid: uuidv4()
    }
  };
}

export const deleteIngredient = ( ingredient ) => {
  return {
    type: DELETE_INGREDIENT, ingredient
  };
};

export const addBun = ( ingredient ) => {
  return {
    type: ADD_BUN,
    ingredient 
  };
};