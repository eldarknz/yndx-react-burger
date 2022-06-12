import { TIngredient, TFeed, TFeedItem, TOrder, TOrderList } from "../../../declarations";

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from "../constants/wsFeed";

/**
 * Action typing
 */
export interface IWSFeedConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IWSFeedConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSFeedConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSFeedConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSFeedGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly orders: Array<TOrder>;
    readonly total: number;
    readonly totalToday: number;
}

/*export interface IWSFeedGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly feed: TFeed;
    readonly ingredients: ReadonlyArray<TIngredient>;
}*/

/**
 * Action creator
 */
export const wsFeedConnectionStart = (): IWSFeedConnectionStartAction => ({ type: WS_CONNECTION_START });
export const wsFeedConnectionSuccess = (): IWSFeedConnectionSuccessAction => ({ type: WS_CONNECTION_SUCCESS });
export const wsFeedConnectionError = (): IWSFeedConnectionErrorAction => ({ type: WS_CONNECTION_ERROR });
export const wsFeedConnectionClosed = (): IWSFeedConnectionClosedAction => ({ type: WS_CONNECTION_CLOSED });
export const wsFeedGetMessage = (orders: Array<TOrder>, total: number, totalToday: number): IWSFeedGetMessageAction => ({
    type: WS_GET_MESSAGE,
    orders,
    total,
    totalToday,
});

/*export const wsFeedGetMessage = (feed: TFeed, ingredients: ReadonlyArray<TIngredient>): IWSFeedGetMessageAction => ({
    type: WS_GET_MESSAGE,
    feed,
    ingredients
});*/

/**
 * Union type
 */
export type TWSFeedActions =
 | IWSFeedConnectionStartAction
 | IWSFeedConnectionSuccessAction
 | IWSFeedConnectionErrorAction
 | IWSFeedConnectionClosedAction
 | IWSFeedGetMessageAction;