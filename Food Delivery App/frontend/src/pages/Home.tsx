import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
function Home() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-5xl font-bold">
          Delicious food,
          <br />
          delivered to your door.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
          Discover restaurants, explore menus, and order your favorite food.
        </p>

        <Link to="/restaurants">
          <Button>Order Now</Button>
        </Link>
      </main>
    </div>
  );
}

export default Home;
