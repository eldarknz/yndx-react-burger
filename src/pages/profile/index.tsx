import { Route, Switch } from 'react-router-dom';

import { Container, Row } from 'components/ui/Grid/Grid';
import ProfileMenu from "components/ProfileMenu/ProfileMenu";
import ProfileForm from "components/ProfileForm/ProfileForm";
import ProfileOrders from "components/ProfileOrders/ProfileOrders";

import styles from './styles.module.css';

export const ProfilePage = () => {
  return (
    <Container className={styles.container}>
      <Row>
        <ProfileMenu />
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileForm />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <ProfileOrders />
          </Route>
        </Switch>
      </Row>
    </Container>
  );
};