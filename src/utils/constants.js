export const API_URL = "https://norma.nomoreparties.space/api";

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const ROUTES = {
    home: {title: "Конструктор", path: "/"},
    login: {title: "Вход", path: "/login"},
    register: {title: "Регистрация", path: "/register"},
    forgot_password: {title: "Восстановление пароля", path: "/forgot-password"},
    reset_password: {title: "Восстановление пароля", path: "/reset-password"},
    ingredient: {title: "Ингредиент", path: "/ingredients/:id"},
    orders: {title: "Лента заказов", path: "/orders"},
    profile: {title: "Личный кабинет", path: "/profile"},
    profile_orders: {title: "", path: "/profile/orders"}
}

export const INGREDIENT_CATEGORIES = [
    { _id: 0, type: "bun", title: "Булки" },
    { _id: 1, type: "sauce", title: "Соусы" },
    { _id: 2, type: "main", title: "Начинки" }
];