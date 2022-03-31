import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AppHeader from '../AppHeader/AppHeader';

import IngredientDetails from 'components/IngredientDetails/IngredientDetails';

import {
  HomePage,
  OrdersPage,
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
            <HomePage />
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
          <ProtectedRoute path="/orders" exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          {/*<Route path={"/ingredients/:ingredientId"}>
            <IngredientDetails header="Детали ингредиента"/>
          </Route>*/}
          <Route>
            <PageNotFoundPage />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
