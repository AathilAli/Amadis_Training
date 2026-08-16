import { Link } from "@tanstack/react-router";

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
};

type RestaurantCardProps = {
  restaurant: Restaurant;
};

function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link
      to="/restaurants/$restaurantId"
      params={{ restaurantId: String(restaurant.id) }}
      className="block rounded-xl border p-4 transition hover:shadow-md"
    >
      <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-muted">
        <span className="text-4xl">🍽️</span>
      </div>

      <h3 className="text-lg font-semibold">
        {restaurant.name}   
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {restaurant.cuisine}
      </p>

      <div className="mt-3 flex justify-between text-sm">
        <span>⭐ {restaurant.rating}</span>
        <span>{restaurant.deliveryTime}</span>
      </div>
    </Link>
  );
}

export default RestaurantCard;