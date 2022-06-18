import cn from "classnames";

import { useEffect } from "react";

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { wsFeedConnectionStart } from '../../services/actions/wsFeed';

import { Row, Col, Container } from "../../components/ui/Grid/Grid";

import { TIngredient, TOrder } from "../../../declarations";

import BurgerComposition from "./BurgerComposition";

import styles from "./OrderComposition.module.css";

export type TIngredientType = {
    count: number,
    ingredient: TIngredient | null
}

export type IBurgerComposition = {
    bun: TIngredient | null
    ingredients: {
        [T: string]: TIngredientType
    }
}

const getBurgerComposition = (burgerIngredients: Array<TIngredient>) => {
    let burgerComposition: IBurgerComposition = {
        bun: null,
        ingredients: {}
    }

    burgerIngredients.forEach(ingredient => {
        if (ingredient.type === "bun") {
            if (!burgerComposition.bun)
                burgerComposition.bun = ingredient
        } else {
            if (!(ingredient._id in burgerComposition.ingredients))
                burgerComposition.ingredients[ingredient._id] = { count: 0, ingredient: ingredient }
            burgerComposition.ingredients[ingredient._id]["count"] += 1
        }
    })

    return burgerComposition;
};

const statusValue = (status: 'done' | 'created' | 'pending') => {
    const style: any = {};
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

const OrderComposition = ({ isModal = false }: { isModal?: boolean } ) => {

    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();

    const { wsConnected, orders } = useSelector(store => store.feed);
  
    const { ingredients } = useSelector(store => store.burger);

    useEffect(() => {
      if (!wsConnected) {
          dispatch(wsFeedConnectionStart());
      }
    }, [dispatch, wsConnected])

    const viewedOrder = orders.find((order: TOrder) => order._id === id);

    let burgerIngredients: Array<TIngredient> = [];
    let total = 0;

    viewedOrder?.ingredients.forEach(number => {
        const ingredient = ingredients.find(ingredient => ingredient._id === number);
        if (ingredient)
            burgerIngredients.push(ingredient);
    });

    const burgerComposition = getBurgerComposition(burgerIngredients);

    console.log(burgerComposition);

    return (
        <Container className={styles.orderBlock}>
            {!viewedOrder ? (
                <Row justifyContent={isModal ? "flex-start" : "center"} className={cn("mb-10", { "mt-5": isModal })}>
                    <p className="text text_type_main-default">Загрузка...</p>
                </Row>
            ) : (
                <>
                    <Row justifyContent={isModal ? "flex-start" : "center"} className={cn("mb-10", { "mt-5": isModal })}>
                        <h5 className="text text_type_digits-default">{`#${viewedOrder.number}`}</h5>
                    </Row>
                    <Row className="mb-15">
                        <Col>
                            <h3 className="text text_type_main-medium mb-3">{viewedOrder.name}</h3>
                            {statusValue(viewedOrder.status)}
                        </Col>
                    </Row>
                    <Row className="mb-10">
                        <Col>
                            <h3 className="text text_type_main-medium mb-6">Состав:</h3>
                            <BurgerComposition bun={burgerComposition.bun} ingredients={burgerComposition.ingredients}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>1</Col>
                        <Col col="auto">{total}</Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default OrderComposition