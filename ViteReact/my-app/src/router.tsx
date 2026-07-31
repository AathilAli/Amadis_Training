import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { Link } from "@tanstack/react-router";
import Home from "./component/home";
import Calculator from "./component/Calculator";
import History from "./component/History";

function Root() {
  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 px-8 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 text-lg font-bold text-white shadow-md shadow-emerald-500/30">
              =
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Calculator
            </span>
          </Link>

          <div className="flex gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
            <Link
              to="/"
              replace={true}
              activeProps={{
                className: "bg-emerald-500/20 text-emerald-400",
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all duration-200 hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/calculator"
              activeProps={{
                className: "bg-emerald-500/20 text-emerald-400",
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all duration-200 hover:text-white"
            >
              Calculator
            </Link>

            <Link
              to="/history"
              activeProps={{
                className: "bg-emerald-500/20 text-emerald-400",
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white/60 transition-all duration-200 hover:text-white"
            >
              History
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-linear-to-br from-indigo-950 via-slate-950 to-black">
        <Outlet />
      </main>
    </>
  );
}

const rootRoute = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator",
  component: Calculator,
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: History,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  calculatorRoute,
  historyRoute,
]);

export const router = createRouter({
  routeTree,
});