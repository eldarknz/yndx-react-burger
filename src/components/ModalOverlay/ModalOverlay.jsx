import React from "react";

import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({
    onClick
}) => {

    const overlayRef = React.useRef(null);

    return (
        <div
            className={styles.container}
            onClick={onClick}
            ref={overlayRef}
        ></div>
    );
};

export default ModalOverlay;
