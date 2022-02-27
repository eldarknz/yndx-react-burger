import cn from "classnames";

import React from "react";

import { Container, Row, Col } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Icon } from "../ui/Icon/Icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
    return (
        <section className={styles.section}>
            <Container fluid={true}>
                <div className="pt-25 ml-4" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Row className="alignItemsCenter">
                        <div className={styles.block}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text="Краторная булка N-200i (верх)"
                                price={200}
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                            />
                        </div>
                    </Row>
                    <div className={styles.blockList}>
                        <Row align="center">
                            <div className={styles.block}>
                                <div className={styles.blokcIcon}>
                                    <Icon name="drag" />
                                </div>
                                <ConstructorElement
                                    text="Краторная булка N-200i (верх)"
                                    price={50}
                                    thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                                />
                            </div>
                        </Row>
                        <Row align="center">
                            <div className={styles.block}>
                                <div className={styles.blokcIcon}>
                                    <Icon name="drag" />
                                </div>
                                <ConstructorElement
                                    text="Краторная булка N-200i (верх)"
                                    price={50}
                                    thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                                />
                            </div>
                        </Row>
                        <Row align="center">
                            <div className={styles.block}>
                                <div className={styles.blokcIcon}>
                                    <Icon name="drag" />
                                </div>
                                <ConstructorElement
                                    text="Краторная булка N-200i (верх)"
                                    price={50}
                                    thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                                />
                            </div>
                        </Row>
                        <Row align="center">
                            <div className={styles.block}>
                                <div className={styles.blokcIcon}>
                                    <Icon name="drag" />
                                </div>
                                <ConstructorElement
                                    text="Краторная булка N-200i (верх)"
                                    price={50}
                                    thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                                />
                            </div>
                        </Row>
                        <Row align="center">
                            <div className={styles.block}>
                                <div className={styles.blokcIcon}>
                                    <Icon name="drag" />
                                </div>
                                <ConstructorElement
                                    text="Краторная булка N-200i (верх)"
                                    price={50}
                                    thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                                />
                            </div>
                        </Row>
                        <Row align="center">
                            <div className={styles.block}>
                                <div className={styles.blokcIcon}>
                                    <Icon name="drag" />
                                </div>
                                <ConstructorElement
                                    text="Краторная булка N-200i (верх)"
                                    price={50}
                                    thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                                />
                            </div>
                        </Row>
                    </div>
                    <Row align="center">
                        <div className={styles.block}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text="Краторная булка N-200i (низ)"
                                price={200}
                                thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                            />
                        </div>
                    </Row>
                </div>
                <Row alignItems="center" justifyContent="flex-end" className="pt-10 pb-9">
                    <div className={"text text_type_digits-medium mr-2"}>600</div>
                    <div className={cn(styles.iconLarge, "pr-10")}>
                        <Icon name="currency" />
                    </div>
                    <Button type="primary" size="large">
                        Нажми на меня
                    </Button>
                </Row>
            </Container>
        </section>
    );
};

export default BurgerConstructor