import { TIngredient, TFeed, TFeedItem, TOrder } from "../../../declarations";

import {
    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_GET_MESSAGE,
} from "../constants/ws";

export interface IWSProfileOrdersConnectionStartAction {
    readonly type: typeof WS_PROFILE_CONNECTION_START;
}

export interface IWSProfileOrdersConnectionSuccessAction {
    readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
}

export interface IWSProfileOrdersConnectionErrorAction {
    readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
}

export interface IWSProfileOrdersConnectionClosedAction {
    readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
}

export interface IWSProfileOrdersGetMessageAction {
    readonly type: typeof WS_PROFILE_GET_MESSAGE;
    readonly orders: Array<TOrder>;
}

/*export interface IWSProfileOrdersGetMessageAction {
    readonly type: typeof WS_PROFILE_GET_MESSAGE;
    readonly feed: TFeed;
    readonly ingredients: ReadonlyArray<TIngredient>;
}*/

/**
 * Action creator
 */
export const wsProfileOrdersConnectionStart = (): IWSProfileOrdersConnectionStartAction => ({ type: WS_PROFILE_CONNECTION_START });
export const wsProfileOrdersConnectionSuccess = (): IWSProfileOrdersConnectionSuccessAction => ({ type: WS_PROFILE_CONNECTION_SUCCESS });
export const wsProfileOrdersConnectionError = (): IWSProfileOrdersConnectionErrorAction => ({ type: WS_PROFILE_CONNECTION_ERROR });
export const wsProfileOrdersConnectionClosed = (): IWSProfileOrdersConnectionClosedAction => ({ type: WS_PROFILE_CONNECTION_CLOSED });
export const wsProfileOrdersGetMessage = (orders: Array<TOrder>): IWSProfileOrdersGetMessageAction => ({
    type: WS_PROFILE_GET_MESSAGE,
    orders
});
/*export const wsProfileOrdersGetMessage = (feed: TFeed, ingredients: ReadonlyArray<TIngredient>): IWSProfileOrdersGetMessageAction => ({
    type: WS_PROFILE_GET_MESSAGE,
    feed,
    ingredients
});*/

/**
 * Union type
 */
export type TWSProfileOrdersActions =
    | IWSProfileOrdersConnectionStartAction
    | IWSProfileOrdersConnectionSuccessAction
    | IWSProfileOrdersConnectionErrorAction
    | IWSProfileOrdersConnectionClosedAction
    | IWSProfileOrdersGetMessageAction;