import { TBurgerActions } from '../actions/burger';
import { TIngredient } from '../../../declarations';

import { INGREDIENT_CATEGORIES } from '../../utils/constants';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    ADD_BUN,
    SWAP_INGREDIENTS,
    TAB_SWITCH,
    GET_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS,
    REMOVE_SELECTED_INGREDIENTS
} from '../constants/burger';

export type TBurgerState = {
    ingredients: TIngredient[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,

    burgerIngredients: TIngredient[],
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

    currentTab: INGREDIENT_CATEGORIES[0].type
};

export const burgerReducer = (state = initialState, action: TBurgerActions): TBurgerState => {
    switch (action.type) {
        case TAB_SWITCH: {
            return {
                ...state,
                currentTab: action.currentTab
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

                ingredients: action.ingredients.map((item: TIngredient) => {
                    return { ...item }
                }),
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
        case REMOVE_INGREDIENT: {
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
        case REMOVE_INGREDIENT_DETAILS: {
            return {
                ...state,
                viewedIngredient: null
            };
        }
        case REMOVE_SELECTED_INGREDIENTS: {
            return {
                ...state,
                burgerIngredients: [],
                burgerBun: null,
            }
        }
        default: {
            return state;
        }
    }
}