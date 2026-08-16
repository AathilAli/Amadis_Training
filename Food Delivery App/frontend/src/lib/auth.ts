export type User = {
  id: number;
  name: string;
  email: string;
  role: "customer" | "restaurant_owner" | "delivery_staff";
};

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}

export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}