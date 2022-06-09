import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "../types";

// Typing useSelector hook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Typing useDispatch hook
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

