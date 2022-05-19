import cn from "classnames";

import { FC } from "react";

import styles from "./Grid.module.css";

interface IContainerProps {
    fluid?: boolean
    className?: string;
};

interface IColProps {
    col?: string;
    className?: string;
};

interface IRowProps {
    justifyContent?: string;
    alignItems?: string;
    className?: string;
};

export const Container: FC<IContainerProps>= ({
    children,
    fluid,
    className
}) => {

    const containerClassName = cn(
        {
            [styles.container]: !fluid,
            [styles.containerFluid]: fluid
        },
        className
    )
    return (
        <div className={containerClassName}>
            {children}
        </div>
    );
};

export const Row: FC<IRowProps> = ({
    children,
    justifyContent,
    alignItems,
    className
}) => {
    
    const rowClassName = cn(styles.row,
        {
            [styles.justifyContentFlexStart]: justifyContent === 'flex-start',
            [styles.justifyContentFlexEnd]: justifyContent === 'flex-end',
            [styles.justifyContentCenter]: justifyContent === 'center',
            [styles.justifyContentSpaceBetween]: justifyContent === 'space-between',
            [styles.justifyContentSpaceAround]: justifyContent === 'space-around',
            [styles.justifyContentSpaceEvenly]: justifyContent === 'space-evenly',
        },
        {
            [styles.alignItemsFlexStart]: alignItems === 'flex-start',
            [styles.alignItemsFlexEnd]: alignItems === 'flex-end',
            [styles.alignItemsCenter]: alignItems === 'center',
            [styles.alignItemsBaseline]: alignItems === 'baseline',
            [styles.alignItemsStretch]: alignItems === 'stretch',
        },
        className
    );

    return (
        <div className={rowClassName}>
            {children}
        </div>
    );
};

export const Col: FC<IColProps> = ({
    children,
    col,
    className
}) => {

    const colClassName = cn(styles.col,
        {
            [styles.colAuto]: col === 'auto',
            [styles.col2]: col === '2',
            [styles.col3]: col === '3',
            [styles.col4]: col === '4',
            [styles.col5]: col === '5',
            [styles.col6]: col === '6',
            [styles.col7]: col === '7',
            [styles.col8]: col === '8',
            [styles.col9]: col === '9',
            [styles.col10]: col === '10',
            [styles.col12]: col === '12',
        },
        className
    );

    return (
        <div className={colClassName}>
            {children}
        </div> 
    );
};