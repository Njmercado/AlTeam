import React, { useState, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignupModal from "./SignupModal";
import Dashboard from "./Dashboard";
import Loading from "./Loading";

import UserContext from "../contexts/UserContext";
import * as api from "../helpers/Api";

const App = (props) => {
  const [location, setLocation] = useState(props.location);
  const [authState, setAuthState] = useState({
    user: null,
    reported: false,
  });

  //Check if user is signed in on initial page load
  useEffect(() => {
    api.autoLogin().then((user) => {
      setAuthState({ user, reported: true });
    });
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (!(props.location.state && props.location.state.isModal)) {
      setLocation(props.location);
    }
  }, [props.location]);

  const requireLogin = (Component) => {
    if (authState.reported && authState.user) {
      return <Component />;
    } else if (authState.reported) {
      return <Redirect to="/login" />;
    } else {
      return <Loading />;
    }
  };

  return (
    <div>
      <UserContext.Provider value={{ authState, setAuthState }}>
        <Switch location={location}>
          <Route
            exact
            path="/"
            component={() => {
              if (authState.reported && authState.user) {
                return <Redirect to="/dashboard" />;
              } else if (authState.reported) {
                return <Home />;
              } else {
                return <Loading />;
              }
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              if (authState.reported && authState.user) {
                return <Redirect to="/home" />;
              } else if (authState.reported) {
                return <Login />;
              } else {
                return <Loading />;
              }
            }}
          />
          <Route
            path="/dashboard"
            render={() => {
              return requireLogin(Dashboard);
            }}
          />
        </Switch>
        <Route exact path="/signup" component={SignupModal} />
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);
