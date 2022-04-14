import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { ROUTES } from "../../utils/constants";

import PropTypes from 'prop-types';

const ProtectedRoute = ({ path, exact, children }) => {

  const { isLoggedIn } = useSelector(store => store.user);

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