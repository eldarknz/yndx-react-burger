import { TOrder } from "../../../declarations";
import { TWSProfileOrdersActions } from "../../services/actions/wsProfileOrders";

import {
    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_GET_MESSAGE
} from "../constants/ws";

type TProfileOrdersState = {
    wsProfileConnected: boolean,
    orders: Array<TOrder>,
}

const initialState: TProfileOrdersState = {
    wsProfileConnected: false,
    orders: []
}

export const profileOrdersReducer = (state = initialState, action: TWSProfileOrdersActions): TProfileOrdersState => {
    switch (action.type) {
        case WS_PROFILE_CONNECTION_START: {
            return {
              ...state
            }
        }
        case WS_PROFILE_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsProfileConnected: true
            }
        }
        case WS_PROFILE_CONNECTION_ERROR: {
            return {
                ...state,
                wsProfileConnected: false
            }
        }
        case WS_PROFILE_CONNECTION_CLOSED: {
            return {
                ...state,
                wsProfileConnected: false
            }
        }
        case WS_PROFILE_GET_MESSAGE: {
            return {
                ...state,
                orders: action.data.orders,
            }
        }

        default: {
            return state;
        }
    };
};