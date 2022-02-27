import cn from "classnames";

import React from "react";
import PropTypes from "prop-types";

import { Container } from "../ui/Grid/Grid";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./BurgerIngredients.module.css";
import { Icon } from "../ui/Icon/Icon";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data }) => {

    let burgerIngredientCategories = {
        bun: { title: "Булки", items: [] },
        main: { title: "Начинки", items: [] },
        sauce: { title: "Соусы", items: [] }
    };

    data.forEach((item, i) => (
        burgerIngredientCategories[item.type].items.push(item)
    ));

    const [current, setCurrent] = React.useState("bun");

    return (
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
                <div className={cn(styles.blockList, "pt-10")}>
                    {
                        
                    }
                    {
                        /*Object.keys(burgerIngredientCategories).map((key, index) => (
                            <div key={index} className={styles.block}>
                                <h3 className={cn(styles.title, "text text_type_main-medium mb-6")}>{burgerIngredientCategories[key].title}</h3>
                                {burgerIngredientCategories[key].items.length !== 0 && <div className={cn(styles.cardGroup, "mb-2")}>
                                    {burgerIngredientCategories[key].items.map((item, index) => (
                                        <div key={item._id} className={cn(styles.card, "ml-4 mr-2 mb-8")}>
                                            <div className={styles.counter}>
                                                <Counter count={1} size="default" />
                                            </div>
                                            <div className={styles.сardImage}>
                                                <img src={item.image} />
                                            </div>
                                            <div className={styles.cardBody}>
                                                <div className={cn(styles.cardTitle, "text text_type_digits-default", "pt-1 pb-1")}>
                                                    {item.price}
                                                    <div className={styles.icon}>
                                                        <Icon name="currency" />
                                                    </div>
                                                </div>
                                                <div className={cn(styles.cardText, "text text_type_main-default")}>{item.name}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>
                        ))*/
                    }
                </div>
            </Container>
        </section>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.array
}

export default BurgerIngredients