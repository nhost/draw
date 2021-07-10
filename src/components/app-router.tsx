import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Dashboard } from "./dashboard";
import { Drawing } from "./drawings/drawing";
import { WorkspaceDashboard } from "./workspaces/workspace-dashboard";

export function AppRouter() {
  return (
    // <Layout>
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/:workspaceSlug">
          <WorkspaceDashboard />
        </Route>
        <Route exact path="/:workspaceId/:drawingId">
          <Drawing />
        </Route>
      </Switch>
    </Router>
    // </Layout>
  );
}
