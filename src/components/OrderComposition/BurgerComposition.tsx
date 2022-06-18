import cn from "classnames";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { Row, Col } from "../../components/ui/Grid/Grid";

import { IBurgerComposition, TIngredientType } from "./OrderComposition";

import styles from "./OrderComposition.module.css";

const IngredientBlock = ({ingredient, count}: TIngredientType) => {
    return (
        ingredient ? (
            <Row className={styles.ingredientBlock}>
                <Col col="auto">
                    <div
                        className={styles.ingredientImage}
                    >
                        <img
                            className={styles.imageBackground}
                            src={ingredient.image_mobile}
                            alt={ingredient.name}
                        />
                    </div>
                </Col>
                <Col className={styles.ingredientName}>
                    <span className={`text text_type_main-default`}>{ingredient.name}</span>
                </Col>
                <Col col="auto" className={styles.ingredientPrice}>
                    <span className={'text text_type_digits-default'}>{count}</span>
                    <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
                    <span className={'text text_type_digits-default mr-2'}>{ingredient.price}</span>
                    <CurrencyIcon type="primary"/>
                </Col>
            </Row>
        ) : null
    );
};

const BurgerComposition = ({bun, ingredients}: IBurgerComposition) => {
    return (
        <div className={styles.blockComposition}>
            {
                bun && (
                    <IngredientBlock ingredient={bun} count={2} />
                )
            }
            {
                Object.keys(ingredients).sort().map(item => (
                    <IngredientBlock key={item} ingredient={ingredients[item].ingredient} count={ingredients[item].count} />
                ))
            }
        </div>
    );
};

export default BurgerComposition