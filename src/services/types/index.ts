import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from 'redux';
import store from "../store";
import { TBurgerActions } from "../actions/burger";
import { TOrderActions } from "services/actions/order";
import { TUserActions } from "services/actions/user";

export type RootState = ReturnType<typeof store.getState>;

// Typing of all application actions
type TApplicationActions = TBurgerActions | TOrderActions | TUserActions;

// Typing thunks in our application
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Dispatch method typing for validation of sent action
export type AppDispatch = Dispatch<TApplicationActions>; 
// Or the equivalent
// export type AppDispatch = typeof store.dispatch;