export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredient = {
    readonly __v: number;
    readonly _id: string;
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
    uuid?: string;
}

export type TIngredientCategory = {
    _id: number
    type: TIngredientType;
    title: string;
}

export type TUser = {
    email: string; 
    name: string;
    password?: string 
}

export type TOrder = {
    ingredients: Array<string>,
    name: string,
    _id: string,
    status: 'done' | 'pending' | 'created';
    number: number,
    createdAt: string,
    updatedAt: string
}

export type TOrderList = {
    orders: Array<TOrder>,
    total: number,
    totalToday: number
}

export type TOrderBoard = {
    done: Array<number>;
    pending: Array<number>;
}

export type TBurgerCompositionIngredient = {
    count: number,
    ingredient: TIngredient | null
}

export type TBurgerComposition = {
    bun: TIngredient | null
    ingredients: {
        [T: string]: TBurgerCompositionIngredient
    },
    totalValue: number
}

export interface ILocation {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: undefined;
}

export type TFeed = {
    orders: ReadonlyArray<IFeedItem>,
    total: number,
    totalToday: number   
}

export type TFeedItem = {
    ingredients: ReadonlyArray<string>;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}