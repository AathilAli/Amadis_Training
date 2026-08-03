import { packingTemplates } from "@/data/packingTemplates";
import type { ChecklistSection } from "@/types/trip";

export function mergeChecklist(
  oldChecklist: ChecklistSection[],
  newChecklist: ChecklistSection[]
): ChecklistSection[] {
  return newChecklist.map((newSection) => {
    const oldSection = oldChecklist.find(
      (section) => section.id === newSection.id
    );

    // Entirely new section
    if (!oldSection) {
      return newSection;
    }

    return {
      ...newSection,
      items: newSection.items.map((newItem) => {
        const oldItem = oldSection.items.find(
          (item) => item.id === newItem.id
        );

        // New item
        if (!oldItem) {
          return newItem;
        }

        // Preserve packed status
        return {
          ...newItem,
          packed: oldItem.packed,
        };
      }),
    };
  });
}

export function generateChecklist(
  destination: string,
  activities: string[]
): ChecklistSection[] {
  // Start with the destination template
  const checklist = [...(packingTemplates[destination] || [])];

  // Add Hiking section
  if (activities.includes("Hiking")) {
    checklist.push({
      id: "hiking",
      title: "Hiking Gear",
      items: [
        {
          id: "boots",
          name: "Hiking Boots",
          packed: false,
        },
        {
          id: "water",
          name: "Water Bottle",
          packed: false,
        },
        {
          id: "backpack",
          name: "Backpack",
          packed: false,
        },
      ],
    });
  }

  // Add Swimming section
  if (activities.includes("Swimming")) {
    checklist.push({
      id: "swimming",
      title: "Swimming Gear",
      items: [
        {
          id: "swimwear",
          name: "Swimwear",
          packed: false,
        },
        {
          id: "goggles",
          name: "Swimming Goggles",
          packed: false,
        },
        {
          id: "towel",
          name: "Beach Towel",
          packed: false,
        },
      ],
    });
  }

  // Add Photography section
  if (activities.includes("Photography")) {
    checklist.push({
      id: "photography",
      title: "Photography Gear",
      items: [
        {
          id: "camera",
          name: "Camera",
          packed: false,
        },
        {
          id: "battery",
          name: "Extra Battery",
          packed: false,
        },
        {
          id: "memory",
          name: "Memory Card",
          packed: false,
        },
      ],
    });
  }

  // Add Business section
  if (activities.includes("Business")) {
    checklist.push({
      id: "business",
      title: "Business Essentials",
      items: [
        {
          id: "laptop",
          name: "Laptop",
          packed: false,
        },
        {
          id: "charger",
          name: "Laptop Charger",
          packed: false,
        },
        {
          id: "documents",
          name: "Documents",
          packed: false,
        },
      ],
    });
  }
// Add Camping section
if (activities.includes("Camping")) {
  checklist.push({
    id: "camping",
    title: "Camping Gear",
    items: [
      {
        id: "tent",
        name: "Tent",
        packed: false,
      },
      {
        id: "sleepingbag",
        name: "Sleeping Bag",
        packed: false,
      },
      {
        id: "flashlight",
        name: "Flashlight",
        packed: false,
      },
    ],
  });
}
// Add City Tour section
if (activities.includes("City Tour")) {
  checklist.push({
    id: "citytour",
    title: "City Tour Essentials",
    items: [
      {
        id: "wallet",
        name: "Wallet",
        packed: false,
      },
      {
        id: "phone",
        name: "Mobile Phone",
        packed: false,
      },
      {
        id: "powerbank",
        name: "Power Bank",
        packed: false,
      },
    ],
  });
}
  return checklist;
}