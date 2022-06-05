import { combineReducers } from 'redux';
import { appReducer } from './index';
import { orderReducer } from './order';
import { userReducer } from './user';
//import { feedReducer } from './feed';
//import { profileFeedReducer } from './profileFeed';

export const rootReducer = combineReducers({
  app: appReducer,
  order: orderReducer,
  user: userReducer,
  //feed: feedReducer,
  //profileFeed: profileFeedReducer
});