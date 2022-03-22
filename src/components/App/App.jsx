import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { Container, Row, Col } from '../ui/Grid/Grid';

import { getIngredients } from 'services/actions';

import styles from "./App.module.css";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
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
      </main>
    </>
  );
}

export default App;
