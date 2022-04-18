import cn from "classnames";

import React from "react";
import PropTypes from 'prop-types';

import { Link, useRouteMatch } from 'react-router-dom';

import styles from "./Link.module.css";

const FancyLink = ({ href, isActive, children, className, onClick, isExact = false}) => {

    const match = useRouteMatch({
        path: href,
        exact: isExact
    });

    const linkClassName = cn(styles.link,
        className
    );

    if (!href) {
        return (
            <div
                className={cn(linkClassName,
                    {
                        [styles.isActive]: isActive
                    }
                )}
                onClick={onClick}
            >
                {children}
            </div>
        )
    }

    return (
        <Link
            to={href}
            className={cn(linkClassName,
                {
                    [styles.isActive]: match
                },
            )}
        >
            {children}
        </Link>
    );
};

FancyLink.propTypes = {
    href: PropTypes.string,
    isActive: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    isExact: PropTypes.bool,
};

export default FancyLink