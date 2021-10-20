import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "./Routes";
import AppLayout from "./components/app-layout/app-layout";
import AppBar from "./components/app-bar/app-bar";
function App() {
  return (
    <>
      <AppLayout>
        <AppBar />
        <Switch>
          <Route
            key={Routes.homepage.key}
            path={Routes.homepage.path}
            component={Routes.homepage.component}
            exact
          />
          <Route
            key={Routes.favourites.key}
            path={Routes.favourites.path}
            component={Routes.favourites.component}
            exact
          />
          <Route
            key={Routes.subscription.key}
            path={Routes.subscription.path}
            component={Routes.subscription.component}
            exact
          />
          <Route
            key={Routes.register.key}
            path={Routes.register.path}
            component={Routes.register.component}
          />

          <Route
            key={Routes.login.key}
            path={Routes.login.path}
            component={Routes.login.component}
          />
          <Route
            key={Routes.errors.key}
            path={Routes.errors.path}
            component={Routes.errors.component}
          />
        </Switch>
      </AppLayout>
    </>
  );
}

export default App;
