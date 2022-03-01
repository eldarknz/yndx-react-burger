import cn from "classnames";

import React from "react";
import PropTypes from 'prop-types';

import { childrenOf } from "../../../utils/utils";

import styles from "./Nav.module.css";

export const NavItem = ({ children, isActive, className }) => {
    
    const navItemClassName = cn(styles.navItem,
        {
            [styles.isActive]: isActive
        },
        className
    );

    return (
        <li className={navItemClassName}>
            {children}
        </li>
    );
};

export const Nav = ({ children, className }) => {

    const navClassName = cn(styles.nav,
        className
    );

    return (
        <nav className={navClassName}>
            {children}
        </nav>
    );
};

NavItem.propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    className: PropTypes.string
};

Nav.propTypes = {
    children: childrenOf(NavItem).isRequired,
    className: PropTypes.string
};