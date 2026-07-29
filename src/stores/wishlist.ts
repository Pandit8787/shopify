import { create } from "zustand";
import { products } from "@/fixtures";

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  ids: ["p-001", "p-003"],
  count: 2,
  toggle: (id) => {
    const exists = get().ids.includes(id);
    const next = exists
      ? get().ids.filter((x) => x !== id)
      : [...get().ids, id];
    set({ ids: next, count: next.length });
  },
  has: (id) => get().ids.includes(id),
}));

export function wishlistProducts() {
  const ids = useWishlistStore.getState().ids;
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;
}
