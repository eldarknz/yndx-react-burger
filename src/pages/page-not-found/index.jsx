import React from 'react';

import { Container } from 'components/ui/Grid/Grid';

import styles from './styles.module.css';

export const PageNotFoundPage = () => {
  return (
    <Container>
      <div className={styles.block}>
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-default">УПС! СТРАНИЦА НЕ НАЙДЕНА.</p>
      </div>
    </Container>
  );
};