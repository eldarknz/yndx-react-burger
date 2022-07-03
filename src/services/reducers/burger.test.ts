import { burgerReducer } from './burger';
import { TBurgerActions } from '../actions/burger';
import { TIngredient } from '../../../declarations';

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

    currentTab: 'bun'
};

describe('Burger reducer', () => {
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            ingredients: [],
            ingredientsRequest: true,
            ingredientsFailed: false,
            burgerIngredients: [],
            burgerBun: null,
            viewedIngredient: null,
            currentTab: 'bun'
        })
    })
});