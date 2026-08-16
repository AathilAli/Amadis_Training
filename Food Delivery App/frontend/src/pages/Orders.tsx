import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "@tanstack/react-router";

import { getOrders } from "@/lib/api";
import { Button } from "@/components/ui/button";

type MenuItem = {
  id: number;
  name: string;
  price: number | string;
  description: string;
};

type OrderItem = {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  price: number | string;
  MenuItem: MenuItem;
};

type DeliveryStatus = {
  id: number;
  orderId: number;
  status: string;
  updatedBy: number;
  createdAt: string;
};

type Order = {
  id: number;
  userId: number;
  restaurantId: number;
  total: number | string;
  status: string;
  createdAt: string;
  updatedAt: string;
  OrderItems: OrderItem[];
  DeliveryStatuses: DeliveryStatus[];
};

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();

        setOrders(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load orders",
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading orders...
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

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">
          No Orders Yet
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your orders will appear here.
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
          Your Orders
        </h1>

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    Order #{order.id}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {new Date(
                      order.createdAt,
                    ).toLocaleString()}
                  </p>
                </div>

                <span className="rounded-full bg-muted px-3 py-1 text-sm">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.OrderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.MenuItem.name} ×{" "}
                      {item.quantity}
                    </span>

                    <span>
                      ₹
                      {Number(item.price) *
                        item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="font-semibold">
                  Total: ₹{Number(order.total)}
                </span>

                <Button
                  variant="outline"
                  onClick={() =>
                    navigate({
                      to: "/orders/$orderId",
                      params: {
                        orderId: String(order.id),
                      },
                    })
                  }
                >
                  Track Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;