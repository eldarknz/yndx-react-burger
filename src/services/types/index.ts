import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from "redux-thunk";

import { TBurgerActions } from "../actions/burger";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TWSFeedActions } from "../actions/wsFeed";
import { TWSProfileOrdersActions } from "../actions/wsProfileOrders";

import store from "../store";

export type RootState = ReturnType<typeof store.getState>;

// Typing of all application actions
type TApplicationActions =
    | TBurgerActions
    | TOrderActions
    | TUserActions
    | TWSFeedActions;
    //| TWSProfileOrdersActions;

// Typing thunks in our application
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Dispatch method typing for validation of sent action
export type AppDispatch = Dispatch<TApplicationActions>; 
// Or the equivalent
// export type AppDispatch = typeof store.dispatch;