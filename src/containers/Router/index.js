import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignUpPage from '../SignUpPage'
import FeedPage from '../FeedPage'
import PostDetailsPage from '../PostDetailsPage'




export const routes = {
  root: "/",
  signUp: "/SignUp/",
  feed: "/Feed/",
  details: "/details" 

  // Outras rotas aqui
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.signUp} component={SignUpPage} />
        <Route exact path={routes.feed} component={FeedPage} />
        <Route exact path={routes.details} component={PostDetailsPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
