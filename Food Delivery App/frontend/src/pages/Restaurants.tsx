import { useEffect, useState } from "react";
import { getRestaurants } from "@/lib/api";
import RestaurantCard from "@/components/RestaurantCard";
import { Button } from "@/components/ui/button";

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
};

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  async function loadRestaurants() {
    try {
      const data = await getRestaurants();

      const formattedRestaurants: Restaurant[] =
        data.map(
          (restaurant: {
            id: number;
            name: string;
            cuisine: string;
            rating: number | string;
            deliveryTime: string;
          }) => ({
            ...restaurant,
            rating: Number(restaurant.rating),
          }),
        );

      setRestaurants(formattedRestaurants);
    } catch (error) {
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  }

  loadRestaurants();
}, []);

  const cuisines = [
    "All",
    ...new Set(
      restaurants.map((restaurant) => restaurant.cuisine),
    ),
  ];

  const filteredRestaurants = restaurants.filter(
    (restaurant) => {
      const matchesCuisine =
        selectedCuisine === "All" ||
        restaurant.cuisine === selectedCuisine;

      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCuisine && matchesSearch;
    },
  );

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading restaurants...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          Restaurants
        </h1>

        <p className="mt-2 text-muted-foreground">
          Discover the best restaurants near you.
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="mt-6 w-full rounded-md border px-4 py-2 outline-none focus:ring-2"
        />

        {/* Cuisine filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {cuisines.map((cuisine) => (
            <Button
              key={cuisine}
              variant={
                selectedCuisine === cuisine
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setSelectedCuisine(cuisine)
              }
            >
              {cuisine}
            </Button>
          ))}
        </div>

        {/* Restaurant cards */}
        {filteredRestaurants.length === 0 ? (
          <p className="mt-8 text-center text-muted-foreground">
            No restaurants found. Try a different search
            or cuisine.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Restaurants;