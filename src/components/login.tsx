import { useState } from "react";
import { useHistory } from "react-router";
import { nhost } from "utils/nhost";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
