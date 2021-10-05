import { FunctionComponent } from "react";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const Routes: FunctionComponent = ({ children }) => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>{children}</Switch>
    </Router>
  );
};

export default Routes;
