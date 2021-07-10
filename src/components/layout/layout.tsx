import { nhost } from "utils/nhost";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="container mx-auto my-3">
        <div className="flex items-center justify-between">
          <div>Nhost - Draw</div>
          <div>
            <button onClick={() => nhost.auth.logout()}>Logout</button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
