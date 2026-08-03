export interface ChecklistItem {
  id: string;
  name: string;
  packed: boolean;
}

export interface ChecklistSection {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  days: number;
  activities: string[];
  checklist: ChecklistSection[];
  createdAt: string;
}