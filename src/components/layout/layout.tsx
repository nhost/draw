import { useState } from "react";
import { WorkspaceMenu } from "components/workspaces/workspace-menu";
import { Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { nhost } from "utils/nhost";
import classNames from "classnames";
import { DrawingMenu } from "components/drawings/drawing-menu";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const classesLeft = classNames([
    "grid grid-cols-1 place-content-between border-r",
    {
      "col-span-2 ": isMenuOpen,
      "col-span-0 hidden": !isMenuOpen,
    },
  ]);

  const classesRight = classNames([
    "w-full relative",
    {
      "col-span-10 ": isMenuOpen,
      "col-span-12": !isMenuOpen,
    },
  ]);

  return (
    <div className="h-screen w-screen grid grid-cols-12">
      <div className={classesLeft}>
        <div>
          <div>
            <Link to={`/`}>Nhost - Draw</Link>
          </div>
          <div>
            <Switch>
              <Route exact path="/:workspaceSlug/:collectionId?">
                <WorkspaceMenu />
              </Route>
              <Route path="/:workspaceSlug/:collectionId/:drawingId">
                <DrawingMenu />
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
      <div className={classesRight}>
        <div
          className="absolute left-0 border rounded-full w-12 h-12 flex items-center justify-center top-2 z-50 bg-indigo-700 cursor-pointer"
          style={{
            transform: `translate(-25px, 0)`,
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></div>
        {children}
      </div>
    </div>
  );
}
