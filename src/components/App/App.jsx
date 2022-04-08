import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UnprotectedRoute from '../UnprotectedRoute/UnprotectedRoute';

import { ROUTES } from 'utils/constants';

import { getIngredients } from 'services/actions';

import AppHeader from '../AppHeader/AppHeader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
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
          <Route path={ROUTES.home.path} exact={true}>
            <HomePage />
          </Route>
          <Route path={ROUTES.register.path} exact={true}>
            <RegistrationPage />
          </Route>
          <Route path={ROUTES.login.path} exact={true}>
            <LoginPage />
          </Route>
          <Route path={ROUTES.forgot_password.path} exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path={ROUTES.reset_password.path} exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path={ROUTES.profile.path}>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path={ROUTES.orders.path} exact={true}>
            <OrdersPage />
          </ProtectedRoute>
          {/*<Route path={ROUTES.ingredient.path}>
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
