import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../state/allReducers';

export interface PrivateRouteProps {
  path: string;
  component: any;
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { user } = useSelector((state: AppState) => state.AuthReducer);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login-signup',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
