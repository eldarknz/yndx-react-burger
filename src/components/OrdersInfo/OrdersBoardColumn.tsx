import { FC } from "react";

import { Row, Col } from "../../components/ui/Grid/Grid";

import styles from "./OrdersInfo.module.css";

interface IOrdersBoardColumnProps {
    title: string;
    numbers: Array<number>;
    isDone?: boolean;
}

const OrdersBoardColumn: FC<IOrdersBoardColumnProps> = ({
    title,
    numbers,
    isDone = false
}) => {

    const rowsCount = 5;
    const columnCount = Math.ceil(numbers.length / rowsCount);
    const indexArray = Array.from(Array(columnCount).keys());

    return (
        <Col className={styles.ordersBoardColumn}>
            <h5 className="text text_type_main-medium mb-6">{title}</h5>
            <Row className={isDone && numbers.length > 0 ? styles.done : undefined}>
                { numbers.length === 0 ?
                (
                    <p className="text text_type_digits-default">--</p>
                ) : (
                    <>
                        {indexArray.map(index => 
                            <Col key={index} className={styles.numberList}>
                                {
                                    numbers.filter((item, i) => Math.floor(i / rowsCount) === index).map(item => {
                                        return (
                                            <p key={item} className="text text_type_digits-default">
                                                {item}
                                            </p>
                                        )
                                    })
                                }
                            </Col>
                        )}
                    </>
                )}
            </Row>
        </Col>
    );
};

export default OrdersBoardColumn