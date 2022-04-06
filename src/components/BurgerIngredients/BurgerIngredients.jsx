import cn from "classnames";

import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Container } from "../ui/Grid/Grid";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../IngredientDetails/IngredientDetails";

import Modal from "../Modal/Modal";

import BurgerIngredientsItem from "./BurgerIngredientsItem";

import { TAB_SWITCH, GET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from "services/actions";

import { INGREDIENT_CATEGORIES } from "utils/constants";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {

    const dispatch = useDispatch();

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.app);

    const currentTab = useSelector(store => store.app.currentTab);

    const [modalVisible, setModalVisible] = useState(false);

    const ingredientsSection = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    const handleSwitchTab = (selectedtTab) => {
        dispatch({ type: TAB_SWITCH, selectedtTab });
    };

    const handleOpenModal = (ingredient) => {
        dispatch({ type: GET_INGREDIENT_DETAILS, ingredient });
        setModalVisible(true);
    }
    
    const handleCloseModal = () => {
        setModalVisible(false);
        dispatch({ type: DELETE_INGREDIENT_DETAILS });
    }

    const handleScroll = () => {
        const ingredientsTop = ingredientsSection.current.getBoundingClientRect().top;
        const bunHeaderTop = bunRef.current.getBoundingClientRect().top;
        const sauceHeaderTop = sauceRef.current.getBoundingClientRect().top;
        const mainHeaderTop = mainRef.current.getBoundingClientRect().top;

        if (bunHeaderTop <= ingredientsTop) handleSwitchTab('bun');
        if (sauceHeaderTop <= ingredientsTop) handleSwitchTab('sauce');
        if (mainHeaderTop <= ingredientsTop) handleSwitchTab('main');
    };

    return (
        <>
            <section className={styles.section}>
                <Container fluid={true}>
                    <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>
                    <div className="pt-5" style={{ display: "flex" }}>
                        {
                            INGREDIENT_CATEGORIES.map((category) => (
                                <Tab
                                    key={category._id}
                                    value={category.type}
                                    active={currentTab === category.type}
                                    onClick={() => {
                                        handleSwitchTab(category.type);
                                        if (category.type === 'bun' && bunRef.current) bunRef.current.scrollIntoView();
                                        if (category.type === 'sauce' && sauceRef.current) sauceRef.current.scrollIntoView();
                                        if (category.type === 'main' && mainRef.current) mainRef.current.scrollIntoView();
                                    }}
                                >
                                    {category.title}
                                </Tab>
                            ))
                        }
                    </div>
                    <div
                        className={cn(styles.blockList, "mt-10")}
                        ref={ingredientsSection}
                        onScroll={handleScroll}
                    >
                        { ingredientsFailed && <p className="text text_type_main-default pb-3">Произошла ошибка при получении данных</p> }
                        { ingredientsRequest && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                        {
                            !ingredientsFailed && !ingredientsRequest && ingredients && (
                                INGREDIENT_CATEGORIES.map((category) => (
                                <section key={category._id} className={styles.block}>
                                    <h3
                                        className={cn(styles.title, "text text_type_main-medium mb-6")}
                                        ref={category.type === 'bun' ? bunRef : category.type === 'sauce' ? sauceRef : mainRef}
                                    >
                                        {category.title}
                                    </h3>
                                    <div className={cn(styles.cardGroup, "mb-2")}>
                                        {
                                            ingredients.filter(item => item.type === category.type).map(ingredient => (
                                                <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} callback={handleOpenModal}/>
                                            ))
                                        }
                                    </div>
                                </section>
                            )))
                        }
                    </div>
                </Container>
            </section>

            {modalVisible && (
                <Modal
                    header="Детали ингредиента"
                    onClose={handleCloseModal}
                >
                    <IngredientDetails />
                </Modal>
            )}
        </>
    );
};

export default BurgerIngredients