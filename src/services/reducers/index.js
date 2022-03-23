/**
 * Для теста
 */
//import { bun, ingredients } from '../initialIngredients';

import { v4 as uuidv4 } from 'uuid';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    ADD_BUN,
    SWAP_INGREDIENTS,
    TAB_SWITCH,
    GET_INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    CLEAR_CONSTRUCTOR
} from 'services/actions';

const initialState = {

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerIngredients: [],
    burgerBun: {},

    viewedIngredient: null,

    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,

    currentTab: 'bun'
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TAB_SWITCH: {
            return {
                ...state,
                currentTab: state.currentTab !== action.selectedtTab ? action.selectedtTab : state.currentTab
            };
        }
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
                ingredientsFailed: false,
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
            const ingredient = action.ingredient;
            const uuid = uuidv4();
            return {
                ...state,
                burgerIngredients: [...state.burgerIngredients, {...ingredient, uuid:uuid}]
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                burgerIngredients: [...state.burgerIngredients].filter(ingredient => ingredient.uuid !== action.ingredient.uuid)
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                burgerBun: action.ingredient
            };
        }
        case SWAP_INGREDIENTS: {
            const { dragIndex, hoverIndex } = action.payload;
            const copyBurgerIngredients = [...state.burgerIngredients];
            [copyBurgerIngredients[dragIndex], copyBurgerIngredients[hoverIndex]] = [copyBurgerIngredients[hoverIndex], copyBurgerIngredients[dragIndex]];
      
            return {
                ...state,
                burgerIngredients: copyBurgerIngredients
            }
        }
        case GET_INGREDIENT_DETAILS: {
            return {
                ...state,
                viewedIngredient: action.ingredient
            };
        }
        case DELETE_INGREDIENT_DETAILS: {
            return {
                ...state,
                viewedIngredient: null
            };
        }
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
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                burgerIngredients: [],
                burgerBun: {},
            }
        }
        default: {
            return state;
        }
    }
}