import React from 'react';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

import { Container, Row, Col } from './components/ui/Grid/Grid';

import styles from "./App.module.css";

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            setData([...json.data])
        } catch (error) {
            console.log("Ошибка при выполнении запроса к API: " + error.message);
        }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Container>
          <Row>
            <Col col={'6'}>
              <BurgerIngredients data={data} />
            </Col>
            <Col col={'6'}>
              <BurgerConstructor data={data} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default App;
