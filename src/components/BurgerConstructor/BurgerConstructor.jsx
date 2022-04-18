import cn from "classnames";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from "../../utils/constants";
import PropTypes from 'prop-types';

import { Container, Row } from "../ui/Grid/Grid";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import BurgerConstructorItem from "./BurgerConstructorItem";

import { ingredientType } from "../../utils/types";
import { checkAccessToken, isEmpty } from "../../utils/utils";

import { getOrderNumber } from "../../services/actions/order";
import { addIngredient, addBun } from "../../services/actions";

import styles from "./BurgerConstructor.module.css";

const Bun = (props) => {
    return (
        <Row align="center">
            <div className={styles.block}>
                <ConstructorElement
                    type={props.type}
                    isLocked={true}
                    text={`${props.ingredient.name} ${props.type === 'bottom' ? '(низ)' : '(верх)'}`}
                    price={props.ingredient.price}
                    thumbnail={props.ingredient.image}
                />
            </div>
        </Row>
    );
};

Bun.propTypes = {
    type: PropTypes.string.isRequired,
    ingredient: ingredientType.isRequired,
};

const BurgerConstructor = () => {

    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(store => store.user);
    const { burgerIngredients, burgerBun } = useSelector(store => store.app);

    const history = useHistory();
    const location = useLocation();

    const [modalVisible, setModalVisible] = useState(false);

    const totalPrice = burgerIngredients.reduce((acc, item) => acc + item.price, 0) + (!isEmpty(burgerBun) ? burgerBun.price * 2 : 0);

    const handleOpenModal = () => setModalVisible(true);
    
    const handleCloseModal = () => setModalVisible(false);

    const handleOrderSubmit = () => {
        if (isLoggedIn && checkAccessToken()) {
            if (!isEmpty(burgerBun) && burgerIngredients.length > 0) {
                const order = burgerIngredients.concat([burgerBun]).map(ingredient => ingredient._id);
                dispatch(getOrderNumber(order));
                handleOpenModal();
            }
        } else {
            history.push({
                pathname: ROUTES.login.path,
                search: '?redirectUrl=' + location.pathname
            });
        }
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
          isHover: monitor.isOver()
        }),
        drop(item) {
            if (item.type === 'bun') {
                if (item._id !== burgerBun._id) dispatch(addBun(item));
            } else {
                dispatch(addIngredient(item));
            }
        },
    });

    const content = () => {
        return (
            burgerIngredients.map((ingredient, index) => ingredient.type !== 'bun' && (
                <BurgerConstructorItem key={ingredient.uuid} index={index} ingredient={ingredient}/>
            ))
        );
    };
    
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
                            {isEmpty(burgerBun) && burgerIngredients.length === 0 && (
                                <p className="text text_type_main-default pt-4 pr-10 pb-4 pl-10">Добавьте ингредиенты</p>
                            )}
                            { !isEmpty(burgerBun) && <Bun type={'top'} ingredient={burgerBun} /> }
                            <div className={styles.blockList}>
                                {content()}
                            </div>
                            { !isEmpty(burgerBun) && <Bun type={'bottom'} ingredient={burgerBun} />}
                        </div>
                    }
                    <Row alignItems="center" justifyContent="flex-end" className={cn(styles.priceBlock, "pt-10")}>
                        <div className={"text text_type_digits-medium mr-2"}>
                            {totalPrice}
                        </div>
                        <div className={cn(styles.iconLarge, "pr-10")}>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleOrderSubmit}
                        >
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

export default BurgerConstructor