import { Redirect } from "react-router-dom";
import { useAuth } from "@nhost/react-auth";

export function AuthGate({ children }: { children: JSX.Element }): JSX.Element {
  const { signedIn } = useAuth();

  if (signedIn === null) {
    return <div>Logging in...</div>;
  }

  if (!signedIn) {
    return <Redirect to="/login" />;
  }

  return children;
}
