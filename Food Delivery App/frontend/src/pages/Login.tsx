import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { loginUser } from "@/lib/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await loginUser({
        email,
        password,
      });

      // Save JWT
      localStorage.setItem(
        "token",
        result.token,
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(result.user),
      );

      navigate({
        to: "/",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-muted-foreground">
          Login to your Foodie account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              className="mt-1 w-full rounded-md border px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border px-4 py-2"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;