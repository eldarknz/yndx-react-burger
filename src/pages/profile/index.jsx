import cn from "classnames";

import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { Container, Row } from 'components/ui/Grid/Grid';
import ProfileMenu from "components/ProfileMenu/ProfileMenu";
import ProfileForm from "components/ProfileForm/ProfileForm";

import styles from './styles.module.css';

export const ProfilePage = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const { state } = useLocation();

  //console.log(match, history, state);

  return (
    <Container className={styles.container}>
      <Row>
        <ProfileMenu />
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileForm />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <p className='text text_type_main-default'>История заказов</p>
          </Route>
        </Switch>
      </Row>
    </Container>
  );
};