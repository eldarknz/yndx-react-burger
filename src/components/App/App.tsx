import { useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/types/hooks';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

import { getIngredients } from '../../services/actions/burger';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../../components/Modal/Modal';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import OrderComposition from '../../components/OrderComposition/OrderComposition';

import { ILocation } from '../../../declarations';

import {
  HomePage,
  FeedPage,
  OrderCompositionPage,
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

  const handleCloseModalIngredient = useCallback(() => {
    history.push('/');
  }, [history]);

  const handleCloseModalOrder = useCallback(() => {
    history.push('/feed');
  }, [history]);

  //console.log(background, location);

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
          <Route path={ROUTES.feed.path} exact={true}>
            <FeedPage />
          </Route>
          <Route path={ROUTES.ingredient.path} exact={true}>
            <IngredientPage />
          </Route>
          <Route path={ROUTES.order.path} exact={true}>
            <OrderCompositionPage />
          </Route>
          <Route>
            <PageNotFoundPage />
          </Route>
        </Switch>

        {background && (
          <Switch>
            <Route path={ROUTES.ingredient.path}>
              <Modal
                header="Детали ингредиента"
                onClose={handleCloseModalIngredient}
              >
                <IngredientDetails />
              </Modal>
            </Route>
            <Route path={ROUTES.order.path}>
              <Modal
                onClose={handleCloseModalOrder}
              >
                <OrderComposition />
              </Modal>
            </Route>
          </Switch>
        )}

      </main>
    </>
  );
}

export default App;
