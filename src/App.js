import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import MainApp from "./MainApp";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            isLoggedIn ? <MainApp /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
