import cn from "classnames";

import { useEffect } from "react";

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { wsFeedConnectionStart } from '../../services/actions/wsFeed';

import { Row, Col } from "../../components/ui/Grid/Grid";

import { TOrder } from "../../../declarations";

import styles from "./OrderComposition.module.css";

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

const OrderComposition = () => {

    const dispatch = useDispatch();

    const { id } = useParams<{ id: string }>();

    const { wsConnected, orders } = useSelector(store => store.feed);
  
    useEffect(() => {
      if (!wsConnected) {
          dispatch(wsFeedConnectionStart());
      }
    }, [dispatch, wsConnected])

    const viewedOrder = orders.find((order: TOrder) => order._id === id);

    return (
        <div className={styles.orderBlock}>
            {!viewedOrder ? <div className="text text_type_main-default textAlignCenter">Загрузка...</div> : (
                <>
                    <div className="mb-10">
                        <h5 className="text text_type_digits-default textAlignCenter">{`#${viewedOrder.number}`}</h5>
                    </div>
                    <div className="mb-3">
                        <h3 className="text text_type_main-medium">{viewedOrder.name}</h3>
                    </div>
                    <div className="mb-15">
                        {statusValue(viewedOrder.status)}
                    </div>
                    <div className="mb-10">
                        <h3 className="text text_type_main-medium">Состав:</h3>
                    </div>
                    {/*<div className={styles.image}>
                        <img src={viewedOrder.image_large} alt={viewedIngredient.name}/>
                    </div>
                    <div className={cn(styles.title, "pb-8")}>
                        <h3 className="text text_type_main-medium">{viewedIngredient.name}</h3>
                    </div>
                    <Row>
                        <Col col="3" className="textAlignCenter">
                            <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                            <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.calories}</p>
                        </Col>
                        <Col col="3" className="textAlignCenter">
                            <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                            <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.proteins}</p>
                        </Col>
                        <Col col="3" className="textAlignCenter">
                            <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                            <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.fat}</p>
                        </Col>
                        <Col col="3" className="textAlignCenter">
                            <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                            <p className="text text_type_main-default text_color_inactive pb-2">{viewedIngredient.carbohydrates}</p>
                        </Col>
                    </Row>*/}
                </>
            )}
        </div>
    );
};

export default OrderComposition