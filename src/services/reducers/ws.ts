import ActionMessage from "components/ActionMessage/ActionMessage";
import { TWSActions } from "../../services/actions/ws";

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from "../../services/constants/ws";

export interface IMessage {
    text: string;
}

type TWSState = {
    wsConnected: boolean;
    messages: IMessage[];
}

const initialState: TWSState = {
    wsConnected: false,
    messages: []
}

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        default:
            return state;
    };
};