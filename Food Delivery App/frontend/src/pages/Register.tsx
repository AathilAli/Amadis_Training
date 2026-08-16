import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
      await registerUser({
        name,
        email,
        password,
        role: "customer",
      });

      navigate({
        to: "/login",
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="text-2xl font-bold">
          Create Account
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your Foodie account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;