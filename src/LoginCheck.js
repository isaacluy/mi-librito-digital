import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import Login from "./components/Login";
import NoMatch from "./components/NoMatch";

const LoginCheck = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/404" component={NoMatch} />
        <Route
          exact
          path="*"
          render={() =>
            isLoggedIn ? <App /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default LoginCheck;
