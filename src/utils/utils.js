import PropTypes from "prop-types";

export function childrenOf(...types) {
    const childType = PropTypes.shape({
        type: PropTypes.oneOf(types),
    });

    return PropTypes.oneOfType([
        childType,
        PropTypes.arrayOf(childType),
    ]);
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
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
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};