import cn from "classnames";

import React from "react";

import { Container, Row } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Icon } from "../ui/Icon/Icon";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDeatils from "../OrderDetails/OrderDetails";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ data }) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const handleOpenModal = (e) => {
        console.log('Open');
        setModalVisible(true);
    }
    
    const handleCloseModal = () => {
        console.log('Close');
        setModalVisible(false);
    }

    return (
        <>
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
                            {data && data.map((item, index) => (

                                <Row key={item._id} align="center">
                                    <div className={styles.block}>
                                        <div className={styles.blokcIcon}>
                                            <Icon name="drag" />
                                        </div>
                                        <div className={styles.constructorElementFull}>
                                            <ConstructorElement
                                                text={item.name}
                                                price={item.price}
                                                thumbnail={item.image}
                                            />
                                        </div>
                                    </div>
                                </Row>

                            ))}
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
                        <Button type="primary" size="large" onClick={handleOpenModal}>
                            Нажми на меня
                        </Button>
                    </Row>
                </Container>
            </section>

            {modalVisible && (
                <Modal
                    header=""
                    onClose={handleCloseModal}
                >
                    <OrderDeatils />
                </Modal>
            )}
        </>
    );
};

export default BurgerConstructor