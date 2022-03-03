import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { Container, Row, Col } from '../ui/Grid/Grid';

import { API_URL } from '../../utils/constants';

import styles from "./App.module.css";

function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_URL}ingredients`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((response) => {
        setData([...response.data]);
      })
      .catch((error) => {
        console.log("Ошибка при выполнении запроса к API: " + error.message);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Container>
          <Row>
            <Col col="6">
              <BurgerIngredients data={data} />
            </Col>
            <Col col="6">
              <BurgerConstructor data={data} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
