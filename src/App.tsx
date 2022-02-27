import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

import { Container, Row, Col } from './components/ui/Grid/Grid';

import styles from "./App.module.css";

import data from "./data.json";

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Container>
          <Row>
            <Col col={'6'}>
              <BurgerIngredients data={data}/>
            </Col>
            <Col col={'6'}>
              <BurgerConstructor />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
