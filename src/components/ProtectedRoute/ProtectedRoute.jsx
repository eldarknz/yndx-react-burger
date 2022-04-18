import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTES } from "../../utils/constants";

import { checkAccessToken } from "../../utils/utils";

const ProtectedRoute = ({ path, exact, children }) => {
  const location = useLocation();

  const { isLoggedIn } = useSelector(store => store.user);

  if (!checkAccessToken()) {
    return (
      <Redirect
        to={{
          pathname: ROUTES.login.path,
          state: { from: location }
        }}
      />
    )
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.login.path,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute