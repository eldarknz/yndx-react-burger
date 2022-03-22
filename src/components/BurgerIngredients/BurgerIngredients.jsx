import cn from "classnames";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Container } from "../ui/Grid/Grid";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../IngredientDetails/IngredientDetails";

import Modal from "../Modal/Modal";

import BurgerIngredientsItem from "./BurgerIngredientsItem";

import { TAB_SWITCH } from "services/actions";

import styles from "./BurgerIngredients.module.css";

const ingredientCategories = [
    { _id: 0, type: "bun", title: "Булки" },
    { _id: 1, type: "sauce", title: "Соусы" },
    { _id: 2, type: "main", title: "Начинки" }
];

const BurgerIngredients = () => {

    const dispatch = useDispatch();

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.app);

    const currentTab = useSelector(store => store.app.currentTab);

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const switchTab = (clickedTab) => {
        dispatch({ type: TAB_SWITCH, clickedTab });
    };

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
                        {
                            ingredientCategories.map((category, index) => (
                                <Tab key={index} value={category.type} active={currentTab === category.type} onClick={() => switchTab(category.type)}>
                                    {category.title}
                                </Tab>
                            ))
                        }
                    </div>
                    <div className={cn(styles.blockList, "mt-10")}>
                        { ingredientsFailed && <p className="text text_type_main-default pb-3">Произошла ошибка при получении данных</p> }
                        { ingredientsRequest && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                        {
                            !ingredientsFailed && !ingredientsRequest && ingredientCategories.map((category, index) => (
                                <section key={index} className={styles.block}>
                                    <h3 className={cn(styles.title, "text text_type_main-medium mb-6")}>{category.title}</h3>
                                    <div className={cn(styles.cardGroup, "mb-2")}>
                                        {
                                            ingredients.filter(item => item.type === category.type).map(ingredient => (
                                                <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} openModal={handleOpenModal}/>
                                            ))
                                        }
                                    </div>
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

//BurgerIngredients.propTypes = {
//    data: PropTypes.arrayOf(ingredientType).isRequired
//}

export default BurgerIngredients