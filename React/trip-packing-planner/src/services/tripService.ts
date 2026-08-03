import type { Trip } from "@/types/trip";
import {
  generateChecklist,
  mergeChecklist,
} from "@/utils/checklist";const STORAGE_KEY = "trips";

/**
 * Get all trips from localStorage
 */
export function getTrips(): Trip[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

/**
 * Save all trips to localStorage
 */
export function saveTrips(trips: Trip[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

/**
 * Add a new trip
 */
export function createTrip(trip: Trip): void {
  const trips = getTrips();

  trips.push(trip);

  saveTrips(trips);
}

/**
 * Find a trip by ID
 */
export function getTripById(id: string): Trip | undefined {
  return getTrips().find((trip) => trip.id === id);
}

/**
 * Update an existing trip
 */
export function updateTrip(updatedTrip: Trip): void {
  const trips = getTrips().map((trip) =>
    trip.id === updatedTrip.id ? updatedTrip : trip
  );

  saveTrips(trips);
}

/**
 * Delete a trip
 */
export function deleteTrip(id: string): void {
  const trips = getTrips().filter((trip) => trip.id !== id);

  saveTrips(trips);
}
/**
 * Toggle a checklist item's packed status
 */
export function toggleChecklistItem(
  tripId: string,
  sectionId: string,
  itemId: string
): void {
  const trips = getTrips();

  const updatedTrips = trips.map((trip) => {
    if (trip.id !== tripId) {
      return trip;
    }

    return {
      ...trip,
      checklist: trip.checklist.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        return {
          ...section,
          items: section.items.map((item) => {
            if (item.id !== itemId) {
              return item;
            }

            return {
              ...item,
              packed: !item.packed,
            };
          }),
        };
      }),
    };
  });

  saveTrips(updatedTrips);
}

/**
 * Update activities and preserve packed items
 */
export function updateTripActivities(
  tripId: string,
  activities: string[]
): Trip | undefined {
  const trips = getTrips();

  let updatedTrip: Trip | undefined;

  const updatedTrips = trips.map((trip) => {
    if (trip.id !== tripId) {
      return trip;
    }

    const generatedChecklist = generateChecklist(
      trip.destination,
      activities
    );

    const mergedChecklist = mergeChecklist(
      trip.checklist,
      generatedChecklist
    );

    updatedTrip = {
      ...trip,
      activities,
      checklist: mergedChecklist,
    };

    return updatedTrip;
  });

  saveTrips(updatedTrips);

  return updatedTrip;
}