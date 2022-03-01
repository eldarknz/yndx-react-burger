import cn from "classnames";

import React, { useState } from "react";
import PropTypes from "prop-types";

import { Container } from "../ui/Grid/Grid";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import Modal from "../Modal/Modal";

import { ingredientType } from "../IngredientDetails/IngredientDetails";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = ({ data }) => {

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const burgerIngredientCategories = {
        bun: { title: "Булки", items: [] },
        main: { title: "Начинки", items: [] },
        sauce: { title: "Соусы", items: [] }
    };

    data.forEach((item, i) => (
        burgerIngredientCategories[item.type].items.push(item)
    ));

    const [current, setCurrent] = React.useState("bun");

    const handleOpenModal = (item) => {
        setCurrentIngredient(item);
    }
    
    const handleCloseModal = () => {
        setCurrentIngredient(null);
    }

    return (
        <>
            <section className={styles.section}>
                <Container fluid={true}>
                    <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
                    <div className="pt-5" style={{ display: "flex" }}>
                        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                            Булки
                        </Tab>
                        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
                            Соусы
                        </Tab>
                        <Tab value="main" active={current === "main"} onClick={setCurrent}>
                            Начинки
                        </Tab>
                    </div>
                    <div className={cn(styles.blockList, "mt-10")}>
                        {
                            Object.keys(burgerIngredientCategories).map((key, index) => (
                                <section key={index} className={styles.block}>
                                    <h3 className={cn(styles.title, "text text_type_main-medium mb-6")}>{burgerIngredientCategories[key].title}</h3>
                                    {burgerIngredientCategories[key].items.length !== 0 && <div className={cn(styles.cardGroup, "mb-2")}>
                                        {burgerIngredientCategories[key].items.map((item, index) => (

                                            <div
                                                key={item._id}
                                                className={cn(styles.card, "ml-4 mr-2 mb-8")}
                                                onClick={() => handleOpenModal(item)}
                                            >
                                                <div className={styles.counter}>
                                                    <Counter count={1} size="default" />
                                                </div>
                                                <div className={styles.сardImage}>
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className={styles.cardBody}>
                                                    <div className={cn(styles.cardTitle, "text text_type_digits-default", "pt-1 pb-1")}>
                                                        {item.price}
                                                        <div className={styles.icon}>
                                                            <CurrencyIcon tpe="primary" />
                                                        </div>
                                                    </div>
                                                    <div className={cn(styles.cardText, "text text_type_main-default")}>{item.name}</div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>}
                                </section>
                            ))
                        }
                    </div>
                </Container>
            </section>

            {currentIngredient && (
                <Modal
                    header="Детали ингредиента"
                    onClose={handleCloseModal}
                >
                    <IngredientDetails {...currentIngredient} />
                </Modal>
            )}
        </>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerIngredients