import React, { Suspense, useContext, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import Spinner from "./Components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "Context";
// import { Home, DeckGroups, Decks, Dashboard, Login, Register } from "Pages";
import { DeckForm } from "Components";
import { AuthContext } from "Context";

// Route-based code splitting
const Home = lazy(() => import("./Pages/Home"));
const DeckGroups = lazy(() => import("./Pages/DeckGroups"));
const Decks = lazy(() => import("./Pages/Decks"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));

// Set Layout and Component Using App Route
const AppRoute = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => {
  const { role } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={role}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute path="/" component={Home} exact fullLayout />
          <AppRoute path="/register" component={Register} fullLayout />
          <AppRoute path="/login" component={Login} fullLayout />
          <AppRoute path="/dashboard" component={Dashboard} exact />
          <AppRoute path="/dashboard/decks" component={Decks} exact />
          <AppRoute
            path="/dashboard/deck-groups"
            component={DeckGroups}
            exact
          />
          <AppRoute path="/save-decks/:id?" component={DeckForm} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
