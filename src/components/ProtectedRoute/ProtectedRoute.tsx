import { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { ROUTES } from "../../utils/constants";

import { checkAccessToken } from "../../utils/utils";

interface IProtectedRouteProps {
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ 
  path,
  exact,
  children
}) => {

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

export default ProtectedRoute