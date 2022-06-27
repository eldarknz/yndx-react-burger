import { ORDER_STATUS } from "utils/constants";
import { TOrderBoard, TOrder } from "../../../declarations";
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
    orders: Array<TOrder>,
    orderBoard: TOrderBoard,
    total: number,
    totalToday: number
}

const initialState: TFeedState = {
    wsConnected: false,
    orders: [],
    orderBoard: {
        done: [],
        pending: []
    },
    total: 0,
    totalToday: 0
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
                wsConnected: false,
                orders: [],
                orderBoard: {
                    done: [],
                    pending: []
                },
                total: 0,
                totalToday: 0
            }
        }
        case WS_GET_MESSAGE: {
            const done = action.data.orders.filter(order => order.status === ORDER_STATUS.DONE).map(order => order.number);
            const pending = action.data.orders.filter(order => order.status !== ORDER_STATUS.DONE).map(order => order.number);

            return {
                ...state,
                orders: action.data.orders,
                orderBoard: {
                    ...state.orderBoard,
                    done: done,
                    pending: pending
                },
                total: action.data.total,
                totalToday: action.data.totalToday
            }
        }

        default: {
            return state;
        }
    };
};