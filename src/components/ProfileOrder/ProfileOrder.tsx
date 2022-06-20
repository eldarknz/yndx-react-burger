import cn from "classnames";

import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/types/hooks';
import { wsProfileOrdersConnectionStart } from "services/actions/wsProfileOrders";
import { getBurgerComposition, dateFormatConverter } from "../../utils/utils";
import { TIngredient, TOrder } from "../../../declarations";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Row, Col, Container } from "../../components/ui/Grid/Grid";

import BurgerComposition from "../BurgerComposition/BurgerComposition";

import styles from "./ProfileOrder.module.css";

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

const ProfileOrder = ({ isModal = false }: { isModal?: boolean } ) => {

    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();

    const { wsProfileConnected, orders } = useSelector(store => store.profileOrders);
  
    const { ingredients } = useSelector(store => store.burger);

    useEffect(() => {
      if (!wsProfileConnected) {
          dispatch(wsProfileOrdersConnectionStart());
      }
    }, [dispatch, wsProfileConnected])

    const viewedOrder = orders.find((order: TOrder) => order._id === id);

    let orderIngredients: Array<TIngredient> = [];

    viewedOrder?.ingredients.forEach(number => {
        const ingredient = ingredients.find(ingredient => ingredient._id === number);
        if (ingredient)
            orderIngredients.push(ingredient);
    });

    const burgerComposition = getBurgerComposition(orderIngredients);

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
                            <BurgerComposition {...burgerComposition} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="text text_type_main-default text_color_inactive">{dateFormatConverter(viewedOrder.createdAt)}</p>
                        </Col>
                        <Col col="auto" className="displayFlex alignItemsCenter justifyContentCenter">
                            <Row>
                                <div className={"text text_type_digits-default mr-2"}>
                                    {burgerComposition.totalValue}
                                </div>
                                <CurrencyIcon type="primary" />
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ProfileOrder