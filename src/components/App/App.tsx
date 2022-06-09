import { useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/types/hooks';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

import { getIngredients } from '../../services/actions/burger';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../../components/Modal/Modal';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

import { ILocation } from '../../../declarations';

import {
  HomePage,
  OrdersPage,
  IngredientPage,
  RegistrationPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  PageNotFoundPage
} from '../../pages';

import styles from "./App.module.css";

interface ILocationBackground {
  background?: ILocation;
}

const App = () => {

  const dispatch = useDispatch();

  const location = useLocation<ILocationBackground>();
  const history = useHistory();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Switch location={background || location}>
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
          <Route path={ROUTES.ingredient.path} exact={true}>
            <IngredientPage />
          </Route>
          <Route>
            <PageNotFoundPage />
          </Route>
        </Switch>

        {background && (
          <Route path={ROUTES.ingredient.path}>
            <Modal
              header="Детали ингредиента"
              onClose={handleCloseModal}
            >
              <IngredientDetails />
            </Modal>
          </Route>
        )}

      </main>
    </>
  );
}

export default App;
