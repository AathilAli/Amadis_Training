import type { ChecklistItem as ChecklistItemType } from "@/types/trip";

import { CheckCircle2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: () => void;
}

export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
        item.packed
          ? "border-emerald-300/30 bg-emerald-500/15 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.5)]"
          : "border-white/10 bg-slate-800/60 hover:border-sky-300/30 hover:bg-slate-800/90"
      }`}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={item.packed}
          onCheckedChange={onToggle}
          className="border-white/30 data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-500"
        />

        <Label
          className={`cursor-pointer text-base ${
            item.packed
              ? "font-medium text-emerald-200 line-through"
              : "text-slate-200"
          }`}
        >
          {item.name}
        </Label>
      </div>

      {item.packed && (
        <CheckCircle2 className="h-5 w-5 text-emerald-300 drop-shadow-[0_2px_8px_rgba(16,185,129,0.6)]" />
      )}
    </div>
  );
}