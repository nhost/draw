import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Login } from "components/login";
import { AppRouter } from "components/app-router";

import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostAuthProvider } from "@nhost/react-auth";
import { nhost } from "utils/nhost";
import { AuthGate } from "components/auth-gate";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { PublicDrawing } from "components/public-drawings/public-drawing";

ReactDOM.render(
  <React.StrictMode>
    <NhostAuthProvider auth={nhost.auth}>
      <NhostApolloProvider
        auth={nhost.auth}
        gqlEndpoint="https://hasura-bf8d3585.nhost.app/v1/graphql"
      >
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <div>registeer..</div>
            </Route>
            <Route exact path="/public/:drawingId">
              <PublicDrawing />
            </Route>
            <Route path="/">
              <AuthGate>
                <AppRouter />
              </AuthGate>
            </Route>
          </Switch>
        </Router>
      </NhostApolloProvider>
    </NhostAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
