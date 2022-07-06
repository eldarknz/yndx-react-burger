import cn from 'classnames';

import { useSelector } from '../../services/types/hooks';
import { useDrag } from 'react-dnd';

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useLocation } from 'react-router-dom';

import { TIngredient } from '../../../declarations';

import styles from "./BurgerIngredients.module.css";

interface IBurgerIngredientsItemProps {
    ingredient: TIngredient;
}

const BurgerIngredientsItem = (props: IBurgerIngredientsItemProps) => {
    const location = useLocation();

    const { _id, price, image, name, type } = props.ingredient;
    
    const { burgerIngredients, burgerBun } = useSelector(store => store.burger);

    const ingredientOccurrences = burgerIngredients.concat(burgerBun ? [burgerBun] : []).reduce((sum, ingredient) => {
        if (ingredient._id === _id) {
            if (ingredient.type === 'bun') return sum + 2;
            return sum + 1;
        }
        return sum;
    }, 0);

    const [{ opacity }, dragRef] = useDrag({
        type: 'ingredient',
        item: props.ingredient,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div
            className={cn(styles.card, "ml-4 mr-1 mb-8")}
            data-type={type}
            ref={dragRef}
            style={{ opacity }}
        >
            <Link 
                to={{
                    pathname: `/ingredients/${_id}`,
                    state: { background: location }
                }}
            >
                {ingredientOccurrences > 0 && (
                    <div className={styles.counter}>
                        <Counter count={ingredientOccurrences} size="default" />
                    </div>
                )}
                <div className={styles.сardImage}>
                    <img src={image} alt={name} />
                </div>
                <div className={styles.cardBody}>
                    <div className={cn(styles.cardTitle, "text text_type_digits-default", "pt-1 pb-1")}>
                        {price}
                        <div className={styles.icon}>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                    <div className={cn(styles.cardText, "text text_type_main-default")}>{name}</div>
                </div>
            </Link>
        </div>
    )
};

export default BurgerIngredientsItem;