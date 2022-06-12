import { useEffect } from 'react';

import { Container } from 'components/ui/Grid/Grid';

import styles from './styles.module.css';
import { useDispatch, useSelector } from "../../services/types/hooks";
import { wsFeedConnectionStart } from 'services/actions/wsFeed';

export const OrdersPage = () => {
  const dispatch = useDispatch();

  const store = useSelector(store => store.feed)
  const { orders, wsConnected } = useSelector(store => store.feed);

  useEffect(() => {
    if (!wsConnected) {
        dispatch(wsFeedConnectionStart());
    }
  }, [dispatch, wsConnected])

  console.log(store);

  return (
    <Container>
      <div className={styles.block}>
        <p className="text text_type_main-default">Вы пока не можете посмотреть ленту заказов.</p>
        <p className="text text_type_main-default">Мы работаем над этим.</p>
      </div>
    </Container>
  );
};