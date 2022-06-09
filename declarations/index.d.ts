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

export type TUser = {
    email: string; 
    name: string;
    password?: string 
}

export type TOrder = {
    ingredients: string[],
    name: string,
    _id: string,
    status: 'done' | 'pending' | 'created';
    number: number,
    createdAt: string,
    updatedAt: string
}

export interface ILocation {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: undefined;
}