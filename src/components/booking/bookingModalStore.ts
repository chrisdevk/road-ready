"use client";
import { create } from "zustand";

// Опишем тум структуру данных, которые передаём в BookingModal
export type BookingCtx = {
  appointmentTypeId?: number | string; // ID типа урока (из Acuity)
  priceId?: string;                    // ID цены (из Stripe)
  name?: string;                       // Название пакета
  email?: string;                      // Email клиента для проверки брони
};

type BookingModalState = {
  isOpen: boolean;
  ctx: BookingCtx | null;
  open: (ctx: BookingCtx) => void;
  close: () => void;
};

// Сам стор
export const useBookingModal = create<BookingModalState>((set) => ({
  isOpen: false,
  ctx: null,

  open: (ctx) => {
    console.log("[BookingModalStore] open()", ctx);
    set({ isOpen: true, ctx });
  },

  close: () => {
    console.log("[BookingModalStore] close()");
    set({ isOpen: false, ctx: null });
  },
}));
