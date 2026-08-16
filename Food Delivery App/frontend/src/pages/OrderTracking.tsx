import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { getOrders } from "@/lib/api";

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
  OrderItems: OrderItem[];
  DeliveryStatuses: DeliveryStatus[];
};

function OrderTracking() {
  const { orderId } = useParams({
    from: "/orders/$orderId",
  });

  const [order, setOrder] = useState<Order | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        const orders = await getOrders();

        const foundOrder = orders.find(
          (order: Order) =>
            order.id === Number(orderId),
        );

        if (!foundOrder) {
          setError("Order not found");
          return;
        }

        setOrder(foundOrder);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load order",
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading order...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">
          {error || "Order not found"}
        </h1>
      </div>
    );
  }

  const currentStatus = order.status;

  const statuses = [
    "Placed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStatusIndex =
    statuses.indexOf(currentStatus);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          Track Order
        </h1>

        <p className="mt-2 text-muted-foreground">
          Order #{order.id}
        </p>

        {/* Order Status */}
        <div className="mt-8 rounded-xl border p-6">
          <h2 className="text-xl font-semibold">
            Order Status
          </h2>

          <div className="mt-6 space-y-6">
            {statuses.map((status, index) => {
              const completed =
                index <= currentStatusIndex;

              return (
                <div key={status}>
                  <p
                    className={
                      completed
                        ? "font-medium"
                        : "font-medium text-muted-foreground"
                    }
                  >
                    {completed ? "✓" : "○"} {status}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {status === "Placed" &&
                      "Your order has been received."}

                    {status === "Preparing" &&
                      "The restaurant is preparing your food."}

                    {status === "Out for Delivery" &&
                      "Your order is on the way."}

                    {status === "Delivered" &&
                      "Your order has been delivered."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-6 rounded-xl border p-6">
          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-4 space-y-2">
            {order.OrderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
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

          <div className="mt-4 border-t pt-4 font-semibold">
            <div className="flex justify-between">
              <span>Total</span>

              <span>
                ₹{Number(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;