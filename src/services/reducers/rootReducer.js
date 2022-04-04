import { combineReducers } from 'redux';
import { appReducer } from './index';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});