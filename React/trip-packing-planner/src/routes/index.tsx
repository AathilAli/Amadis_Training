import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/trip/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});