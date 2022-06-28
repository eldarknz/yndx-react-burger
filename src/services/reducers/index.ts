import { combineReducers } from 'redux';
import { appReducer } from './burger';
import { orderReducer } from './order';
import { userReducer } from './user';
import { feedReducer } from './wsFeed';
import { profileOrdersReducer } from './wsProfileOrders';

export const rootReducer = combineReducers({
  burger: appReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
});