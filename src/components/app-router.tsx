import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout } from "components/layout/layout";
import { Dashboard } from "./dashboard";
import { Drawing } from "./drawings/drawing";
import { WorkspaceDashboard } from "./workspaces/workspace-dashboard";
import { Main } from "./layout/main";

export function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Main>
              <Dashboard />
            </Main>
          </Route>
          <Route exact path="/:workspaceSlug">
            <Main>
              <WorkspaceDashboard />
            </Main>
          </Route>
          <Route exact path="/:workspaceId/:drawingId">
            <Drawing />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
