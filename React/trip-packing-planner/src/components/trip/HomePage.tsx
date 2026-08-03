import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Luggage, Plus, Compass, Plane, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import type { Trip } from "@/types/trip";

import { getTrips } from "@/services/tripService";

import { TripCard } from "./TripCard";

export function HomePage() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  function refreshTrips() {
    setTrips(getTrips());
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 perspective-[1600px]">
      <style>{`
        @keyframes tpp-aurora {
          0%   { transform: translate3d(-8%, -6%, 0) scale(1);   }
          50%  { transform: translate3d(8%, 6%, 0)  scale(1.15); }
          100% { transform: translate3d(-8%, -6%, 0) scale(1);   }
        }
        @keyframes tpp-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-22px) rotate(6deg); }
        }
        @keyframes tpp-float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50%      { transform: translateY(18px) translateX(-14px); }
        }
        @keyframes tpp-grid-pan {
          0%   { background-position: 0 0; }
          100% { background-position: 60px 60px; }
        }
        @keyframes tpp-shimmer {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(220%)  skewX(-20deg); }
        }
        @keyframes tpp-rise {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes tpp-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(56,189,248,0.45); }
          70%  { box-shadow: 0 0 0 18px rgba(56,189,248,0); }
          100% { box-shadow: 0 0 0 0 rgba(56,189,248,0); }
        }
        .tpp-rise   { animation: tpp-rise 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .tpp-rise-1 { animation-delay: 0.05s; }
        .tpp-rise-2 { animation-delay: 0.18s; }
        .tpp-rise-3 { animation-delay: 0.32s; }
        .tpp-3d-hover {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
        }
        .tpp-3d-hover:hover { transform: translateY(-8px) rotateX(3deg) rotateY(-3deg); }
        .tpp-3d-hover:hover .tpp-lift { transform: translateZ(24px); }
        .tpp-lift { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
        @media (prefers-reduced-motion: reduce) {
          [class*="tpp-"] { animation: none !important; }
        }
      `}</style>

      {/* Animated aurora background */}
      <div
        className="pointer-events-none absolute -top-1/3 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-sky-500/20 blur-[120px]"
        style={{ animation: "tpp-aurora 18s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-1/4 h-[65vh] w-[65vh] rounded-full bg-indigo-500/15 blur-[120px]"
        style={{ animation: "tpp-aurora 22s ease-in-out infinite reverse" }}
      />
      <div
        className="pointer-events-none absolute -bottom-1/3 left-1/4 h-[60vh] w-[60vh] rounded-full bg-cyan-400/15 blur-[120px]"
        style={{ animation: "tpp-aurora 26s ease-in-out infinite" }}
      />

      {/* Moving grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "tpp-grid-pan 8s linear infinite",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      {/* Floating travel icons */}
      <Plane
        className="pointer-events-none absolute left-[8%] top-[22%] h-10 w-10 text-sky-300/30"
        style={{ animation: "tpp-float 9s ease-in-out infinite" }}
      />
      <MapPin
        className="pointer-events-none absolute right-[12%] top-[34%] h-9 w-9 text-cyan-300/30"
        style={{ animation: "tpp-float-slow 11s ease-in-out infinite" }}
      />
      <Sparkles
        className="pointer-events-none absolute left-[18%] bottom-[16%] h-8 w-8 text-indigo-300/30"
        style={{ animation: "tpp-float 13s ease-in-out infinite" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="tpp-rise tpp-rise-1">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-1.5 text-sm font-medium text-sky-200 shadow-lg">
              <Compass className="h-4 w-4 animate-pulse" />
              Your travel companion
            </div>

            <h1 className="flex items-center gap-4 text-4xl font-black tracking-tight sm:text-6xl">
              <span
                className="tpp-3d-hover flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-linear-to-br from-sky-500/40 to-indigo-600/30 text-sky-100 shadow-2xl"
                style={{ animation: "tpp-pulse-ring 3.5s ease-out infinite" }}
              >
                <Luggage className="tpp-lift h-8 w-8 drop-shadow-lg" />
              </span>
              <span className="bg-linear-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(56,189,248,0.35)]">
                Trip Packing Planner
              </span>
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
              Plan your trip and never forget your travel essentials.
            </p>
          </div>

          <div className="tpp-rise tpp-rise-2">
            <Link to="/create-trip">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-sky-500 to-indigo-600 px-7 py-6 text-base shadow-[0_10px_40px_-10px_rgba(56,189,248,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.7)]"
              >
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md"
                  style={{ animation: "tpp-shimmer 3s ease-in-out infinite" }}
                />
                <Plus className="mr-1 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
                Create New Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        {trips.length === 0 ? (
          <Card className="tpp-rise tpp-rise-3 tpp-3d-hover group relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
            <CardHeader className="tpp-lift">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-linear-to-br from-sky-500/40 to-indigo-600/30 text-sky-100 shadow-xl"
                style={{ animation: "tpp-float 6s ease-in-out infinite" }}
              >
                <Luggage className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl text-white">No trips yet</CardTitle>

              <CardDescription className="text-base text-slate-300">
                Create your first trip and start planning your packing checklist.
              </CardDescription>
            </CardHeader>

            <CardContent className="tpp-lift">
              <Link to="/create-trip">
                <Button className="group/btn relative overflow-hidden rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  <span
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md"
                    style={{ animation: "tpp-shimmer 3s ease-in-out infinite" }}
                  />
                  <Plus className="mr-1 h-4 w-4" />
                  Create Your First Trip
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip, i) => (
              <div
                key={trip.id}
                className="tpp-rise tpp-3d-hover"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <TripCard trip={trip} onDelete={refreshTrips} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}