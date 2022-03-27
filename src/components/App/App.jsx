import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Switch } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { Container, Row, Col } from '../ui/Grid/Grid';

import {
  HomePage,
  RegistrationPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  PageNotFoundPage
} from '../../pages';

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
        <Switch>
          <Route path="/" exact={true}>
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
          </Route>
          <Route path="/register" exact={true}>
            <RegistrationPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <PageNotFoundPage />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
