import cn from "classnames";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from 'react-dnd';

import PropTypes from "prop-types";

import { Container, Row } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import BurgerConstructorItem from "./BurgerConstructorItem";

import { ADD_INGREDIENT, DELETE_INGREDIENT, ADD_BUN } from "services/actions";

import { isEmpty } from "utils/utils";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);

    const burgerIngredients = useSelector(store => store.app.burgerIngredients);
    const burgerBun         = useSelector(store => store.app.burgerBun);

    const totalPrice = burgerIngredients.reduce((acc, item) => acc + item.price, 0) + (!isEmpty(burgerBun) ? burgerBun.price * 2 : 0);

    const addIngredient = ( ingredient ) => {
        dispatch({ type: ADD_INGREDIENT, ingredient });
    }

    const deleteIngredient = ( index, ingredient ) => {
        dispatch({ type: DELETE_INGREDIENT, index, ingredient });
    };

    const addBun = ( ingredient ) => {
        if (ingredient._id !== burgerBun._id)
            dispatch({ type: ADD_BUN, ingredient });
    };

    const handleOpenModal = (e) => {
        setModalVisible(true);
    };
    
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
          isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.type === 'bun') {
                addBun(item)
            } else {
                addIngredient(item);
            }
        },
    });

    const Bun = ({ type, item }) => {
        return (
            <Row align="center">
                <div className={styles.block}>
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={`${item.name} (верх)`}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </div>
            </Row>
        );
    };

    const content = useMemo(
        () => {
            return (
                burgerIngredients.map((ingredient, index) => ingredient.type !== 'bun' && (
                    <BurgerConstructorItem key={index} index={index} ingredient={ingredient} deleteIngredient={deleteIngredient}/>
                ))
            );
        },
        [burgerIngredients]
    );
    
    return (
        <>
            <section className={styles.section}>
                <Container fluid={true}>

                    {
                        <div 
                            className={cn(styles.ingredientsBlock,
                                "mt-25 ml-4",
                                {
                                    [styles.onHover]: isHover
                                }
                            )}
                            ref={dropTarget}
                        >
                            {/* isEmpty(burgerBun) && burgerIngredients.length === 0 && (
                                <p className="text text_type_main-default pb-3">Добавьте ингредиенты</p>
                            )*/}
                            { !isEmpty(burgerBun) && <Bun type={'top'} item={burgerBun} /> }
                            <div className={styles.blockList}>
                                {content}
                            </div>
                            { !isEmpty(burgerBun) && <Bun type={'bottom'} item={burgerBun} />}
                        </div>
                    }
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