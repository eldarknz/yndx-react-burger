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