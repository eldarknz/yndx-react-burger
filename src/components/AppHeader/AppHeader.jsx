import cn from "classnames";

import React from 'react';

import styles from "./AppHeader.module.css";

import { Container, Row, Col } from "../ui/Grid/Grid";

import { Nav, NavItem } from "../ui/Nav/Nav";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Link from "../ui/Link/Link";

const AppHeader = () => {
    return (
        <header className={cn(styles.header, "pt-4 pb-4")}>
            <Container>
                <Row>
                    <Col col="4">
                        <Nav>
                            <NavItem
                                isActive={true}
                            >
                                <Link isActive={true}>
                                    <div className={styles.icon}>
                                        <BurgerIcon type="primary" />
                                    </div>
                                    <div className={cn("text", "text_type_main-default", styles.name)}>Конструктор</div>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href={'/'}>
                                    <div className={styles.icon}>
                                        <ListIcon type="primary" />
                                    </div>
                                    <div className={cn("text", "text_type_main-default", styles.name)}>Лента заказов</div>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col col="4">
                        <div className={cn(styles.logo, "justifyContentCenter")}>
                            <Logo />
                        </div>
                    </Col>
                    <Col col="4">
                        <Nav className="justifyContentEnd">
                            <NavItem>
                                <Link href={'/'}>
                                <div className={styles.icon}>
                                        <ProfileIcon type="primary" />
                                    </div>
                                    <div className={cn("text", "text_type_main-default", styles.name)}>Личный кабинет</div>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default AppHeader