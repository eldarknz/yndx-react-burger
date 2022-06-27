import { useEffect } from 'react';

import { useDispatch, useSelector } from "../../services/types/hooks";
import { wsFeedConnectionClosed, wsFeedConnectionStart } from '../../services/actions/wsFeed';

import { Container, Row, Col } from '../../components/ui/Grid/Grid';

import OrderList from '../../components/OrderList/OrderList';
import OrdersInfo from '../../components/OrdersInfo/OrdersInfo';

export const FeedPage = () => {

  const dispatch = useDispatch();

  const { wsConnected, orders, total, totalToday, orderBoard } = useSelector(store => store.feed);

  useEffect(() => {
    if (!wsConnected) {
        dispatch(wsFeedConnectionStart());
    }
    return () => {
      if (wsConnected) {
        dispatch(wsFeedConnectionClosed());
      }
    }
  }, [dispatch, wsConnected])

  return (
    <Container>
      <h1 className="text text_type_main-large pt-10 pl-5 pr-5">Лента заказов</h1>
      <Row>
        <Col col="6">
          <OrderList orders={orders} isWsConnected={wsConnected} />
        </Col>
        <Col col="6">
          <OrdersInfo orderBoard={orderBoard} total={total} totalToday={totalToday} />
        </Col>
      </Row>
    </Container>
  );
};