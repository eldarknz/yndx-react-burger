import cn from "classnames";

import { Link, useRouteMatch } from 'react-router-dom';
import { Container, Row, Col } from "../ui/Grid/Grid";

import { Nav, NavItem } from "../ui/Nav/Nav";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FancyLink from "../ui/Link/Link";

import styles from "./AppHeader.module.css";

const AppHeader = () => {
    return (
        <header className={cn(styles.header, "pt-4 pb-4")}>
            <Container>
                <Row>
                    <Col col="4">
                        <Nav>
                            <NavItem>
                                <FancyLink href={'/'} isExact={true}>
                                    <div className={styles.icon}>
                                        <BurgerIcon type="primary" />
                                    </div>
                                    <div className={cn("text", "text_type_main-default", styles.name)}>Конструктор</div>
                                </FancyLink>
                            </NavItem>
                            <NavItem>
                                <FancyLink href={'/orders'} isExact={true}>
                                    <div className={styles.icon}>
                                        <ListIcon type="primary" />
                                    </div>
                                    <div className={cn("text", "text_type_main-default", styles.name)}>Лента заказов</div>
                                </FancyLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col col="4">
                        <div className={cn(styles.logo, "justifyContentCenter")}>
                            <Link to={'/'}>
                                <Logo />
                            </Link>
                        </div>
                    </Col>
                    <Col col="4">
                        <Nav className="justifyContentEnd">
                            <NavItem>
                                <FancyLink href={'/profile'}>
                                <div className={styles.icon}>
                                        <ProfileIcon type="primary" />
                                    </div>
                                    <div className={cn("text", "text_type_main-default", styles.name)}>Личный кабинет</div>
                                </FancyLink>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};

export default AppHeader