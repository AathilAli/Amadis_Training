import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "@tanstack/react-router";

import { createOrder } from "@/lib/api";

import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

import { Button } from "@/components/ui/button";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  function handleQuantityChange(
    id: number,
    quantity: number,
  ) {
    const updatedCart = updateCartQuantity(
      id,
      quantity,
    );

    setCartItems(updatedCart);
  }

  function handleRemove(id: number) {
    removeFromCart(id);
    setCartItems(getCart());
  }

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    // Get restaurant ID from the cart
    const restaurantId = cartItems[0].restaurantId;

    // Make sure all items belong to the same restaurant
    const sameRestaurant = cartItems.every(
      (item) =>
        item.restaurantId === restaurantId,
    );

    if (!sameRestaurant) {
      setError(
        "You can only order from one restaurant at a time.",
      );
      return;
    }

    try {
      setLoading(true);

      const result = await createOrder({
        restaurantId,
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      });

      // Clear cart after successful order
      localStorage.removeItem("foodie-cart");
      setCartItems([]);

      // Go to order tracking
      navigate({
        to: "/orders/$orderId",
        params: {
          orderId: String(result.order.id),
        },
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to place order",
      );
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add some delicious food to your cart.
        </p>

        <Link to="/restaurants">
          <Button className="mt-6">
            Browse Restaurants
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          Your Cart
        </h1>

        <div className="mt-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h2 className="font-semibold">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  ₹{item.price} each
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantityChange(
                      item.id,
                      item.quantity - 1,
                    )
                  }
                >
                  -
                </Button>

                <span className="w-6 text-center">
                  {item.quantity}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantityChange(
                      item.id,
                      item.quantity + 1,
                    )
                  }
                >
                  +
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    handleRemove(item.id)
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p className="mt-6 text-center text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="mt-8 rounded-xl border p-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Button
            className="mt-4 w-full"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;