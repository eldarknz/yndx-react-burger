import { combineReducers } from 'redux';

// temporary data
import { bun, ingredients } from '../initialIngredients';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CHANGE_BUN,
    TAB_SWITCH
} from 'services/actions';

const initialState = {

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerIngredients: ingredients,
    burgerBun: bun,

    viewedIngredient: null,

    order: null,

    currentTab: 'bun'
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                burgerIngredients: [...state.burgerIngredients, ...state.burgerIngredients.filter(ingredient => ingredient._id === action._id)]
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                burgerIngredients: [...state.burgerIngredients].filter(ingredient => ingredient._id !== action._id)
            };
        }
        case TAB_SWITCH: {
            return {
                ...state,
                currentTab: state.currentTab !== action.clickedTab ? action.clickedTab : state.currentTab
            };
        }
        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    app: appReducer
});