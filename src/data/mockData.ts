import garage1 from "@/assets/garage-1.jpg";
import garage2 from "@/assets/garage-2.jpg";
import garage3 from "@/assets/garage-3.jpg";
import garage4 from "@/assets/garage-4.jpg";
import garage5 from "@/assets/garage-5.jpg";
import garage6 from "@/assets/garage-6.jpg";

export type AccessType = "remote" | "key" | "code" | "smart-lock" | "attendant";
export type GarageSize = "small" | "medium" | "large" | "xl";

export interface Garage {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  area: string;
  pricePerDay: number;
  photos: string[];
  size: GarageSize;
  accessType: AccessType;
  accessInstructions: string;
  unavailableDates: string[]; // ISO yyyy-mm-dd
  coordinates: { lat: number; lng: number };
  hostId: string;
  hostName: string;
  rating: number;
  reviewCount: number;
}

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "expired"
  | "cancelled";

export interface Booking {
  id: string;
  garageId: string;
  guestName: string;
  guestId: string;
  startDate: string; // ISO
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  message?: string;
  createdAt: string;
}

const sizeLabel: Record<GarageSize, string> = {
  small: "Small · fits 1 compact car",
  medium: "Medium · fits 1 standard car",
  large: "Large · fits 1 SUV / van",
  xl: "Extra large · fits 2 cars",
};

const accessLabel: Record<AccessType, string> = {
  remote: "Remote opener",
  key: "Physical key",
  code: "Keypad code",
  "smart-lock": "Smart lock app",
  attendant: "On-site attendant",
};

export const sizeText = (s: GarageSize) => sizeLabel[s];
export const accessText = (a: AccessType) => accessLabel[a];

// Mock garages — coordinates around central Lisbon for a focused demo
export const mockGarages: Garage[] = [
  {
    id: "g1",
    title: "Bright single garage near Avenida",
    description:
      "Quiet residential garage just two blocks from Avenida da Liberdade. Polished concrete floor, LED lighting, and a small workbench. Perfect for a daily driver or weekend storage.",
    address: "Rua Alexandre Herculano 22",
    city: "Lisbon",
    area: "Avenidas Novas",
    pricePerDay: 18,
    photos: [garage1, garage3, garage6],
    size: "medium",
    accessType: "remote",
    accessInstructions:
      "I'll hand you a remote on the first day. Door opens directly from the street.",
    unavailableDates: [],
    coordinates: { lat: 38.7223, lng: -9.1493 },
    hostId: "h1",
    hostName: "Marta",
    rating: 4.9,
    reviewCount: 42,
  },
  {
    id: "g2",
    title: "Secure underground spot — Baixa",
    description:
      "Numbered spot in a 24/7 monitored underground garage in the heart of Baixa. Elevator access, CCTV, very secure. Spot #38.",
    address: "Praça do Comércio",
    city: "Lisbon",
    area: "Baixa",
    pricePerDay: 22,
    photos: [garage2, garage6],
    size: "medium",
    accessType: "code",
    accessInstructions:
      "Use code 4421 at the main gate, then take the ramp down to level -2. Spot #38 on the right.",
    unavailableDates: [],
    coordinates: { lat: 38.7075, lng: -9.1364 },
    hostId: "h2",
    hostName: "André",
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "g3",
    title: "Spacious double garage with workshop",
    description:
      "Generous double garage in a quiet street in Belém. Wooden ceiling, natural light, room for two cars or a car + storage.",
    address: "Rua da Junqueira 140",
    city: "Lisbon",
    area: "Belém",
    pricePerDay: 35,
    photos: [garage3, garage1],
    size: "xl",
    accessType: "key",
    accessInstructions:
      "Key collection from my neighbor at #142, ground floor. He's home from 8am to 8pm.",
    unavailableDates: [],
    coordinates: { lat: 38.6979, lng: -9.2076 },
    hostId: "h3",
    hostName: "Sofia",
    rating: 5.0,
    reviewCount: 18,
  },
  {
    id: "g4",
    title: "Private driveway in Estrela",
    description:
      "Outdoor private driveway behind a hedge — easy in/out, fits one car comfortably. Great for short-term parking near the basilica.",
    address: "Rua de São Bento 310",
    city: "Lisbon",
    area: "Estrela",
    pricePerDay: 12,
    photos: [garage4, garage6],
    size: "medium",
    accessType: "smart-lock",
    accessInstructions:
      "I'll send you a one-time code via the app to open the gate.",
    unavailableDates: [],
    coordinates: { lat: 38.7138, lng: -9.1599 },
    hostId: "h4",
    hostName: "Tiago",
    rating: 4.6,
    reviewCount: 23,
  },
  {
    id: "g5",
    title: "Old-town storage garage",
    description:
      "Characterful brick warehouse-style garage with a green roller door. Best for storage or a project car. Manual door, no power inside.",
    address: "Rua do Século 80",
    city: "Lisbon",
    area: "Príncipe Real",
    pricePerDay: 15,
    photos: [garage5],
    size: "large",
    accessType: "key",
    accessInstructions:
      "Key handover in person — message me the day before to arrange a time.",
    unavailableDates: [],
    coordinates: { lat: 38.7159, lng: -9.1486 },
    hostId: "h5",
    hostName: "Inês",
    rating: 4.7,
    reviewCount: 31,
  },
  {
    id: "g6",
    title: "Modern double garage — Parque das Nações",
    description:
      "Brand new double garage in a quiet suburb, white roller door, ample space for SUV plus bikes. Very clean and well-lit.",
    address: "Alameda dos Oceanos",
    city: "Lisbon",
    area: "Parque das Nações",
    pricePerDay: 28,
    photos: [garage6, garage3],
    size: "xl",
    accessType: "remote",
    accessInstructions:
      "Remote opener provided on arrival. Plenty of street space to maneuver.",
    unavailableDates: [],
    coordinates: { lat: 38.7681, lng: -9.0959 },
    hostId: "h1",
    hostName: "Marta",
    rating: 4.9,
    reviewCount: 12,
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    garageId: "g1",
    guestName: "Carlos M.",
    guestId: "u9",
    startDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
    totalPrice: 54,
    status: "pending",
    message: "Hi! Visiting Lisbon for a long weekend, would love to park here.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "b2",
    garageId: "g3",
    guestName: "Ana P.",
    guestId: "u10",
    startDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    totalPrice: 245,
    status: "confirmed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "b3",
    garageId: "g2",
    guestName: "You",
    guestId: "me",
    startDate: new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10),
    endDate: new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10),
    totalPrice: 66,
    status: "expired",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: "b4",
    garageId: "g6",
    guestName: "You",
    guestId: "me",
    startDate: new Date(Date.now() + 20 * 86400000).toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 23 * 86400000).toISOString().slice(0, 10),
    totalPrice: 84,
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

export const getGarageById = (id: string) =>
  mockGarages.find((g) => g.id === id);

export const statusMeta: Record<
  BookingStatus,
  { label: string; tone: "warning" | "success" | "destructive" | "muted" }
> = {
  pending: { label: "Pending host approval", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "success" },
  rejected: { label: "Rejected", tone: "destructive" },
  expired: { label: "Expired", tone: "muted" },
  cancelled: { label: "Cancelled", tone: "muted" },
};
