import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";
import { ApiToken } from "../api/ApiToken";

export function childrenOf(...types) {
    const childType = PropTypes.shape({
        type: PropTypes.oneOf(types),
    });

    return PropTypes.oneOfType([
        childType,
        PropTypes.arrayOf(childType),
    ]);
}

// check object is empty
export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

// parse query
/**
 * if "search" in location return search value
 * 
 * <Redirect to={{ pathname: '/path', search: '?searchValue=' + location.pathname }} />
 * 
 * const query = useQuery();
 * const searchValue = query.get("searchValue");
 */
export const useQuery = () => {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
}

// convert object to string and store in localStorage
export const saveToLocalStorage = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (error) {
        console.warn(error);
    }
}
  
// load string from localStarage and convert into an Object
// invalid output must be undefined
export const loadFromLocalStorage = () => {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (error) {
        console.warn(error);
        return undefined;
    }
}

// validate an email address
export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
    );
};

// Check token expire
export const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime();
    return Math.floor(currentTime) >= decodedToken.exp;
}

// Check access token
export const checkAccessToken = () => {
    const accessToken = ApiToken.getAccessToken();
    if (accessToken) {
        const decodedToken = jwt_decode(accessToken);
        const currentTime = new Date().getTime();
        if (decodedToken.exp * 1000 < currentTime) {
            return false;
        }
    }
    return accessToken ? true : false;
}