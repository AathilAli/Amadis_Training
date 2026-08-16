const API_URL = "http://localhost:5000/api";

export async function getRestaurants() {
  const response = await fetch(`${API_URL}/restaurants`);

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return response.json();
}

export async function getMenuItems(
  restaurantId: string,
) {
  const response = await fetch(
    `${API_URL}/restaurants/${restaurantId}/menu`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  return response.json();
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Registration failed",
    );
  }

  return result;
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Login failed",
    );
  }

  return result;
}

export async function createOrder(data: {
  restaurantId: number;
  items: {
    menuItemId: number;
    quantity: number;
  }[];
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login before placing an order");
  }

  const response = await fetch(
    `${API_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to place order",
    );
  }

  return result;
}

export async function getOrders() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  const response = await fetch(
    `${API_URL}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch orders",
    );
  }

  return result;
}