import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  getCurrentUser,
  logout,
} from "@/lib/auth";

function Navbar() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  function handleLogout() {
    logout();

    navigate({
      to: "/",
    });
  }

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold"
        >
          Foodie
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link to="/restaurants">
            Restaurants
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/cart">
            <Button variant="outline">
              Cart
            </Button>
          </Link>

          {user ? (
            <>
              <span className="font-medium">
                Hi, {user.name}
              </span>

              <Button
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="outline">
                Login
              </Button>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;