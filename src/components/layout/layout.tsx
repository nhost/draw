import { Link } from "react-router-dom";
import { nhost } from "utils/nhost";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="container mx-auto my-3">
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/`}>Nhost - Draw</Link>
          </div>
          <div>
            <button onClick={() => nhost.auth.logout()}>Logout</button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
