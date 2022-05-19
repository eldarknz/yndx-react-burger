import cn from "classnames";

import React, { FC, useEffect } from "react";
import ReactDOM from 'react-dom'

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root") as HTMLElement;

interface IModalProps {
    header?: string;
    onClose: () => void | undefined; 
    closeByOverlay?: boolean
};

const Modal: FC<IModalProps> = ({
    header = "",
    onClose,
    children,
    closeByOverlay = true
}) => {

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
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

export default Modal
