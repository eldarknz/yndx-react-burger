import cn from "classnames";

import { Container, Row, Col } from "components/ui/Grid/Grid";

import styles from "./ProfileOrders.module.css";

const ProfileOrders = () => {

    const orders: any = [
        {
            id: "0",
            dateCreate: "Сегодня, 16:20 i-GMT+3",
            orderNumber: "034535",
            burgerName: "Death Star Starship Main бургер",
            orderId: "Создан",
            ingredients: []
        },
        {
            id: "1",
            dateCreate: "Сегодня, 13:20 i-GMT+3",
            orderNumber: "034534",
            burgerName: "Interstellar бургер",
            orderId: "Готовится",
            ingredients: []
        },
        {
            id: "2",
            dateCreate: "Сегодня, 13:50 i-GMT+3",
            orderNumber: "034533",
            burgerName: "Black Hole Singularity острый бургер",
            orderId: "Выполнен",
            ingredients: []
        },
    ]
    const ordersRequest: boolean = false;
    const ordersFailed: boolean = false;

    return (
        <div className={styles.section}>
            <div
                className={styles.blockList}
            >
                { ordersFailed && <p className="text text_type_main-default pb-3">Произошла ошибка при получении данных</p> }
                { ordersRequest && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                {
                    <div className={styles.cardGroup}>
                        {
                            !ordersFailed && !ordersRequest && orders.map((order: any) => (
                                <div key={order.id} className={cn(styles.card, "mb-6")}>
                                    <Row>
                                        <Col col="auto">
                                            <p className="text text_type_digits-default">{`#${order.orderNumber}`}</p>
                                        </Col>
                                        <Col>
                                            <p className="text text_type_main-default text_color_inactive" style={{ textAlign: 'right' }}>{order.dateCreate}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col col="12">
                                            <p className="text text_type_main-medium pb-2">{order.burgerName}</p>
                                        </Col>
                                        <Col col="12">
                                            <p className="text text_type_main-small">{order.orderId}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className="text text_type_digits-default">{`#${order.orderNumber}`}</p>
                                        </Col>
                                        <Col col="auto">
                                            <p className="text text_type_main-default text_color_inactive" style={{ textAlign: 'right' }}>{order.dateCreate}</p>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default ProfileOrders