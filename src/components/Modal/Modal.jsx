import cn from "classnames";

import React, { useEffect } from "react";
import ReactDOM from 'react-dom'

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from 'prop-types';

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({
    header = "",
    onClose,
    children,
    closeByOverlay = true
}) => {

    useEffect(() => {
        const keyDownHandler = (e) => {
            e.preventDefault();
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [onClose]);

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
                <CloseIcon type="primary" />
            </div>
            <section className={cn(styles.content)}>
                {children}
            </section>
            </div>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    closeByOverlay: PropTypes.bool
};

export default Modal;
