import { useState } from "react";
import { MapPin, CalendarDays, PartyPopper, ClipboardList } from "lucide-react";

import { Route } from "@/routes/trip.$tripId";

import {
  getTripById,
  toggleChecklistItem,
  updateTripActivities,
} from "@/services/tripService";

import { ChecklistSection } from "@/components/checklist/ChecklistSection";
import { ProgressIndicator } from "@/components/checklist/ProgressIndicator";
import { EditActivities } from "@/components/trip/EditActivities";


import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TripChecklistPage() {
  const { tripId } = Route.useParams();

  const [trip, setTrip] = useState(() => getTripById(tripId));

  if (!trip) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 px-10 py-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white">Trip Not Found</h1>
        </div>
      </main>
    );
  }

  const totalItems = trip.checklist.reduce(
    (total, section) => total + section.items.length,
    0
  );

  const packedItems = trip.checklist.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.packed).length,
    0
  );

  function handleToggle(tripId: string, sectionId: string, itemId: string) {
    toggleChecklistItem(tripId, sectionId, itemId);

    setTrip(getTripById(tripId)!);
  }

  function handleActivityUpdate(activities: string[]) {
    const currentTrip = trip!;

    const oldSections = currentTrip.checklist.map((section) => section.id);

    const updatedTrip = updateTripActivities(currentTrip.id, activities);

    if (!updatedTrip) return;

    setTrip(updatedTrip);

    const newSection = updatedTrip.checklist.find(
      (section) => !oldSections.includes(section.id)
    );

    if (newSection) {
      setTimeout(() => {
        document.getElementById(newSection.id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <style>{`
        @keyframes tpp-aurora {
          0%   { transform: translate3d(-8%, -6%, 0) scale(1);   }
          50%  { transform: translate3d(8%, 6%, 0)  scale(1.15); }
          100% { transform: translate3d(-8%, -6%, 0) scale(1);   }
        }
        @keyframes tpp-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes tpp-pop {
          0%   { transform: scale(0.9); opacity: 0; }
          60%  { transform: scale(1.04); }
          100% { transform: scale(1); opacity: 1; }
        }
        .tpp-rise   { animation: tpp-rise 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .tpp-rise-1 { animation-delay: 0.05s; }
        .tpp-rise-2 { animation-delay: 0.15s; }
        .tpp-rise-3 { animation-delay: 0.25s; }
        .tpp-rise-4 { animation-delay: 0.35s; }
        @media (prefers-reduced-motion: reduce) {
          [class*="tpp-"] { animation: none !important; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute -top-1/3 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-sky-500/15 blur-[120px]"
        style={{ animation: "tpp-aurora 18s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-1/4 h-[65vh] w-[65vh] rounded-full bg-indigo-500/15 blur-[120px]"
        style={{ animation: "tpp-aurora 22s ease-in-out infinite reverse" }}
      />

      <div className="relative mx-auto max-w-6xl space-y-8 px-6 py-12">
        {/* Header */}
        <Card className="tpp-rise tpp-rise-1 relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />
          <CardContent className="space-y-4 p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-linear-to-br from-sky-500/40 to-indigo-600/30 text-sky-100 shadow-xl">
                <ClipboardList className="h-7 w-7" />
              </span>

              <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(56,189,248,0.35)]">
                {trip.name}
              </h1>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-300">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sky-300" />
                {trip.destination}
              </div>

              <div className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-indigo-300" />
                {trip.days} Days
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Activities */}
        <Card className="tpp-rise tpp-rise-2 relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
          <CardContent className="p-6">
            <EditActivities
              selectedActivities={trip.activities}
              onSave={handleActivityUpdate}
            />
          </CardContent>
        </Card>

        {/* Progress */}
        <Card className="tpp-rise tpp-rise-3 relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
          <CardContent className="p-6">
            <ProgressIndicator packed={packedItems} total={totalItems} />
          </CardContent>
        </Card>

        {/* Success */}
        {packedItems === totalItems && totalItems > 0 && (
          <Card
            className="relative overflow-hidden rounded-3xl border border-emerald-300/30 bg-emerald-500/15 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.5)]"
            style={{ animation: "tpp-pop 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-200/60 to-transparent" />
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
            <CardContent className="p-8 text-center">
              <PartyPopper className="mx-auto mb-4 h-12 w-12 text-emerald-300 drop-shadow-[0_2px_12px_rgba(16,185,129,0.6)]" />

              <h2 className="text-3xl font-black text-emerald-200">
                You're Ready!
              </h2>

              <p className="mt-3 text-emerald-100/90">
                Everything is packed. Have a safe trip!
              </p>
            </CardContent>
          </Card>
        )}

        <Separator className="bg-white/10" />

        {/* Checklist */}
        <div className="tpp-rise tpp-rise-4 space-y-6">
          {trip.checklist.map((section) => (
            <ChecklistSection
              key={section.id}
              section={section}
              tripId={trip.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </main>
  );
}