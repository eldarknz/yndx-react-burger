import React from "react";

import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({
    onClick
}) => {

    return (
        <div
            className={styles.container}
            onClick={onClick}
        ></div>
    );
};

export default ModalOverlay;
