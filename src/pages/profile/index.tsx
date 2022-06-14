import { Route, Switch } from 'react-router-dom';

import { Container, Row, Col } from 'components/ui/Grid/Grid';
import ProfileMenu from "components/ProfileMenu/ProfileMenu";
import ProfileForm from "components/ProfileForm/ProfileForm";
import ProfileOrderList from "components/ProfileOrderList/ProfileOrderList";

export const ProfilePage = () => {
  return (
    <Container>
      <Row>
        <Col col="auto">
          <ProfileMenu />
        </Col>
        <Col>
          <Switch>
            <Route path="/profile" exact={true}>
              <ProfileForm />
            </Route>
            <Route path="/profile/orders" exact={true}>
              <ProfileOrderList />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};