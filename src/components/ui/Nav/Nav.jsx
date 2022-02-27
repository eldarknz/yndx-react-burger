import cn from "classnames";

import React from "react";
import PropTypes from 'prop-types';

import styles from "./Nav.module.css";

export const NavItem = ({ children, isActive, className }) => {
    
    const navItemClassName = cn(styles.navItem,
        {
            [styles.isActive]: isActive
        },
        className
    );

    return (
        <div className={navItemClassName}>
            {children}
        </div>
    );
};

export const Nav = ({ children, className }) => {

    const navClassName = cn(styles.nav,
        className
    );

    return (
        <div className={navClassName}>
            {children}
        </div>
    );
};

NavItem.propTypes = {
    children: PropTypes.any.isRequired,
    isActive: PropTypes.bool,
    className: PropTypes.string
};

export function childrenOf(...types) {
    let childType = PropTypes.shape({
        type: PropTypes.oneOf(types),
    });

    return PropTypes.oneOfType([
        childType,
        PropTypes.arrayOf(childType),
    ]);
}

Nav.propTypes = {
    children: childrenOf(NavItem).isRequired,
    className: PropTypes.string
};