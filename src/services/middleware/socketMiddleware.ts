import type { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "../types"

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from "../../services/constants/ws";

import { TWSActions } from "../../services/actions/ws";

export type wsActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE
}

export const socketMiddleware = (wsUrl: string, wsActions: wsActions, includeToken: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                //const token = includeToken ? `?token=${getCookie(ACCESS_TOKEN_COOKIE)}` : '';
                socket = new WebSocket(`${wsUrl}`)
            }
        };
    }) as Middleware;
};