import cn from "classnames";

import { useSelector } from 'react-redux';

import styles from "./OrderDetails.module.css";

const OrderDetails = () => {
    const orderNumber = useSelector(store => store.app.orderNumber);

    return (
        <div className={cn(styles.orderBlock, "pb-15")}>
            <div className={cn(styles.title, "pb-8")}>
                <h1 className="text text_type_digits-large">{orderNumber}</h1>
            </div>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <div className={cn(styles.icon, "pt-15 pb-15")}></div>
            <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails