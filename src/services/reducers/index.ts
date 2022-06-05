/**
 * Для теста
 */
//import { bun, ingredients } from '../initialIngredients';

import { TBurgerActions } from '../actions/index';
import { TIngredient } from '../../../declarations';

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
    CLEAR_CONSTRUCTOR
} from '../constants/burger';

export type TBurgerState = {
    ingredients: Array<TIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,

    burgerIngredients: Array<TIngredient>,
    burgerBun: TIngredient | null,

    viewedIngredient: TIngredient | null,

    currentTab: string
}

const initialState: TBurgerState = {

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    burgerIngredients: [],
    burgerBun: null,

    viewedIngredient: null,

    currentTab: 'bun'
};

export const appReducer = (state = initialState, action: TBurgerActions) => {
    switch (action.type) {
        case TAB_SWITCH: {
            return {
                ...state,
                currentTab: action.selectedTab
                //currentTab: state.currentTab !== action.selectedTab ? action.selectedTab : state.currentTab
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
            const { ingredient, uuid } = action.payload;
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