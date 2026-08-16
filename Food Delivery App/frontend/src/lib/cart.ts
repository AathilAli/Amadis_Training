import type { MenuItem } from "@/types/menu";
const CART_KEY = "foodie-cart";

export type CartItem = MenuItem & {
  quantity: number;
};

export function getCart(): CartItem[] {
  const data = localStorage.getItem(CART_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

export function addToCart(item: MenuItem) {
  const cart = getCart();

  const existingItem = cart.find(
    (cartItem) => cartItem.id === item.id,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart),
  );
}

export function removeFromCart(id: number) {
  const cart = getCart();

  const updatedCart = cart.filter(
    (item) => item.id !== id,
  );

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart),
  );
}

export function updateCartQuantity(
  id: number,
  quantity: number,
): CartItem[] {
  const cart = getCart();

  const updatedCart = cart
    .map((item) =>
      item.id === id
        ? { ...item, quantity }
        : item,
    )
    .filter((item) => item.quantity > 0);

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(updatedCart),
  );

  return updatedCart;
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}