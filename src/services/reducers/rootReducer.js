import { combineReducers } from 'redux';
import { appReducer } from './index';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
  user: userReducer,
});