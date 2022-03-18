import { API_URL } from "utils/constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const CHANGE_BUN = 'CHANGE_BUN';

export const ADD_ORDER_NUMBER = 'ADD_ORDER_NUMBER';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const TAB_SWITCH = 'TAB_SWITCH';

export function getItems() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(`${API_URL}ingredients
        `)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                });
                throw new Error(response.status);
            })
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