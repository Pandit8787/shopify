import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Bell,
  Globe2,
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  LogOut,
  Settings,
  Wallet,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore, currencySymbols } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useAuthStore } from "@/stores/auth";
import { formatCurrency } from "@/lib/utils";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { label: "Home", to: "/home" },
  { label: "Shop", to: "/shop" },
  {
    label: "Collections",
    to: "#",
    mega: [
      {
        col: "For Her",
      },
      { col: "For Him" },
      { col: "New Drops" },
      { col: "Limited" },
    ],
  },
  {
    label: "Brands",
    to: "/shop",
  },
  { label: "Stories", to: "/home" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [curOpen, setCurOpen] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();

  const {
    searchOpen,
    setSearchOpen,
    mobileNavOpen,
    setMobileNavOpen,
    currency,
    setCurrency,
    lang,
    setLang,
  } = useUIStore();
  const cartCount = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.count);
  const user = useAuthStore((s) => s.user);
  const isAuthed = useAuthStore((s) => s.isAuthed);
  const notifications = useAuthStore((s) => s.notifications);
  const logout = useAuthStore((s) => s.logout);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="relative z-40">
        <div className="h-9 w-full overflow-hidden border-b border-luxe-lineLight dark:border-luxe-line bg-gradient-to-r from-royalpurple-600/20 via-royal-600/20 to-pink-500/20 backdrop-blur-md">
          <div className="container flex flex-col gap-2 py-2 text-xs font-medium text-ink-900/80 dark:text-white/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <Sparkles className="h-3.5 w-3.5 text-gold-500" />
              <span>
                <span className="text-gradient-signature font-semibold">
                  Flash Sale
                </span>{" "}
                — Up to 40% off select styles. Ends in{" "}
                <span className="font-mono font-bold">05:12:48</span>
              </span>
            </div>
            <div className="hidden items-center gap-5 md:flex">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Free shipping over $500
              </span>
              <span>24/7 Concierge</span>
              <span>EN • {currencySymbols[currency]}</span>
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "backdrop-blur-xxl bg-white/70 dark:bg-black/55 border-b border-luxe-lineLight dark:border-luxe-line shadow-[0_10px_40px_-20px_rgba(0,0,0,0.4)]"
            : "backdrop-blur-xl bg-white/30 dark:bg-transparent border-b border-transparent"
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <button
              aria-label="Open menu"
              className="lg:hidden rounded-xl p-2 hover:bg-white/40 dark:hover:bg-white/10"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/home" className="flex items-center gap-2" data-cursor="hover">
              <Logo />
              <span className="font-display text-2xl font-bold tracking-tight">
                <span className="text-gradient-signature">LUXE</span>
              </span>
            </Link>

            <nav className="ml-4 hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => {
              const active = pathname === l.to;
              const hasMega = !!l.mega;
              return (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => hasMega && setOpenMega(l.label)}
                  onMouseLeave={() => setOpenMega(null)}
                >
                  <Link
                    to={l.to}
                    className={cn(
                      "group inline-flex items-center gap-1 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all hover:text-royalpurple-500",
                      active ? "text-gradient-signature" : ""
                    )}
                    data-cursor="hover"
                  >
                    {l.label}
                    {hasMega && (
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                </div>
              );
            })}
            </nav>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
            className="relative rounded-xl p-2.5 hover:bg-white/40 dark:hover:bg-white/10 transition"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            data-cursor="hover"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
            <LangPicker open={langOpen} setOpen={setLangOpen} lang={lang} setLang={setLang} />
            <CurrencyPicker
              open={curOpen}
              setOpen={setCurOpen}
              currency={currency}
              setCurrency={setCurrency}
            />
            <ThemeToggle />
            <Link
              to="/dashboard"
              aria-label="Wishlist"
              className="relative rounded-xl p-2.5 hover:bg-white/40 dark:hover:bg-white/10 transition"
              data-cursor="hover"
            >
              <Heart className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-royalpurple-600 px-1 text-[10px] font-bold text-white"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <div className="relative">
              <button
                className="relative rounded-xl p-2.5 hover:bg-white/40 dark:hover:bg-white/10 transition"
                onClick={() => {
                  // notifications.slice(0, 1).forEach((n) => useAuthStore.getState().markNotificationRead(n.id));
                }}
                aria-label="Notifications"
                data-cursor="hover"
              >
                <Bell className="h-[18px] w-[18px]" />
                {unread > 0 && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-white"
                  >
                    {unread}
                  </motion.span>
                )}
              </button>
            </div>
            <button
              className="relative rounded-xl p-2.5 hover:bg-white/40 dark:hover:bg-white/10 transition"
              onClick={openCart}
              aria-label="Cart"
              data-cursor="hover"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, y: 8 }}
                    animate={{ scale: 1, y: 0 }}
                    className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-signature-gradient px-1.5 text-[10px] font-bold text-white shadow-glow-purple"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <div className="relative ml-1" onMouseLeave={() => setProfileOpen(false)}>
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className={cn(
                  "grid h-9 w-9 overflow-hidden rounded-full border border-luxe-lineLight dark:border-luxe-line",
                  isAuthed ? "bg-transparent" : "bg-white/60 dark:bg-white/10"
                )}
                data-cursor="hover"
                aria-label="Profile"
              >
                {isAuthed && user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="m-auto h-4 w-4" />
                )}
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    onMouseEnter={() => setProfileOpen(true)}
                    className="absolute right-0 mt-3 w-72 rounded-3xl glass-card p-2"
                  >
                    {isAuthed && user ? (
                      <>
                        <div className="flex items-center gap-3 rounded-2xl p-3">
                          <img src={user.avatar} className="h-12 w-12 rounded-full object-cover" alt="" />
                          <div className="min-w-0">
                            <div className="truncate font-semibold">{user.name}</div>
                            <div className="truncate text-xs text-ink-500 dark:text-white/60">{user.email}</div>
                          </div>
                        </div>
                        <div className="my-1 h-px bg-luxe-lineLight dark:bg-luxe-line" />
                        {[
                          { i: LayoutDashboard, l: "Dashboard", t: "/dashboard" },
                          { i: Wallet, l: "Wallet & Rewards", t: "/dashboard" },
                          { i: Heart, l: "Wishlist", t: "/dashboard" },
                          { i: Settings, l: "Settings", t: "/dashboard" },
                        ].map((m) => (
                          <Link
                            key={m.l}
                            to={m.t}
                            className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium hover:bg-white/60 dark:hover:bg-white/10"
                            onClick={() => setProfileOpen(false)}
                          >
                            <m.i className="h-4 w-4" />
                            {m.l}
                          </Link>
                        ))}
                        <div className="my-1 h-px bg-luxe-lineLight dark:bg-luxe-line" />
                        <button
                          onClick={() => {
                            logout();
                            nav("/login");
                          }}
                          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block rounded-2xl p-3 text-center text-sm font-semibold text-gradient-signature hover:bg-white/60 dark:hover:bg-white/10"
                          onClick={() => setProfileOpen(false)}
                        >
                          Sign In to LUXE
                        </Link>
                        <div className="p-3 text-xs text-ink-500 dark:text-white/60 text-center">
                          Orders, wallet, wishlist & more
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openMega && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="pointer-events-none absolute left-0 right-0 top-full pt-2"
            >
              <div className="container pointer-events-auto">
                <div className="glass-card rounded-3xl p-6 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {[
                    {
                      title: "New Drops",
                      items: ["Aurora Collection", "Noir Monolith", "Gold Chapter", "Moto Tech"],
                    },
                    {
                      title: "Apparel",
                      items: ["Outerwear", "Knitwear", "Shirts", "Pants & Denim"],
                    },
                    {
                      title: "Accessories",
                      items: ["Footwear", "Bags", "Watches", "Eyewear"],
                    },
                    {
                      title: "Gifts",
                      items: ["Under $500", "Limited Editions", "Gift Cards", "Personalization"],
                    },
                  ].map((c) => (
                    <div key={c.title}>
                      <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400">
                        {c.title}
                      </div>
                      <ul className="space-y-2">
                        {c.items.map((i, idx) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                          >
                            <Link
                              to="/shop"
                              className="link-underline text-sm font-medium text-ink-700 dark:text-white/80 hover:text-royalpurple-500"
                              onClick={() => setOpenMega(null)}
                            >
                              {i}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] overflow-y-auto glass-strong p-5 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-xl p-2 hover:bg-white/40 dark:hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setMobileNavOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-semibold hover:bg-white/50 dark:hover:bg-white/10"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 space-y-3">
                <Link to="/dashboard" className="btn-ghost w-full" onClick={() => setMobileNavOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/login" className="btn-primary w-full" onClick={() => setMobileNavOpen(false)}>
                  Sign In
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sr-only"
        />
      )}
      {/* spacer for offer banner */}
      <div className="sr-only">{formatCurrency(0)}</div>
    </>
  );
}

function LangPicker({
  open,
  setOpen,
  lang,
  setLang,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  lang: string;
  setLang: (l: any) => void;
}) {
  const langs: string[] = ["EN", "HI", "ES", "FR", "ZH"];
  return (
    <div className="relative hidden sm:block" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-xl p-2 hover:bg-white/40 dark:hover:bg-white/10 transition"
        data-cursor="hover"
        aria-label="Language"
      >
        <Globe2 className="h-[18px] w-[18px]" />
        <span className="text-xs font-bold">{lang}</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute right-0 z-40 mt-2 w-28 overflow-hidden rounded-2xl glass-card p-1"
          onMouseEnter={() => setOpen(true)}
        >
          {langs.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-xl px-3 py-2 text-left text-sm font-medium",
                lang === l
                  ? "bg-signature-gradient text-white"
                  : "hover:bg-white/60 dark:hover:bg-white/10"
              )}
            >
              {l}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function CurrencyPicker({
  open,
  setOpen,
  currency,
  setCurrency,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  currency: string;
  setCurrency: (c: any) => void;
}) {
  const curs = ["USD", "EUR", "GBP", "INR", "JPY"] as const;
  return (
    <div className="relative hidden md:block" onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-xl px-2.5 py-2 text-xs font-bold hover:bg-white/40 dark:hover:bg-white/10 transition"
        data-cursor="hover"
        aria-label="Currency"
      >
        {currencySymbols[currency as keyof typeof currencySymbols]}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute right-0 z-40 mt-2 w-36 overflow-hidden rounded-2xl glass-card p-1"
          onMouseEnter={() => setOpen(true)}
        >
          {curs.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCurrency(c);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
                currency === c
                  ? "bg-signature-gradient text-white"
                  : "hover:bg-white/60 dark:hover:bg-white/10"
              )}
            >
              <span>{c}</span>
              <span className="font-mono text-xs opacity-80">
                {currencySymbols[c]}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
