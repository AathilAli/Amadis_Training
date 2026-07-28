import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
} from "@tanstack/react-router";
import Home from "./components/home";
import Calculator from "./components/Calculator";
import History from "./components/History";
import { Link } from "@tanstack/react-router";

function Root() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/calculator">Calculator</Link> |{" "}
                <Link to="/history">History</Link>
            </nav>

            <h2>Calculator App</h2>

            <Outlet />
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