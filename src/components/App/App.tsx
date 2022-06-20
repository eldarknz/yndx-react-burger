import { useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/types/hooks';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

import { getIngredients } from '../../services/actions/burger';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../../components/Modal/Modal';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import FeedOrder from '../../components/FeedOrder/FeedOrder';

import { ILocation } from '../../../declarations';

import {
  HomePage,
  FeedPage,
  FeedOrderPage,
  IngredientPage,
  RegistrationPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileOrderPage,
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

  const handleCloseModalFeedOrder = useCallback(() => {
    history.push('/feed');
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
          <ProtectedRoute path={ROUTES.profile_order.path} exact={true}>
            <ProfileOrderPage />
          </ProtectedRoute>
          <ProtectedRoute path={ROUTES.profile.path}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path={ROUTES.feed.path} exact={true}>
            <FeedPage />
          </Route>
          <Route path={ROUTES.feed_order.path} exact={true}>
            <FeedOrderPage />
          </Route>
          <Route path={ROUTES.ingredient.path} exact={true}>
            <IngredientPage />
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
            <Route path={ROUTES.feed_order.path}>
              <Modal
                onClose={handleCloseModalFeedOrder}
              >
                <FeedOrder isModal={true}/>
              </Modal>
            </Route>
          </Switch>
        )}

      </main>
    </>
  );
}

export default App;
