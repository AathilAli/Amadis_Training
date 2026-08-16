import {
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderTracking from "./pages/OrderTracking";

function RootLayout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Outlet />
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});

const restaurantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurants",
  component: Restaurants,
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restaurants/$restaurantId",
  component: Menu,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$orderId",
  component: OrderTracking,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  restaurantsRoute,
  menuRoute,
  cartRoute,
  ordersRoute,
  orderTrackingRoute,
]);

export const router = createRouter({
  routeTree,
});
