import { TIngredientCategory } from "../../declarations";

export const API_URL = "https://norma.nomoreparties.space/api";
export const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_PROFILE_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const ROUTES = {
    home: { title: "Конструктор", path: "/" },
    login: { title: "Вход", path: "/login" },
    register: { title: "Регистрация", path: "/register" },
    forgot_password: { title: "Восстановление пароля", path: "/forgot-password" },
    reset_password: { title: "Восстановление пароля", path: "/reset-password" },
    ingredient: { title: "Ингредиент", path: "/ingredients/:id" },
    feed: { title: "Лента заказов", path: "/feed" },
    feed_order: { title: "", path: "/feed/:id" },
    profile: { title: "Личный кабинет", path: "/profile" },
    profile_orders: { title: "", path: "/profile/orders" },
    profile_order: { title: "", path: "/profile/orders/:id"}
}

export const INGREDIENT_CATEGORIES: ReadonlyArray<TIngredientCategory> = [
    { _id: 0, type: "bun", title: "Булки" },
    { _id: 1, type: "sauce", title: "Соусы" },
    { _id: 2, type: "main", title: "Начинки" }
];

export const ORDER_STATUS = {
    DONE: "done",
    PENDING: "pending",
    CREATED: "created"
}
