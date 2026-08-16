import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Foodie
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/restaurants">Restaurants</Link>

          <Link to="/orders">Orders</Link>

          <Link to="/cart">
            <Button variant="outline">Cart</Button>
          </Link>

          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
