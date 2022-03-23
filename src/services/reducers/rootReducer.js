import { combineReducers } from 'redux';
import { appReducer } from './index';

export const rootReducer = combineReducers({
  app: appReducer,
});