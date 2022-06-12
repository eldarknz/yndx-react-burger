import { TFeedItem, TOrder } from "../../../declarations";
import { TWSFeedActions } from "../actions/wsFeed";

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from "../constants/ws";

type TFeedState = {
    wsConnected: boolean,
    orders: ReadonlyArray<TOrder>,
}

const initialState: TFeedState = {
    wsConnected: false,
    orders: [],
}

export const feedReducer = (state = initialState, action: TWSFeedActions): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
              ...state
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            }
        }
        case WS_GET_MESSAGE: {
            console.log("action ---> ", action.orders);
            return {
                ...state,
                orders: action.orders
            }
        }

        default: {
            return state;
        }
    };
};