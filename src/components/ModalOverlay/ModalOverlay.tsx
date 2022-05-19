import React from "react";

import styles from "./ModalOverlay.module.css";

interface IModalOverlatProps {
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const ModalOverlay = ({
    onClick
}: IModalOverlatProps) => {

    return (
        <div
            className={styles.container}
            onClick={onClick}
        ></div>
    );
};

export default ModalOverlay;
