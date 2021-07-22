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
            <Link to={`/`}>
              <div className="py-2 px-3">Nhost - Draw</div>
            </Link>
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
            className="flex items-center w-full text-center py-3 bg-red-100 px-4 text-gray-600 hover:bg-red-300 transition-all duration-150 ease-in-out"
            onClick={() => nhost.auth.logout()}
          >
            Logout
          </button>
        </div>
      </div>
      <div className={classesRight}>
        <div
          className="absolute left-0 border rounded-full w-12 h-12 flex items-center justify-center top-2 border-gray-400 z-50 cursor-pointer bg-opacity-50"
          style={{
            transform: `translate(-25px, 0)`,
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
          {!isMenuOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
