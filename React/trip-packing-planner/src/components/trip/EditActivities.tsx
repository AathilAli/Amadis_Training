import { useEffect, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const allActivities = [
  "Hiking",
  "Swimming",
  "Camping",
  "Photography",
  "Business",
  "City Tour",
];

interface EditActivitiesProps {
  selectedActivities: string[];
  onSave: (activities: string[]) => void;
}

export function EditActivities({
  selectedActivities,
  onSave,
}: EditActivitiesProps) {
  const [editing, setEditing] = useState(false);
  const [activities, setActivities] = useState<string[]>(selectedActivities);

  // Update state when parent changes
  useEffect(() => {
    setActivities(selectedActivities);
  }, [selectedActivities]);

  function toggleActivity(activity: string) {
    if (activities.includes(activity)) {
      setActivities(activities.filter((item) => item !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  }

  function handleSave() {
    onSave(activities);
    setEditing(false);
  }

  if (!editing) {
    return (
      <Button
        variant="outline"
        onClick={() => setEditing(true)}
        className="rounded-xl border-white/15 bg-slate-800/70 text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-slate-800/90 hover:text-white"
      >
        <Pencil className="mr-1 h-4 w-4 text-sky-300" />
        Edit Activities
      </Button>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-slate-800/60 p-6 text-slate-100">
      <h2 className="text-xl font-bold text-white">Edit Activities</h2>

      <div className="grid grid-cols-2 gap-3">
        {allActivities.map((activity) => (
          <div
            key={activity}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-slate-900/80"
          >
            <Checkbox
              checked={activities.includes(activity)}
              onCheckedChange={() => toggleActivity(activity)}
              className="border-white/30 data-[state=checked]:border-sky-400 data-[state=checked]:bg-sky-500"
            />

            <Label className="cursor-pointer text-slate-200">{activity}</Label>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          className="rounded-xl bg-linear-to-r from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          <Check className="mr-1 h-4 w-4" />
          Save
        </Button>

        <Button
          variant="outline"
          onClick={() => setEditing(false)}
          className="rounded-xl border-white/15 bg-slate-800/70 text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800/90 hover:text-white"
        >
          <X className="mr-1 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}