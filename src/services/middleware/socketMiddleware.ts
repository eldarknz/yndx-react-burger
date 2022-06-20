import { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "../types"

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,

    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_GET_MESSAGE
} from "../constants/ws";

import { TWSFeedActions } from "../actions/wsFeed";
import { TWSProfileOrdersActions } from "../actions/wsProfileOrders";

import { ApiToken } from "api/ApiToken";

export type wsActions = {
    wsInit: typeof WS_CONNECTION_START | typeof WS_PROFILE_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS | typeof WS_PROFILE_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED | typeof WS_PROFILE_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR | typeof WS_PROFILE_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE | typeof WS_PROFILE_GET_MESSAGE
};

export const socketMiddleware = (wsUrl: string, wsActions: wsActions, includeToken: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSFeedActions | TWSProfileOrdersActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                const accessToken = includeToken ? `?token=${ApiToken.getAccessToken()}` : '';
                const url = `${wsUrl}${accessToken}`;
                //console.log(url);
                socket = new WebSocket(url);
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError });
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    
                    dispatch({ type: onMessage, data: restParsedData });
                };

                socket.onclose = () => {
                    dispatch({ type: onClose });
                };
            }

            next(action);
        };
    }) as Middleware;
};