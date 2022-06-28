import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { Row, Col } from "../../components/ui/Grid/Grid";
import { ImageBlock } from "../../components/OrderItem/OrderItem";

import { TBurgerComposition, TBurgerCompositionIngredient } from "../../../declarations";

import styles from "./BurgerComposition.module.css";

const IngredientBlock = ({ingredient, count}: TBurgerCompositionIngredient) => {
    return (
        ingredient ? (
            <Row className={styles.ingredientBlock}>
                <Col col="auto">
                    <ImageBlock ingredient={ingredient}/>
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

const BurgerComposition = (props: TBurgerComposition) => {
    const { bun, ingredients } = props;

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