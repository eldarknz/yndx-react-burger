import React from 'react';

import { Container } from 'components/ui/Grid/Grid';

import styles from './styles.module.css';

export const OrdersPage = () => {
  return (
    <Container>
      <div className={styles.block}>
        <p className="text text_type_main-default">Вы пока не можете посмотреть ленту заказов.</p>
        <p className="text text_type_main-default">Мы работаем над этим.</p>
      </div>
    </Container>
  );
};