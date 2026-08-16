type OrderStatusProps = {
  status: "Placed" | "Preparing" | "Out for Delivery" | "Delivered";
};

const statuses = [
  "Placed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
] as const;

function OrderStatus({ status }: OrderStatusProps) {
  const currentIndex = statuses.indexOf(status);

  return (
    <div className="mt-6 space-y-6">
      {statuses.map((item, index) => {
        const completed = index <= currentIndex;

        return (
          <div key={item}>
            <p
              className={
                completed
                  ? "font-medium"
                  : "text-muted-foreground"
              }
            >
              {completed ? "✓" : "○"} {item}
            </p>

            {item === "Placed" && (
              <p className="text-sm text-muted-foreground">
                Your order has been received.
              </p>
            )}

            {item === "Preparing" && (
              <p className="text-sm text-muted-foreground">
                The restaurant is preparing your food.
              </p>
            )}

            {item === "Out for Delivery" && (
              <p className="text-sm text-muted-foreground">
                Your order is on the way.
              </p>
            )}

            {item === "Delivered" && (
              <p className="text-sm text-muted-foreground">
                Your order has been delivered.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatus;