import cn from "classnames";

import React from "react";
import PropTypes from 'prop-types';

import styles from "./Link.module.css";

const Link = ({ href, isActive, children, className, onClick }) => {

    const linkClassName = cn(styles.link,
        {
            [styles.isActive]: isActive
        },
        className
    );

    if (!href) {
        return (
            <div className={linkClassName} onClick={onClick}>
                {children}
            </div>
        )
    }

    return (
        <a href={href} className={linkClassName}>
            {children}
        </a>
    );
};

Link.propTypes = {
    href: PropTypes.string,
    isActive: PropTypes.bool,
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Link