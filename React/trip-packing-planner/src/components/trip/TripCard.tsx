import { Link } from "@tanstack/react-router";
import { MapPin, CalendarDays, Trash2, ArrowRight } from "lucide-react";

import type { Trip } from "@/types/trip";

import { deleteTrip } from "@/services/tripService";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface TripCardProps {
  trip: Trip;
  onDelete: () => void;
}

export function TripCard({ trip, onDelete }: TripCardProps) {
  function handleDelete() {
    const confirmDelete = window.confirm(`Delete "${trip.name}"?`);

    if (!confirmDelete) {
      return;
    }

    deleteTrip(trip.id);

    onDelete();
  }

  return (
    <Card className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 text-slate-100 shadow-2xl transition-all duration-500 hover:border-sky-300/30 hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.5)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/0 blur-3xl transition-all duration-500 group-hover:bg-sky-400/20" />

      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          {trip.name}
        </CardTitle>

        <CardDescription className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-sky-300" />
            {trip.destination}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-indigo-300" />
            {trip.days} Days
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Activities
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {trip.activities.length === 0 ? (
              <span className="rounded-full border border-white/10 bg-slate-800/70 px-3 py-1 text-sm text-slate-400">
                None
              </span>
            ) : (
              trip.activities.map((activity) => (
                <span
                  key={activity}
                  className="rounded-full border border-sky-300/20 bg-sky-500/15 px-3 py-1 text-sm font-medium text-sky-200 transition-colors duration-300 hover:bg-sky-500/25"
                >
                  {activity}
                </span>
              ))
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Link to="/trip/$tripId" params={{ tripId: trip.id }} className="flex-1">
          <Button className="group/btn w-full rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
            View Checklist
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </Link>

        <Button
          variant="destructive"
          onClick={handleDelete}
          className="rounded-xl border border-red-400/20 bg-red-500/25 text-red-200 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500/50 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}