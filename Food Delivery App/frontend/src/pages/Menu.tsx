import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { getMenuItems, getRestaurants } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";

type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number | string;
  deliveryTime: string;
};

type MenuItem = {
  id: number;
  restaurantId: number;
  name: string;
  price: number | string;
  description: string;
};

function Menu() {
  const [restaurant, setRestaurant] =
    useState<Restaurant | null>(null);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [addedItemId, setAddedItemId] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { restaurantId } = useParams({
    from: "/restaurants/$restaurantId",
  });

  useEffect(() => {
    async function loadMenu() {
      try {
        const restaurants = await getRestaurants();

        const foundRestaurant = restaurants.find(
          (restaurant: Restaurant) =>
            restaurant.id === Number(restaurantId),
        );

        if (!foundRestaurant) {
          setError("Restaurant not found");
          return;
        }

        setRestaurant({
          ...foundRestaurant,
          rating: Number(foundRestaurant.rating),
        });

        const data = await getMenuItems(restaurantId);

        const formattedMenuItems: MenuItem[] =
          data.map((item: MenuItem) => ({
            ...item,
            price: Number(item.price),
          }));

        setMenuItems(formattedMenuItems);
      } catch (error) {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading menu...
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Restaurant not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          {restaurant.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {restaurant.cuisine} • ⭐ {restaurant.rating} •{" "}
          {restaurant.deliveryTime}
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Menu
        </h2>

        <div className="mt-6 space-y-4">
          {menuItems.length === 0 ? (
            <p className="text-muted-foreground">
              No menu items available.
            </p>
          ) : (
            menuItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>

                  <p className="mt-2 font-medium">
                    ₹{item.price}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    addToCart({
                      ...item,
                      price: Number(item.price),
                    });

                    setAddedItemId(item.id);
                  }}
                >
                  {addedItemId === item.id
                    ? "Added ✓"
                    : "Add"}
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;