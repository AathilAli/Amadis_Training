import { createFileRoute } from "@tanstack/react-router";
import { TripChecklistPage } from "@/components/trip/TripCheckListPage";

export const Route = createFileRoute("/trip/$tripId")({

  component: TripChecklistPage,
});