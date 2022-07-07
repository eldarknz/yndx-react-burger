import cn from "classnames";

import { useRef } from "react";
import { useDispatch, useSelector } from '../../services/types/hooks';

import { Container } from "../ui/Grid/Grid";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "./BurgerIngredientsItem";

import { tabSwitch } from "../../services/actions/burger";

import { INGREDIENT_CATEGORIES } from "../../utils/constants";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredients = () => {

    const dispatch = useDispatch();

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.burger);

    const currentTab = useSelector(store => store.burger.currentTab);

    const ingredientsSection = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const handleSwitchTab = (currentTab: string) => {
        dispatch(tabSwitch(currentTab));
    };

    const handleScroll = () => {
        const ingredientsTop = ingredientsSection.current!.getBoundingClientRect().top;
        const bunHeaderTop = bunRef.current!.getBoundingClientRect().top;
        const sauceHeaderTop = sauceRef.current!.getBoundingClientRect().top;
        const mainHeaderTop = mainRef.current!.getBoundingClientRect().top;

        const closest = [
            {name: "bun", value: bunHeaderTop},
            {name: "sauce", value: sauceHeaderTop},
            {name: "main", value: mainHeaderTop}
        ].sort((a, b) => Math.abs(ingredientsTop - a.value) - Math.abs(ingredientsTop - b.value))[0];

        handleSwitchTab(closest.name);
    };

    return (
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
                                            <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} />
                                        ))
                                    }
                                </div>
                            </section>
                        )))
                    }
                </div>
            </Container>
        </section>
    );
};

export default BurgerIngredients