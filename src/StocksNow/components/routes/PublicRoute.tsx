import React, { FunctionComponent } from 'react';
import { Route, RouteProps } from 'react-router';
import { withRouter } from 'react-router-dom';

const PublicRoute: FunctionComponent<RouteProps<string>> = ({ component, ...props }) => {
  if (!component) {
    console.error('Component cannot be null');
    return null;
  }

  return <Route {...props} component={withRouter(component)} />;
};

export default PublicRoute;
