import { Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

const ProtectedRoute = ({ path, exact, children }) => {

  return (
    <Route
      path={path}
      exact={exact}
    >
      {children}
    </Route>
  );
}

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;