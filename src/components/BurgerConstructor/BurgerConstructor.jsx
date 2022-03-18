import cn from "classnames";

import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import { Container, Row } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import { DELETE_INGREDIENT } from "services/actions";

import { useDispatch, useSelector } from "react-redux";

import { useDrag } from 'react-dnd';

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const ingredients = useSelector(store => store.app.burgerIngredients);
    const currentBun = useSelector(store => store.app.burgerBun);

    const totalPrice = ingredients.reduce((acc, item) => acc + item.price, 0) + (currentBun.price * 2);

    const onDelete = (_id) => {
        dispatch({ type: DELETE_INGREDIENT, _id });
    };

    const handleOpenModal = (e) => {
        setModalVisible(true);
    };
    
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const bun = (type) => {
        return (
            <Row align="center">
                <div className={styles.block}>
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={`${currentBun.name} (верх)`}
                        price={currentBun.price}
                        thumbnail={currentBun.image}
                    />
                </div>
            </Row>
        );
    };

    const content = useMemo(
        () => {
            return (
                ingredients.map((item) => (
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
                                    handleClose={() => onDelete(item._id)}
                                />
                            </div>
                        </div>
                    </Row>
                ))
            );
        },
        [ingredients]
    );

    return (
        <>
            <section className={styles.section}>
                <Container fluid={true}>
                    {<div className={cn(styles.ingredientsBlock, "pt-25 ml-4")}>
                        {currentBun && bun('top')}
                        <div className={styles.blockList}>
                            {content}
                        </div>
                        {currentBun && bun('bottom')}
                    </div>}
                    <Row alignItems="center" justifyContent="flex-end" className={cn(styles.priceBlock, "pt-10")}>
                        <div className={"text text_type_digits-medium mr-2"}>
                            {totalPrice}
                        </div>
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

//BurgerConstructor.propTypes = {
//    data: PropTypes.arrayOf(ingredientType).isRequired
//}

export default BurgerConstructor