import cn from "classnames";

import React from "react";
import PropTypes from "prop-types";

import { Container, Row } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import { ingredientType } from "../IngredientDetails/IngredientDetails";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ data }) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const bun = data.find(ingredient => {
        return ingredient.type === 'bun'
    })

    const handleOpenModal = (e) => {
        setModalVisible(true);
    }
    
    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <>
            <section className={styles.section}>
                <Container fluid={true}>
                    {<div className={cn(styles.ingredientsBlock, "pt-25 ml-4")}>
                        {bun && (
                            <Row align="center">
                                <div className={styles.block}>
                                    <ConstructorElement
                                        type="top"
                                        isLocked={true}
                                        text={`${bun.name} (верх)`}
                                        price={bun.price}
                                        thumbnail={bun.image}
                                    />
                                </div>
                            </Row>
                        )}
                        <div className={styles.blockList}>
                            {data && data.map((item) => (

                                <Row key={item._id} align="center">
                                    <div className={styles.block}>
                                        <div className={styles.blokcIcon}>
                                            <DragIcon type="primary" />
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
                        {bun && (
                            <Row align="center">
                                <div className={styles.block}>
                                    <ConstructorElement
                                        type="bottom"
                                        isLocked={true}
                                        text={`${bun.name} (низ)`}
                                        price={bun.price}
                                        thumbnail={bun.image}
                                    />
                                </div>
                            </Row>
                        )}
                    </div>}
                    <Row alignItems="center" justifyContent="flex-end" className={cn(styles.priceBlock, "pt-10")}>
                        <div className={"text text_type_digits-medium mr-2"}>600</div>
                        <div className={cn(styles.iconLarge, "pr-10")}>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button type="primary" size="large" onClick={handleOpenModal}>
                            Оформить заказ
                        </Button>
                    </Row>
                </Container>
            </section>

            {modalVisible && (
                <Modal
                    header=""
                    onClose={handleCloseModal}
                >
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
};

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerConstructor