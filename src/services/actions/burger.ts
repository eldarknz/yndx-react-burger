/**
 * Для теста
 */
//import { getItemsRequest } from "../initialIngredients";
//import { getOrdersRequest } from "../orders";

import { v4 as uuidv4 } from 'uuid';

import { AppDispatch, AppThunk } from '../types';
import { ApiCall } from "../../api/ApiCall";
import ApiRoutes from '../../api/ApiRoutes'

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  SWAP_INGREDIENTS,
  GET_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
  REMOVE_SELECTED_INGREDIENTS,
  TAB_SWITCH
} from "../constants/burger"
import { TIngredient } from "../../../declarations";

/**
 * Для теста
 */
/*export const getOrders = () => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDERS_REQUEST
    });
    getOrdersRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_FAILED
        });
      }
    });
  };
}*/

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

/**
 * Action typing
 */
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: {
    readonly ingredient: TIngredient;
    readonly uuid: string;
  }
}
export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly ingredient: TIngredient;
}
export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly ingredient: TIngredient;
}
export interface ISwapIngredientsAction {
  readonly type: typeof SWAP_INGREDIENTS;
  readonly payload: {
    readonly dragIndex: number;
    readonly hoverIndex: number;
  }
}
export interface IGetIngredientDetailsAction {
  readonly type: typeof GET_INGREDIENT_DETAILS;
  readonly ingredient: TIngredient;
}
export interface IRemoveIngredientDetailsAction {
  readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}
export interface IRemoveSelectedIngredientsAction {
  readonly type: typeof REMOVE_SELECTED_INGREDIENTS;
}
export interface ITabSwitchAction {
  readonly type: typeof TAB_SWITCH;
  readonly selectedTab: string;
}

/**
 * Action Creator
 */
export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({ type: GET_INGREDIENTS_REQUEST });
export const getIngredientsSuccess = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});
export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({ type: GET_INGREDIENTS_FAILED });
export const addIngredient = (ingredient: Readonly<TIngredient>): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: {
    ingredient,
    uuid: uuidv4()
  }
});
export const removeIngredient = (ingredient: Readonly<TIngredient>): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  ingredient
});
export const addBun = (ingredient: Readonly<TIngredient>): IAddBunAction => ({
  type: ADD_BUN,
  ingredient 
}); 
export const swapIngredients = (dragIndex: Readonly<number>, hoverIndex: Readonly<number>): ISwapIngredientsAction => ({ 
  type: SWAP_INGREDIENTS,
  payload: {
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
});
export const tabSwitch = (selectedTab: Readonly<string>): ITabSwitchAction => ({ type: TAB_SWITCH, selectedTab });

/**
 * Thunk
 */
 export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  new ApiCall(ApiRoutes.ingredients).get()
  .then((response) => {
      dispatch(response.success ? getIngredientsSuccess(response.data): getIngredientsFailed());
  })
  .catch((error) => {
      console.log("Ошибка при выполнении запроса к API: " + error.message);
      dispatch(getIngredientsFailed());
  });
};

/**
 * Union type
 */
export type TBurgerActions =
 | IGetIngredientsRequestAction
 | IGetIngredientsSuccessAction
 | IGetIngredientsFailedAction
 | IAddIngredientAction
 | IRemoveIngredientAction
 | IAddBunAction
 | ISwapIngredientsAction
 | IGetIngredientDetailsAction
 | IRemoveIngredientDetailsAction
 | IRemoveSelectedIngredientsAction
 | ITabSwitchAction;