"use client";
import { create } from "zustand";

export type BookingCtx = {
  appointmentTypeId?: number | string; // Acuity appointment type
  priceId?: string;                    // Stripe price id (price_xxx)
  name?: string;                       // Display in modal header
};

type BookingState = {
  isOpen: boolean;
  ctx: BookingCtx | null;
  open: (ctx?: BookingCtx) => void;
  close: () => void;
};

export const useBookingModal = create<BookingState>((set) => ({
  isOpen: false,
  ctx: null,
  open: (ctx) => set({ isOpen: true, ctx: ctx ?? null }),
  close: () => set({ isOpen: false, ctx: null }),
}));
