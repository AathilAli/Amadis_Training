import { BarChart3, CheckCircle2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  packed: number;
  total: number;
}

export function ProgressIndicator({ packed, total }: ProgressIndicatorProps) {
  const percentage = total === 0 ? 0 : Math.round((packed / total) * 100);

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/60 text-slate-100 shadow-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

      <CardContent className="space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-linear-to-br from-sky-500/40 to-indigo-600/30 text-sky-100 shadow-lg">
              <BarChart3 className="h-5 w-5" />
            </span>

            <h2 className="text-xl font-bold text-white">Packing Progress</h2>
          </div>

          <span className="rounded-full border border-sky-300/20 bg-sky-500/15 px-3 py-1 text-sm font-semibold text-sky-200">
            {percentage}%
          </span>
        </div>

        <Progress
          value={percentage}
          className="h-3 bg-slate-700/70 [&>div]:bg-linear-to-r [&>div]:from-sky-400 [&>div]:to-indigo-500"
        />

        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>
            {packed} / {total} Packed
          </span>

          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />

            <span>{total - packed} Remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}