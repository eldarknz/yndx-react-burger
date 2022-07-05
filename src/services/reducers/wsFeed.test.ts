import { TOrderBoard, TOrder } from "../../../declarations";
import { orders } from "../../utils/testData";

import { feedReducer } from "./wsFeed";

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

describe('Feed reducer', () => {
    it('should handle WS_CONNECTION_START', () => {
        expect(feedReducer(initialState, {
            type: WS_CONNECTION_START
        })).toEqual(initialState)
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(feedReducer(initialState, {
            type: WS_CONNECTION_SUCCESS
        })).toEqual({            
            ...initialState,
            wsConnected: true
        })
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(feedReducer(initialState, {
            type: WS_CONNECTION_ERROR
        })).toEqual({            
            ...initialState,
            wsConnected: false
        })
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(feedReducer({
                wsConnected: true,
                orders: [orders[0], orders[1], orders[2]],
                orderBoard: {
                    done: [10000, 10001, 10002],
                    pending: []
                },
                total: 100,
                totalToday: 3
            },
            {
                type: WS_CONNECTION_CLOSED
            }
        )).toEqual(initialState)
    })

    it('should handle WS_GET_MESSAGE', () => {
        expect(feedReducer({
                ...initialState,
                wsConnected: true
            },
            {
                type: WS_GET_MESSAGE,
                data: {
                    orders: [orders[0], orders[1], orders[2]],
                    total: 100,
                    totalToday: 3
                }
            }
        )).toEqual({
            wsConnected: true,
            orders: [orders[0], orders[1], orders[2]],
            orderBoard: {
                done: [10000, 10001, 10002],
                pending: []
            },
            total: 100,
            totalToday: 3
        })
    })
})