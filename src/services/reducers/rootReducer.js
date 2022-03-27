import { combineReducers } from 'redux';
import { appReducer } from './index';
import { useReducer } from 'react';

export const rootReducer = combineReducers({
  app: appReducer,
  //user: useReducer,
});