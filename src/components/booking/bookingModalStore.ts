"use client";
import { create } from "zustand";

export type BookingCtx = {
  appointmentTypeId?: number | string;
  priceId?: string;
  name?: string;

  //  add these so the modal can prefill Contact fields
  email?: string;
  phone?: string;
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
