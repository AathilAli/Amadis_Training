import { TripForm } from "@/components/trip/TripForm";
import { Luggage } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function CreateTripPage() {
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
        .tpp-rise { animation: tpp-rise 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          [class*="tpp-"] { animation: none !important; }
        }
      `}</style>

      {/* Animated aurora background */}
      <div
        className="pointer-events-none absolute -top-1/3 -left-1/4 h-[70vh] w-[70vh] rounded-full bg-sky-500/15 blur-[120px]"
        style={{ animation: "tpp-aurora 18s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-1/4 h-[65vh] w-[65vh] rounded-full bg-indigo-500/15 blur-[120px]"
        style={{ animation: "tpp-aurora 22s ease-in-out infinite reverse" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-10">
        <Card className="tpp-rise relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />

          <CardContent className="relative p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl border border-white/15 bg-linear-to-br from-sky-500/40 to-indigo-600/30 p-3 shadow-xl">
                <Luggage className="h-8 w-8 text-sky-100" />
              </div>

              <div>
                <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(56,189,248,0.35)]">
                  Create New Trip
                </h1>

                <p className="mt-2 text-slate-300">
                  Fill in your trip details to generate a personalized packing checklist.
                </p>
              </div>
            </div>

            <TripForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}