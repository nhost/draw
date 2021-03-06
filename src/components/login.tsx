import { useState } from "react";
import { useHistory } from "react-router";
import { nhost } from "utils/nhost";
import { Button, TextField } from "./ui";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    // login
    try {
      await nhost.auth.login({ email, password });
    } catch (error) {
      alert("error logging in");
      console.error(error);
      return;
    }

    // redirect back to `/`
    history.push("/");
  }
  return (
    <div className="container mx-auto max-w-screen-md">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus={true}
            />
          </div>
          <div>
            <TextField
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Login</Button>
          </div>
        </form>
        <div>
          <div onClick={() => nhost.auth.login({ provider: "github" })}>
            or login with GitHub
          </div>
        </div>
      </div>
    </div>
  );
}
