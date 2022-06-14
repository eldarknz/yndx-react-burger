import cn from "classnames";

import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";

import { TOrder } from "../../../declarations";

import { Container } from "../../components/ui/Grid/Grid";

import OrderItem from "../../components/OrderItem/OrderItem";

import styles from "./OrderList.module.css";

interface IOrderListProps {
    isWsConnected: boolean;
    orders: Array<TOrder>
};

const OrderList: FC<IOrderListProps> = ({
    isWsConnected,
    orders,
}) => {

    const { ingredients } = useSelector(store => store.burger);

    return (
        <section className={styles.section}>
            <Container fluid={true}>
                <div
                    className={cn(styles.blockList, "mt-5")}
                >
                    { !isWsConnected && <p className="text text_type_main-default pb-3">Загрузка...</p> }
                    {
                        <div className={styles.cardGroup}>
                            {
                                isWsConnected && orders.map((order: any, index: number) => (
                                    <OrderItem key={order._id} order={order} />
                                ))
                            }
                        </div>
                    }
                </div>
            </Container>
        </section>
    );
};

export default OrderList