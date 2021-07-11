import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout } from "components/layout/layout";
import { Dashboard } from "./dashboard";
import { Drawing } from "./drawings/drawing";
import { WorkspaceDashboard } from "./workspaces/workspace-dashboard";
import { Collection } from "./collections/collection";

export function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/:workspaceSlug">
            <WorkspaceDashboard />
          </Route>
          <Route exact path="/:workspaceSlug/:collectionId">
            <Collection />
          </Route>
          <Route exact path="/:workspaceSlug/:collectionId/:drawingId">
            <Drawing />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
