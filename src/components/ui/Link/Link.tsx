import cn from "classnames";

import React, { FC } from "react";

import { Link, useRouteMatch } from 'react-router-dom';

import styles from "./Link.module.css";

interface IFancyLinkProps {
    href?: string;
    isActive?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    isExact?: boolean;
}

const FancyLink: FC<IFancyLinkProps> = ({
    href,
    isActive,
    children,
    className,
    onClick,
    isExact = false
}) => {

    /*const match = useRouteMatch({
        path: href,
        exact: isExact
    });*/

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
                    [styles.isActive]: useRouteMatch({ path: href, exact: isExact })
                },
            )}
        >
            {children}
        </Link>
    );
};

export default FancyLink