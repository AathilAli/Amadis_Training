import { Button } from "@/components/ui/button";
import type { MenuItem as MenuItemType } from "@/types/menu";
type MenuItemProps = {
  item: MenuItemType;
  onAdd: (item: MenuItemType) => void;
  isAdded: boolean;
};

function MenuItem({
  item,
  onAdd,
  isAdded,
}: MenuItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
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

      <Button onClick={() => onAdd(item)}>
        {isAdded ? "Added ✓" : "Add"}
      </Button>
    </div>
  );
}

export default MenuItem;