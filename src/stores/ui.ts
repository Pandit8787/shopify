import { create } from "zustand";

type Lang = "EN" | "HI" | "ES" | "FR" | "ZH";
type Currency = "USD" | "EUR" | "GBP" | "INR" | "JPY";

interface UIState {
  theme: "dark" | "light";
  lang: Lang;
  currency: Currency;
  searchOpen: boolean;
  megaMenuOpen: boolean;
  mobileNavOpen: boolean;
  quickViewProductId: string | null;
  backToTopVisible: boolean;
  toggleTheme: () => void;
  setTheme: (t: "dark" | "light") => void;
  setLang: (l: Lang) => void;
  setCurrency: (c: Currency) => void;
  setSearchOpen: (v: boolean) => void;
  setMegaMenuOpen: (v: boolean) => void;
  setMobileNavOpen: (v: boolean) => void;
  setQuickView: (id: string | null) => void;
  setBackToTopVisible: (v: boolean) => void;
}

function initialTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("luxe-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: initialTheme(),
  lang: "EN",
  currency: "USD",
  searchOpen: false,
  megaMenuOpen: false,
  mobileNavOpen: false,
  quickViewProductId: null,
  backToTopVisible: false,
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
  setTheme: (t) => {
    set({ theme: t });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", t === "dark");
      localStorage.setItem("luxe-theme", t);
    }
  },
  setLang: (l) => set({ lang: l }),
  setCurrency: (c) => set({ currency: c }),
  setSearchOpen: (v) => set({ searchOpen: v }),
  setMegaMenuOpen: (v) => set({ megaMenuOpen: v }),
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),
  setQuickView: (id) => set({ quickViewProductId: id }),
  setBackToTopVisible: (v) => set({ backToTopVisible: v }),
}));

export const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
};
