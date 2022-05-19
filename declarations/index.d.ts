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

export interface IUserStore {
    user: {
        isLoggedIn: boolean;

        loginRequest: boolean;
        loginFailed: boolean;

        logoutSuccess: boolean;
        logoutRequest: boolean;
        logoutFailed: boolean;

        registerSuccess: boolean;
        registerRequest: boolean;
        registerFailed: boolean;

        forgotPasswordSuccess: boolean;
        forgotPasswordRequest: boolean;
        forgotPasswordFailed: boolean;

        resetPasswordSuccess: boolean;
        resetPasswordRequest: boolean;
        resetPasswordFailed: boolean;

        tokenRequest: boolean;
        tokenSuccess: boolean;
        tokenFailed: boolean;

        getUserRequest: boolean;
        getUserSuccess: boolean;
        getUserFailed: boolean;

        updateUserRequest: boolean;
        updateUserSuccess: boolean;
        updateUserFailed: boolean;
    }
};

export interface IIngredientsStore {
    app: {
        ingredients: TIngredient[];
        ingredientsRequest: boolean;
        ingredientsFailed: boolean;
    
        burgerIngredients: TIngredient[];
        burgerBun: TIngredient;
    
        viewedIngredient: TIngredient | null;
    
        currentTab: string;
    }
}

export interface IOrderStore {
    order: {
        orderNumber: string;
        orderNumberRequest: boolean;
        orderNumberFailed: boolean;
    }
};

export interface ILocation {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: undefined;
}