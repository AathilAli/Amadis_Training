import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plane, MapPin, CalendarDays, Backpack } from "lucide-react";

import { createTrip } from "@/services/tripService";
import { generateChecklist } from "@/utils/checklist";

import type { Trip } from "@/types/trip";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const activities = [
  "Hiking",
  "Swimming",
  "Camping",
  "Photography",
  "Business",
  "City Tour",
];

export function TripForm() {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("1");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleActivityChange = (activity: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities((prev) => [...prev, activity]);
    } else {
      setSelectedActivities((prev) => prev.filter((item) => item !== activity));
    }
  };

const handleSubmit = () => {
  if (!tripName.trim()) {
    alert("Please enter a trip name.");
    return;
  }

  if (!destination.trim()) {
    alert("Please enter a destination.");
    return;
  }

  if (!days.trim()) {
    alert("Please enter the number of days.");
    return;
  }

  if (Number(days) < 1) {
    alert("Number of days must be at least 1.");
    return;
  }

  const checklist = generateChecklist(
    destination,
    selectedActivities
  );

  const trip: Trip = {
    id: crypto.randomUUID(),
    name: tripName,
    destination,
    days: Number(days),
    activities: selectedActivities,
    checklist,
    createdAt: new Date().toISOString(),
  };

  createTrip(trip);

  navigate({
    to: "/",
  });
};

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 text-slate-100 shadow-2xl backdrop-blur-2xl">
      {/* Local styles: button shimmer (safe to copy-paste, no config needed) */}
      <style>{`
        @keyframes tpp-shimmer {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%)  skewX(-20deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="tpp-"] { animation: none !important; }
        }
      `}</style>

      {/* glossy top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />

      <CardContent className="relative space-y-8 p-8">
        {/* Trip Name */}
        <div className="space-y-2">
          <Label
            htmlFor="tripName"
            className="flex items-center gap-2 font-semibold text-slate-200"
          >
            <Plane className="h-4 w-4 text-sky-300" />
            Trip Name
          </Label>

          <Input
            id="tripName"
            className="h-11 rounded-xl border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400 backdrop-blur-md transition-colors focus-visible:border-sky-300/40 focus-visible:ring-sky-400/30"
            placeholder="Enter trip name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label
            htmlFor="destination"
            className="flex items-center gap-2 font-semibold text-slate-200"
          >
            <MapPin className="h-4 w-4 text-rose-300" />
            Destination Type
          </Label>

          <Input
            id="destination"
            className="h-11 rounded-xl border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400 backdrop-blur-md transition-colors focus-visible:border-sky-300/40 focus-visible:ring-sky-400/30"
            placeholder="Beach, City, Mountain..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Days */}
        <div className="space-y-2">
          <Label
            htmlFor="days"
            className="flex items-center gap-2 font-semibold text-slate-200"
          >
            <CalendarDays className="h-4 w-4 text-emerald-300" />
            Number of Days
          </Label>

          <Input
            id="days"
            className="h-11 rounded-xl border-white/15 bg-white/5 text-slate-100 placeholder:text-slate-400 backdrop-blur-md transition-colors focus-visible:border-sky-300/40 focus-visible:ring-sky-400/30"
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        {/* Activities */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 font-semibold text-slate-200">
            <Backpack className="h-4 w-4 text-orange-300" />
            Activities
          </Label>

          <div className="grid gap-4 md:grid-cols-2">
            {activities.map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-white/10"
              >
                <Checkbox
                  id={activity}
                  checked={selectedActivities.includes(activity)}
                  onCheckedChange={(checked) =>
                    handleActivityChange(activity, Boolean(checked))
                  }
                  className="border-white/30 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-500"
                />

                <Label htmlFor={activity} className="cursor-pointer text-slate-200">
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.7)]"
          onClick={handleSubmit}
        >
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md"
            style={{ animation: "tpp-shimmer 3s ease-in-out infinite" }}
          />
          Create Trip
        </Button>
      </CardContent>
    </Card>
  );
}