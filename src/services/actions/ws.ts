import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "../../services/constants/ws";

import { IMessage } from "../../services/reducers/ws";

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: IMessage;
}

export interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: IMessage;
}

/**
 * Action creator
 */
export const wsConnectionStart = (): IWSConnectionStart => ({ type: WS_CONNECTION_START });
export const wsConnectionSuccess = (): IWSConnectionSuccess => ({ type: WS_CONNECTION_SUCCESS });
export const wsConnectionError = (): IWSConnectionError => ({ type: WS_CONNECTION_ERROR });
export const wsConnectionClosed = () => ({ type: WS_CONNECTION_CLOSED });
export const wsGetMessage = (message: IMessage): IWSGetMessage => ({
    type: WS_GET_MESSAGE,
    payload: message
});
export const wsSendMessage = (message: IMessage): IWSSendMessage => ({
    type: WS_SEND_MESSAGE,
    payload: message
});

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSGetMessage
    | IWSSendMessage;