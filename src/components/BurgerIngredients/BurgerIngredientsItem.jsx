import cn from 'classnames';

import { useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientType } from "../IngredientDetails/IngredientDetails";

import styles from "./BurgerIngredients.module.css";

const BurgerIngredientsItem = (props) => {
    const { _id, price, image, name } = props.ingredient;

    const burgerIngredients = useSelector(store => store.app.burgerIngredients);
    const burgerBun = useSelector(store => store.app.burgerBun);

    const ingredientOccurrences = burgerIngredients.concat([burgerBun]).filter(ingredient => ingredient._id === _id);

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: props.ingredient,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div
            className={cn(styles.card, "ml-4 mr-2 mb-8")}
            onClick={() => props.callback(props.ingredient)}
            ref={dragRef}
            style={{ opacity }}
        >
            {ingredientOccurrences.length > 0 && (
                <div className={styles.counter}>
                    { props.__v !== 0 && <Counter count={ingredientOccurrences.length} size="default" /> }
                </div>
            )}
            <div className={styles.сardImage}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.cardBody}>
                <div className={cn(styles.cardTitle, "text text_type_digits-default", "pt-1 pb-1")}>
                    {price}
                    <div className={styles.icon}>
                        <CurrencyIcon tpe="primary" />
                    </div>
                </div>
                <div className={cn(styles.cardText, "text text_type_main-default")}>{name}</div>
            </div>
        </div>
    )
};

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientType.isRequired,
    callback: PropTypes.func.isRequired
};

export default BurgerIngredientsItem;