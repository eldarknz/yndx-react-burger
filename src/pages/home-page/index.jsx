import React from 'react';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

import { Container, Row, Col } from '../../components/ui/Grid/Grid';

export const HomePage = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Row>
          <Col col="6">
            <BurgerIngredients />
          </Col>
          <Col col="6">
            <BurgerConstructor />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};