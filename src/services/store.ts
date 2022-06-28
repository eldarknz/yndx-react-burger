import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../services/reducers';
import { socketMiddleware, wsActions } from "../services/middleware"

import { WS_FEED_URL, WS_PROFILE_ORDERS_URL } from "../utils/constants";

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
} from "./constants/ws";

/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;*/

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsFeedActions: wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsProfileOrders: wsActions = {
  wsInit: WS_PROFILE_CONNECTION_START,
  onOpen: WS_PROFILE_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_CONNECTION_CLOSED,
  onError: WS_PROFILE_CONNECTION_ERROR,
  onMessage: WS_PROFILE_GET_MESSAGE
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(WS_FEED_URL, wsFeedActions),
    socketMiddleware(WS_PROFILE_ORDERS_URL, wsProfileOrders, true)
  )
);

const store = createStore(rootReducer, enhancer);

export default store;