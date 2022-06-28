import cn from "classnames";

import { FC } from "react";

import { Container, Row, Col } from "../../components/ui/Grid/Grid";
import OrdersBoardColumn from "./OrdersBoardColumn";

import { TOrderBoard } from "../../../declarations";

import styles from "./OrdersInfo.module.css";

interface IOrdersInfoProps {
    orderBoard: TOrderBoard,
    total: number;
    totalToday: number;
}

const OrdersInfo: FC<IOrdersInfoProps> = ({ orderBoard, total, totalToday }) => {

    const lastDoneNumbers = orderBoard.done.slice(0, 10);
    const lastPendingNumbers = orderBoard.pending.slice(0, 10);

    return (
        <section className={styles.section}>
            <Container fluid={true}>
                <div 
                    className={cn(styles.blockList, "mt-5")}
                >
                    <Row className={styles.ordersBoard}>
                        <OrdersBoardColumn title={"Готовы:"} numbers={lastDoneNumbers} isDone={true} />
                        <OrdersBoardColumn title={"В работе:"} numbers={lastPendingNumbers} />
                    </Row>
                    <Row>
                        <Col col="12">
                            <h3 className="text text_type_main-medium title">Выполнено за все время:</h3>
                        </Col>
                        <Col col="12">
                            <p className={cn(styles.textShadow, "text text_type_digits-large")}>{total}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col col="12">
                            <h3 className="text text_type_main-medium title">Выполнено за сегодня:</h3>
                        </Col>
                        <Col col="12">
                            <p className={cn(styles.textShadow, "text text_type_digits-large")}>{totalToday}</p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default OrdersInfo