import cn from "classnames";

import { FC } from "react";

import styles from "./Nav.module.css";

interface INavItemProps {
    isActive?: boolean;
    className?: string;
}

interface INavProps {
    children: INavItemProps;
    className?: string;
    direction?: string;
};

export const NavItem: FC<INavItemProps> = ({
    children,
    isActive,
    className
}) => {
    
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

export const Nav: FC<INavProps> = ({
    children,
    className,
    direction
}) => {

    const navClassName = cn(styles.nav,
        {
            [styles.vertical]: direction === 'vertical',
        },
        className
    );

    return (
        <nav className={navClassName}>
            {children}
        </nav>
    );
};