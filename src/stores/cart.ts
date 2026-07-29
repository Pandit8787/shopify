import { create } from "zustand";
import type { CartItem, Coupon } from "@/services/types";
import { coupons, products } from "@/fixtures";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  giftWrap: boolean;
  coupon: Coupon | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setGiftWrap: (v: boolean) => void;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  subtotal: () => number;
  shipping: () => number;
  tax: () => number;
  discount: () => number;
  giftWrapFee: () => number;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      productId: "p-002",
      quantity: 1,
      priceSnapshot: 420,
      title: "Monolith Runner X",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      size: "9",
      color: "Signal Red",
    },
    {
      productId: "p-005",
      quantity: 1,
      priceSnapshot: 749,
      title: "Aurora Acoustic Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      color: "Midnight",
    },
  ],
  isOpen: false,
  giftWrap: false,
  coupon: null,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  setGiftWrap: (v) => set({ giftWrap: v }),
  add: (raw) => {
    const item: CartItem = {
      quantity: 1,
      ...raw,
    };
    const existing = get().items.find((i) => i.productId === item.productId);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...get().items, item] });
    }
    set({ isOpen: true });
  },
  remove: (productId) =>
    set({ items: get().items.filter((i) => i.productId !== productId) }),
  updateQty: (productId, qty) =>
    set({
      items:
        qty <= 0
          ? get().items.filter((i) => i.productId !== productId)
          : get().items.map((i) =>
              i.productId === productId ? { ...i, quantity: qty } : i
            ),
    }),
  clear: () => set({ items: [], coupon: null, giftWrap: false }),
  applyCoupon: (code) => {
    const match = coupons.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase() && c.active
    );
    if (!match) return { ok: false, message: "Invalid or expired coupon." };
    set({ coupon: match });
    return { ok: true, message: `Coupon ${match.code} applied.` };
  },
  removeCoupon: () => set({ coupon: null }),
  subtotal: () =>
    get().items.reduce((s, i) => s + i.priceSnapshot * i.quantity, 0),
  shipping: () => (get().subtotal() >= 500 ? 0 : 15),
  tax: () => Math.round(get().subtotal() * 100 * 0.08) / 100,
  discount: () => {
    const c = get().coupon;
    if (!c) return 0;
    const sub = get().subtotal();
    return c.type === "percent"
      ? Math.round((sub * c.value) / 100 * 100) / 100
      : Math.min(c.value, sub);
  },
  giftWrapFee: () => (get().giftWrap ? 25 : 0),
  total: () => {
    const s = get();
    return (
      Math.round(
        (s.subtotal() + s.shipping() + s.tax() + s.giftWrapFee() - s.discount()) *
          100
      ) / 100
    );
  },
  count: () => get().items.reduce((s, i) => s + i.quantity, 0),
}));

export function productById(id: string) {
  return products.find((p) => p.id === id);
}
