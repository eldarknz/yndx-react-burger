import cn from "classnames";

import React from "react";
import ReactDOM from 'react-dom'

import styles from "./Modal.module.css";

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { Icon } from "../ui/Icon/Icon";

const modalRoot = document.getElementById("modal-root");

const Modal = ({
    header = "",
    onClose,
    children,
    closeByOverlay = true
}) => {

    return ReactDOM.createPortal(
        <>
            <ModalOverlay
                onClick={closeByOverlay ? onClose : undefined}
            />
            <div
                className={styles.container}
            >
            <div className={cn(styles.title)}>
                <h1 className="text text_type_main-large">{header}</h1>
            </div>
            <div className={styles.closeButton} onClick={onClose}>
                <Icon name="close" />
            </div>
            <section className={cn(styles.content)}>
                {children}
            </section>
            </div>
        </>,
        modalRoot
    );
};

export default Modal;
