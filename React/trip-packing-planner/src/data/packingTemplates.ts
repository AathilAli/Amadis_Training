import type { ChecklistSection } from "@/types/trip";
export const packingTemplates: Record<string, ChecklistSection[]> = {
  Beach: [
    {
      id: "clothes",
      title: "Clothes",
      items: [
        { id: "tshirt", name: "T-Shirts", packed: false },
        { id: "shorts", name: "Shorts", packed: false },
        { id: "sandals", name: "Sandals", packed: false },
      ],
    },
    {
      id: "toiletries",
      title: "Toiletries",
      items: [
        { id: "toothbrush", name: "Toothbrush", packed: false },
        { id: "toothpaste", name: "Toothpaste", packed: false },
        { id: "sunscreen", name: "Sunscreen", packed: false },
      ],
    },
  ],

  Mountain: [
    {
      id: "clothes",
      title: "Warm Clothes",
      items: [
        { id: "jacket", name: "Jacket", packed: false },
        { id: "sweater", name: "Sweater", packed: false },
        { id: "gloves", name: "Gloves", packed: false },
      ],
    },
    {
      id: "gear",
      title: "Mountain Gear",
      items: [
        { id: "boots", name: "Hiking Boots", packed: false },
        { id: "torch", name: "Torch", packed: false },
      ],
    },
  ],

  City: [
    {
      id: "clothes",
      title: "Clothes",
      items: [
        { id: "shirts", name: "Shirts", packed: false },
        { id: "jeans", name: "Jeans", packed: false },
      ],
    },
    {
      id: "electronics",
      title: "Electronics",
      items: [
        { id: "charger", name: "Phone Charger", packed: false },
        { id: "powerbank", name: "Power Bank", packed: false },
      ],
    },
  ],
};