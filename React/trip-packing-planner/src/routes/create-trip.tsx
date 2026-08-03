import { createFileRoute } from "@tanstack/react-router";
import { CreateTripPage } from "@/components/trip/CreateTripPage";

export const Route = createFileRoute("/create-trip")({
  component: CreateTripPage,
});