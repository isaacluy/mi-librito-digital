import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Directory from "./components/Directory";
import MantraDetails from "./components/MantraDetails";
import NavBar from "./components/NavBar";
import PrayerDetails from "./components/PrayerDetails";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <BrowserRouter>
      <NavBar setSearchTerm={setSearchTerm} />
      <Switch>
        <Route path="/mantra/:id" component={MantraDetails} />
        <Route path="/prayer/:id" component={PrayerDetails} />
        <Route path="/" render={() => <Directory searchTerm={searchTerm} />} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
