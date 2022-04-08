import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { ROUTES } from "../../utils/constants";

import PropTypes from 'prop-types';

const ProtectedRoute = ({ path, exact, children }) => {
  const { isAuth } = useSelector(store => store.user);

  const location = useLocation();

  return (
    <Route path={path} exact={exact} render={() => isAuth ? (children) : (
      <Redirect to={{ pathname: ROUTES.login.path, search: '?redirectUrl=' + location.pathname }} />
    )} />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute