import cn from "classnames";

import { FC } from "react";
import { useSelector } from '../../services/types/hooks';
import { Link, useLocation } from "react-router-dom";

import { Row, Col } from "../../components/ui/Grid/Grid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { TOrder } from "../../../declarations";

import { ORDER_STATUS } from "../../utils/constants";

import styles from "./OrderItem.module.css";

interface IOrderItemProps {
    order: TOrder;
    isStatusView?: boolean;
}

interface IImageProps {
    src: string;
    name: string;
}

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

const OrderItem: FC<IOrderItemProps> = ({ order, isStatusView = false }) => {
    const location = useLocation();

    const { ingredients } = useSelector(store => store.burger);

    //console.log(order);

    let images: Array<IImageProps> = [];
    let totalValue = 0;

    const isItemsMore = order.ingredients.length > 6;
    const restItemsValue = order.ingredients.length - 6;

    order.ingredients.slice(0, 6).forEach(ingredientItem => {
        let ingredient = ingredients.find(component => component._id === ingredientItem);
    
        if (!ingredient) {
          return;
        }
    
        totalValue += ingredient.price;
        images.push({
            src: ingredient.image_mobile,
            name: ingredient.name
        });
    });

    return (
        <Link 
            to={{
                pathname: `/feed/${order._id}`,
                state: { background: location }
            }}
        >
            <div className={cn(styles.card, "mb-6", "mr-2")}>
                <Row>
                    <Col col="auto">
                        <p className="text text_type_digits-default">{`#${order.number}`}</p>
                    </Col>
                    <Col>
                        <p className="text text_type_main-default text_color_inactive" style={{ textAlign: 'right' }}>{order.createdAt}</p>
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
                                images.length > 0 && images.map((image: IImageProps, index: number) => (
                                    <div
                                        key={index}
                                        className={styles.imageBlock}
                                        style={{zIndex: 10 - index}}
                                    >
                                        <img
                                            className={`${styles.imageBackground} ${index === 5 && isItemsMore && styles.imageOpacity}`}
                                            
                                            src={image.src}
                                            alt={image.name}
                                        />
                                    </div>
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