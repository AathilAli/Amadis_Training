import type { ChecklistSection as ChecklistSectionType } from "@/types/trip";

import { FolderOpen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChecklistItem } from "./ChecklistItem";

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  tripId: string;
  onToggle: (tripId: string, sectionId: string, itemId: string) => void;
}

export function ChecklistSection({
  section,
  tripId,
  onToggle,
}: ChecklistSectionProps) {
  return (
    <Card
      id={section.id}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 text-slate-100 shadow-2xl transition-all duration-500 hover:border-sky-300/30 hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.5)]"
    >
      {/* glossy top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-linear-to-br from-sky-500/40 to-indigo-600/30 text-sky-100 shadow-lg">
            <FolderOpen className="h-5 w-5" />
          </span>
          {section.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {section.items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={() => onToggle(tripId, section.id, item.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}