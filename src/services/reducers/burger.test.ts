import { v4 as uuidv4 } from 'uuid';

import { INGREDIENT_CATEGORIES } from '../../utils/constants';
import { TIngredient } from '../../../declarations';
import { bun, ingredients } from '../../utils/testData';

import { burgerReducer } from './burger';

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

const uuidList = Array.from(Array(5), (_) => uuidv4());

describe('Burger reducer', () => {

    it('should handle TAB_SWITCH', () => {
        expect(burgerReducer(initialState, {
            type: TAB_SWITCH,
            currentTab: INGREDIENT_CATEGORIES[1].type
        })).toEqual({
            ...initialState,
            currentTab: INGREDIENT_CATEGORIES[1].type
        })
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(burgerReducer(initialState, {
            type: GET_INGREDIENTS_REQUEST
        })).toEqual({
            ...initialState,
            ingredientsRequest: true
        })
    })

    it ('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(burgerReducer(initialState, {
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: [bun]
        })).toEqual({
            ...initialState,
            ingredients: [bun]
        })
    })

    it ('should handle GET_INGREDIENTS_FAILED', () => {
        expect(burgerReducer(initialState, {
            type: GET_INGREDIENTS_FAILED
        })).toEqual({
            ...initialState,
            ingredientsFailed: true
        })
    })

    it ('should handle ADD_INGREDIENT', () => {
        const uuid = uuidList[0];
        expect(burgerReducer(initialState, {
            type: ADD_INGREDIENT,
            payload: {
                ingredient: ingredients[0],
                uuid: uuid
            }
        })).toEqual({
            ...initialState,
            burgerIngredients: [{...ingredients[0], uuid}]
        })
    })

    it ('should handle REMOVE_INGREDIENT', () => {
        const uuid1 = uuidList[0];
        const uuid2 = uuidList[1];
        expect(burgerReducer({
                ...initialState,
                burgerIngredients: [{...ingredients[0], uuid: uuid1}, {...ingredients[1], uuid: uuid2}]
            },
            {
                type: REMOVE_INGREDIENT,
                ingredient: {...ingredients[0], uuid: uuid1}
            }
        )).toEqual({
            ...initialState,
            burgerIngredients: [{...ingredients[1], uuid: uuid2}]
        })
    })

    it ('should handle ADD_BUN', () => {
        const uuid = uuidList[0];
        expect(burgerReducer(initialState, {
            type: ADD_BUN,
            ingredient: bun
        })).toEqual({
            ...initialState,
            burgerBun: bun
        })
    })

    it ('should handle SWAP_INGREDIENTS', () => {
        const uuid1 = uuidList[0];
        const uuid2 = uuidList[1];
        expect(burgerReducer({
                ...initialState,
                burgerIngredients: [{...ingredients[0], uuid: uuid1}, {...ingredients[1], uuid: uuid2}]
            }, 
            {
                type: SWAP_INGREDIENTS,
                payload: {
                    dragIndex: 0,
                    hoverIndex: 1
                }
            }
        )).toEqual({
            ...initialState,
            burgerIngredients: [{...ingredients[1], uuid: uuid2}, {...ingredients[0], uuid: uuid1}]
        })
    })

    it ('should handle GET_INGREDIENT_DETAILS', () => {
        expect(burgerReducer(initialState, {
            type: GET_INGREDIENT_DETAILS,
            ingredient: bun
        })).toEqual({
            ...initialState,
            viewedIngredient: bun
        })
    })

    it ('should handle REMOVE_INGREDIENT_DETAILS', () => {
        expect(burgerReducer({
                ...initialState,
                viewedIngredient: bun
            },
            {
                type: REMOVE_INGREDIENT_DETAILS,
            }
            )).toEqual(initialState)
        })

    it ('should handle REMOVE_SELECTED_INGREDIENTS', () => {
        expect(burgerReducer({
                ...initialState,
                burgerIngredients: [ingredients[0]],
                burgerBun: bun
            },
            {
                type: REMOVE_SELECTED_INGREDIENTS,
            }
        )).toEqual(initialState)
    })
});