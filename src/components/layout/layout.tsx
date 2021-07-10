import { WorkspaceMenu } from "components/workspaces/workspace-menu";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { nhost } from "utils/nhost";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-screen grid grid-cols-12">
      <div className="col-span-2 grid grid-cols-1 place-content-between">
        <div>
          <div>
            <Link to={`/`}>Nhost - Draw</Link>
          </div>
          <div>
            <Switch>
              <Route path="/:workspaceSlug">
                <WorkspaceMenu />
              </Route>
            </Switch>
          </div>
        </div>
        <div>
          <button
            className="flex items-center w-full text-center py-3"
            onClick={() => nhost.auth.logout()}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="col-span-10 w-fullghkj">{children}</div>
    </div>
  );
}
