import { useCallback } from "react";

import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import { ROUTES } from "../../utils/constants";

import { Container, Row, Col } from "../../components/ui/Grid/Grid";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileOrderList from "../../components/ProfileOrderList/ProfileOrderList";
import ProfileOrder from "../../components/ProfileOrder/ProfileOrder";

import Modal from "../../components/Modal/Modal";

import { ILocation } from '../../../declarations';

interface ILocationBackground {
  background?: ILocation;
}

export const ProfilePage = () => {

  const location = useLocation<ILocationBackground>();
  const history = useHistory();
  const background = location.state && location.state.background;

  const handleCloseModalProfileOrder = useCallback(() => {
    history.push('/profile/orders');
  }, [history]);

  return (
    <Container>
      <Row>
        <Col col="auto">
          <ProfileMenu />
        </Col>
        <Col>
          <Switch location={background || location}>
            <Route path={ROUTES.profile.path} exact={true}>
              <ProfileForm />
            </Route>
            <Route path={ROUTES.profile_orders.path} exact={true}>
              <ProfileOrderList />
            </Route>
          </Switch>

          {background && (
            <Switch>
              <Route path={ROUTES.profile_order.path}>
                <Modal
                  onClose={handleCloseModalProfileOrder}
                >
                  <ProfileOrder isModal={true}/>
                </Modal>
              </Route>
            </Switch>
          )}

        </Col>
      </Row>
    </Container>
  );
};