import { create } from "zustand";
import {
  mockBookings,
  mockGarages,
  type Booking,
  type BookingStatus,
  type Garage,
} from "@/data/mockData";

type Store = {
  garages: Garage[];
  bookings: Booking[];
  addGarage: (g: Omit<Garage, "id" | "rating" | "reviewCount" | "hostId" | "hostName">) => string;
  addBookingRequest: (b: Omit<Booking, "id" | "status" | "createdAt" | "guestId" | "guestName">) => string;
  setBookingStatus: (id: string, status: BookingStatus) => void;
};

export const useAppStore = create<Store>((set) => ({
  garages: mockGarages,
  bookings: mockBookings,
  addGarage: (g) => {
    const id = `g${Date.now()}`;
    set((s) => ({
      garages: [
        ...s.garages,
        {
          ...g,
          id,
          rating: 0,
          reviewCount: 0,
          hostId: "me",
          hostName: "You",
        },
      ],
    }));
    return id;
  },
  addBookingRequest: (b) => {
    const id = `b${Date.now()}`;
    set((s) => ({
      bookings: [
        {
          ...b,
          id,
          status: "pending",
          guestId: "me",
          guestName: "You",
          createdAt: new Date().toISOString(),
        },
        ...s.bookings,
      ],
    }));
    return id;
  },
  setBookingStatus: (id, status) =>
    set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
    })),
}));
