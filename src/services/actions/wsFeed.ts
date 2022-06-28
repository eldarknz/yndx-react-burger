import { TOrderList } from "../../../declarations";

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from "../constants/ws";

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
    readonly data: TOrderList;
}

/**
 * Action creator
 */
export const wsFeedConnectionStart = (): IWSFeedConnectionStartAction => ({ type: WS_CONNECTION_START });
export const wsFeedConnectionSuccess = (): IWSFeedConnectionSuccessAction => ({ type: WS_CONNECTION_SUCCESS });
export const wsFeedConnectionError = (): IWSFeedConnectionErrorAction => ({ type: WS_CONNECTION_ERROR });
export const wsFeedConnectionClosed = (): IWSFeedConnectionClosedAction => ({ type: WS_CONNECTION_CLOSED });
export const wsFeedGetMessage = (data: TOrderList): IWSFeedGetMessageAction => ({
    type: WS_GET_MESSAGE,
    data: data
});

/**
 * Union type
 */
export type TWSFeedActions =
 | IWSFeedConnectionStartAction
 | IWSFeedConnectionSuccessAction
 | IWSFeedConnectionErrorAction
 | IWSFeedConnectionClosedAction
 | IWSFeedGetMessageAction;