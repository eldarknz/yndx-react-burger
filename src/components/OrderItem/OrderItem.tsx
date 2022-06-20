import cn from "classnames";

import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from '../../services/types/hooks';
import { TIngredient, TOrder } from "../../../declarations";
import { getBurgerComposition, dateFormatConverter } from "../../utils/utils";

import { Row, Col } from "../../components/ui/Grid/Grid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./OrderItem.module.css";

interface IOrderItemProps {
    order: TOrder;
    isStatusView?: boolean;
}

interface IImageBlockProps {
    ingredient: TIngredient | null;
    className?: string;
    style?: React.CSSProperties;
}

const statusValue = (status: 'done' | 'created' | 'pending') => {
    const style: React.CSSProperties = {};
    let text = '';

    switch (status) {
        case 'done':
            text = 'Выполнен';
            style.color = '#00CCCC';
            break;
        case 'created':
            text = 'Создан';
            break;
        case 'pending':
            text = 'Готовится';
            break;
        default:
    }

    return (
        <p className='text text_type_main-default' style={style}>{text}</p>
    );
}

export const ImageBlock = ({
    ingredient,
    style = {},
    className
}: IImageBlockProps) => {
    return (
        ingredient ? (
            <div
                className={cn(styles.imageBlock, className)}
                style={style}
            >
                <img
                    className={styles.imageBackground}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                />
            </div>
        ) : null
    );
};

const OrderItem: FC<IOrderItemProps> = ({ order, isStatusView = false }) => {
    const location = useLocation();

    const { ingredients } = useSelector(store => store.burger);

    let orderIngredients: Array<TIngredient> = [];

    order?.ingredients.forEach(number => {
        const ingredient = ingredients.find(ingredient => ingredient._id === number);
        if (ingredient)
        orderIngredients.push(ingredient);
    });

    const {
        bun,
        ingredients: burgerIngredients,
        totalValue
    } = getBurgerComposition(orderIngredients);

    const zIndex = 10;
    const isItemsMore = (bun ? 1 : 0) + (Object.keys(burgerIngredients).length) > 6;
    const restItemsValue = (bun ? 1 : 0) + (Object.keys(burgerIngredients).length) - 6;
    const maxIngredients = 6 - (bun ? 1 : 0);

    return (
        <Link 
            to={{
                pathname: `${location.pathname}/${order._id}`,
                state: { background: location }
            }}
        >
            <div className={cn(styles.card, "mb-6", "mr-2")}>
                <Row>
                    <Col>
                        <p className="text text_type_digits-default">{`#${order.number}`}</p>
                    </Col>
                    <Col col="auto">
                        <p className="text text_type_main-default text_color_inactive">{dateFormatConverter(order.createdAt)}</p>
                    </Col>
                </Row>
                <Row>
                    <Col col="12">
                        <p 
                            className={cn("text text_type_main-medium",  
                                {
                                    "pb-2": isStatusView
                                }
                            )}
                        >
                            {order.name}
                        </p>
                    </Col>
                    { isStatusView && (
                        <Col col="12">
                            {statusValue(order.status)}
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col className="displayFlex">
                        <div className={styles.imageList}>
                            {
                                bun && (
                                    <ImageBlock
                                        ingredient={bun}
                                        style={{zIndex: zIndex}}
                                    />
                                )
                            }
                            {
                                Object.keys(burgerIngredients).sort().slice(0, maxIngredients).map((item, index) => (
                                    <ImageBlock
                                        key={item}
                                        ingredient={burgerIngredients[item].ingredient}
                                        style={{zIndex: (zIndex - (bun ? 1 : 0)) - index}}
                                        className={`${index === (maxIngredients - 1) && isItemsMore && styles.imageOpacity}`}
                                    />
                                ))
                            }
                            {isItemsMore && 
                                <div className={`text text_type_main-default ${styles.restItems}`}>+{restItemsValue}</div>
                            }
                        </div>
                    </Col>
                    <Col col="auto" className="displayFlex alignItemsCenter justifyContentCenter">
                        <Row>
                            <div className={"text text_type_digits-default mr-2"}>
                                {totalValue}
                            </div>
                            <CurrencyIcon type="primary" />
                        </Row>
                    </Col>
                </Row>
            </div>
        </Link>
    );
};

export default OrderItem