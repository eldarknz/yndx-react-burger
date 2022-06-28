import jwt_decode from "jwt-decode";
import { differenceInDays as diff, isSameDay as same, format, subDays, formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale'

import { TIngredient, TBurgerComposition } from "../../declarations";

import { ApiToken } from "../api/ApiToken";

// check object is empty
export const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
}

// Check access token
export const checkAccessToken = () => {
    const accessToken = ApiToken.getAccessToken();
    if (accessToken) {
        const decodedToken: any = jwt_decode(accessToken);
        const currentTime = new Date().getTime();
        if (decodedToken.exp * 1000 < currentTime) {
            return false;
        }
    }
    return accessToken ? true : false;
}

// get burger composition
export const getBurgerComposition = (burgerIngredients: Array<TIngredient>) => {
    let burgerComposition: TBurgerComposition = {
        bun: null,
        ingredients: {},
        totalValue: 0
    }

    burgerIngredients.forEach(ingredient => {
        if (ingredient.type === "bun") {
            if (!burgerComposition.bun) {
                burgerComposition.bun = ingredient
                burgerComposition.totalValue += ingredient.price * 2;
            }
        } else {
            if (!(ingredient._id in burgerComposition.ingredients))
                burgerComposition.ingredients[ingredient._id] = { count: 0, ingredient: ingredient }
            burgerComposition.ingredients[ingredient._id]["count"] += 1
            burgerComposition.totalValue += ingredient.price;
        }
    })

    return burgerComposition;
};

// date and time convert
export const dateFormatConverter = (date: string) => {
    const initDate = new Date(date);
    const today = new Date();
    const yesterday = subDays(today, 1);
    const dayBeforeYesterday = subDays(today, 2);

    let formattedDate = '';
    if (same(initDate, today)) {
        formattedDate = 'Сегодня';
    } else if (same(initDate, yesterday)) {
        formattedDate = 'Вчера';
    } else if (same(initDate, dayBeforeYesterday)) {
        formattedDate = 'Позавчера';
    } else if (diff(today, initDate) <= 7) {
        formattedDate = formatDistance(subDays(today, diff(today, initDate)), today, { addSuffix: true, locale: ru })
    } else {
        formattedDate = format(initDate, 'dd.MM.yyyy')
    }
    formattedDate += `, ${format(initDate, 'HH:mm')} i-${format(initDate, "O")}`;
    
    return formattedDate;
}