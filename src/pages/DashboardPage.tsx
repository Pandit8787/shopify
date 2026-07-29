import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  ShoppingBag,
  Heart,
  Wallet,
  Gift,
  Users,
  Bell,
  User,
  LogOut,
  ChevronRight,
  Package,
  Truck,
  Check,
  Star,
  ArrowRight,
  Copy,
  Settings,
  MapPin,
  Sparkles,
  Plus,
  Minus,
  CreditCard,
  Tag,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { wishlistProducts, useWishlistStore } from "@/stores/wishlist";
import { orders, products } from "@/fixtures";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import ProductCard from "@/components/shop/ProductCard";

type Tab = "overview" | "orders" | "wishlist" | "wallet" | "rewards" | "referral" | "addresses" | "profile" | "notifications";

const navItems: { k: Tab; t: string; i: any; badge?: number }[] = [
  { k: "overview", t: "Overview", i: HomeIcon },
  { k: "orders", t: "Orders", i: ShoppingBag },
  { k: "wishlist", t: "Wishlist", i: Heart },
  { k: "wallet", t: "Wallet", i: Wallet },
  { k: "rewards", t: "Rewards", i: Gift },
  { k: "referral", t: "Referrals", i: Users },
  { k: "addresses", t: "Addresses", i: MapPin },
  { k: "notifications", t: "Notifications", i: Bell },
  { k: "profile", t: "Profile", i: User },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  paid: "bg-royalpurple-500/15 text-royalpurple-600 dark:text-royalpurple-400 border-royalpurple-500/30",
  shipped: "bg-royal-500/15 text-royal-600 dark:text-royal-400 border-royal-500/30",
  delivered: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  refunded: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
};
const statusDot: Record<string, string> = {
  pending: "bg-amber-500",
  paid: "bg-royalpurple-500",
  shipped: "bg-royal-500",
  delivered: "bg-emerald-500",
  refunded: "bg-rose-500",
};
const statusStep: Record<string, number> = {
  pending: 0,
  paid: 1,
  shipped: 2,
  delivered: 3,
  refunded: -1,
};

export default function DashboardPage() {
  const nav = useNavigate();
  const user = useAuthStore((s) => s.user);
  const notifications = useAuthStore((s) => s.notifications);
  const markRead = useAuthStore((s) => s.markNotificationRead);
  const logout = useAuthStore((s) => s.logout);
  const wishCount = useWishlistStore((s) => s.count);
  const wishlist = wishlistProducts();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const [tab, setTab] = useState<Tab>("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) {
    return (
      <div className="container pt-14 pb-24 text-center max-w-xl">
        <div className="rounded-[32px] glass-card p-10">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-aurora-gradient animate-float">
            <Sparkles className="h-9 w-9 text-white" />
          </div>
          <h1 className="heading-md mt-6">Please sign in first.</h1>
          <p className="mt-3 text-ink-500 dark:text-white/60">
            You need a LUXE account to view your dashboard.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link to="/login" className="btn-primary">
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/home" className="btn-ghost">
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextMilestone = 50000;
  const progress = Math.min(100, (user.rewardPoints / nextMilestone) * 100);

  const activeNavItem = navItems.find(n => n.k === tab);
  const ActiveIcon = activeNavItem?.i || HomeIcon;

  return (
    <div className="container pt-6 md:pt-10 pb-24 md:pb-28">
      {/* Mobile top header — drawer trigger + current tab */}
      <div className="lg:hidden mb-4 md:mb-6">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-luxe-lineLight dark:border-luxe-line glass-card"
              aria-label="Menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60 truncate">My Account</div>
              <div className="font-heading font-bold text-base md:text-lg truncate flex items-center gap-2">
                <ActiveIcon className="h-3.5 w-3.5 text-royalpurple-500" />
                {activeNavItem?.t || "Dashboard"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/10 border border-gold-500/30 px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
              <Star className="h-2.5 w-2.5 fill-gold-500 text-gold-500" /> Atelier
            </span>
            <img
              src={user.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80"}
              alt=""
              className="h-9 w-9 shrink-0 rounded-xl object-cover ring-2 ring-royalpurple-500/40"
            />
          </div>
        </div>

        {/* Horizontal scroll nav chips */}
        <div className="mt-4 flex gap-2 overflow-x-auto snap-x snap-mandatory shrink-0 whitespace-nowrap pb-2 -mx-4 px-4 hide-scrollbar">
          {navItems.map((item) => {
            const Icon = item.i;
            const active = tab === item.k;
            const badge =
              item.k === "wishlist" ? wishCount : item.k === "notifications" ? unreadCount : item.badge;
            return (
              <button
                key={item.k}
                onClick={() => setTab(item.k)}
                className={cn(
                  "snap-start inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition border",
                  active
                    ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                    : "border-luxe-lineLight dark:border-luxe-line glass-card text-ink-600 dark:text-white/80"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.t}</span>
                {badge ? (
                  <span className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                    active ? "bg-white/20 text-white" : "bg-royalpurple-500/15 text-royalpurple-600 dark:text-royalpurple-400"
                  )}>
                    {badge}
                  </span>
                ) : null}
              </button>
            );
          })}
          <button
            onClick={() => {
              logout();
              toast("Signed out", "", "info");
              nav("/login");
            }}
            className="snap-start inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition border border-rose-500/20"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto glass-strong p-4 sm:p-5 pb-24 lg:hidden"
            >
              <div className="sticky top-0 z-10 -mx-4 sm:-mx-5 -mt-4 sm:-mt-5 mb-4 sm:mb-5 flex items-center justify-between border-b border-luxe-lineLight dark:border-luxe-line bg-inherit px-4 sm:px-5 py-3">
                <div className="font-display font-black text-lg">Dashboard</div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-luxe-lineLight dark:border-luxe-line"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Profile card */}
              <div className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-5">
                <div className="flex items-center gap-3 md:gap-4">
                  <img
                    src={user.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80"}
                    alt=""
                    className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-2xl object-cover ring-2 ring-royalpurple-500/40"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-heading font-semibold truncate">{user.name}</div>
                    <div className="text-xs text-ink-500 dark:text-white/60 truncate">{user.email}</div>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gold-500/10 border border-gold-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                      <Star className="h-3 w-3 fill-gold-500 text-gold-500" /> Atelier Member
                    </span>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <nav className="mt-4 md:mt-5 rounded-2xl md:rounded-[28px] glass-card p-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.i;
                  const active = tab === item.k;
                  const badge =
                    item.k === "wishlist" ? wishCount : item.k === "notifications" ? unreadCount : item.badge;
                  return (
                    <button
                      key={item.k}
                      onClick={() => {
                        setTab(item.k);
                        setMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                        active
                          ? "bg-signature-gradient text-white shadow-glow-purple"
                          : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-600 dark:text-white/80"
                      )}
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span className="flex-1 text-left">{item.t}</span>
                      {badge ? (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold",
                          active ? "bg-white/20 text-white" : "bg-royalpurple-500/15 text-royalpurple-600 dark:text-royalpurple-400"
                        )}>
                          {badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
                <div className="my-2 h-px bg-luxe-lineLight dark:bg-luxe-line mx-2" />
                <button
                  onClick={() => {
                    logout();
                    toast("Signed out", "", "info");
                    nav("/login");
                  }}
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition"
                >
                  <LogOut className="h-4.5 w-4.5" /> Sign out
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[28px] glass-card p-5">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80"}
                alt=""
                className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-2 ring-royalpurple-500/40"
              />
              <div className="min-w-0 flex-1">
                <div className="font-heading text-lg font-semibold truncate">{user.name}</div>
                <div className="text-xs text-ink-500 dark:text-white/60 truncate">{user.email}</div>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-gold-500/10 border border-gold-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold-700 dark:text-gold-400">
                  <Star className="h-3 w-3 fill-gold-500 text-gold-500" /> Atelier Member
                </span>
              </div>
            </div>
          </div>

          <nav className="rounded-[28px] glass-card p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.i;
              const active = tab === item.k;
              const badge =
                item.k === "wishlist" ? wishCount : item.k === "notifications" ? unreadCount : item.badge;
              return (
                <button
                  key={item.k}
                  onClick={() => setTab(item.k)}
                  className={cn(
                    "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                    active
                      ? "bg-signature-gradient text-white shadow-glow-purple"
                      : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-600 dark:text-white/80"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span className="flex-1 text-left">{item.t}</span>
                  {badge ? (
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      active ? "bg-white/20 text-white" : "bg-royalpurple-500/15 text-royalpurple-600 dark:text-royalpurple-400"
                    )}>
                      {badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
            <div className="my-2 h-px bg-luxe-lineLight dark:bg-luxe-line mx-2" />
            <button
              onClick={() => {
                logout();
                toast("Signed out", "", "info");
                nav("/login");
              }}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition"
            >
              <LogOut className="h-4.5 w-4.5" /> Sign out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* OVERVIEW */}
              {tab === "overview" && (
                <div className="space-y-6 md:space-y-8">
                  <div className="grid gap-3 md:gap-4 grid-cols-1 xs:grid-cols-2 xl:grid-cols-4">
                    {[
                      { k: "Orders", v: orders.length, i: ShoppingBag, c: "text-royal-500", d: "View history" },
                      { k: "Wishlist", v: wishCount, i: Heart, c: "text-rose-500", d: "Saved pieces" },
                      { k: "Rewards", v: formatNumber(user.rewardPoints), i: Gift, c: "text-gold-500", d: "pts earned" },
                      { k: "Wallet", v: formatCurrency(user.wallet), i: Wallet, c: "text-emerald-500", d: "Available" },
                    ].map((s, i) => {
                      const Icon = s.i;
                      return (
                        <motion.div
                          key={s.k}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-5"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className={`grid h-10 w-10 md:h-11 md:w-11 place-items-center rounded-2xl bg-current/10 ${s.c}`}>
                              <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                            </div>
                            <button
                              onClick={() =>
                                setTab(s.k === "Orders" ? "orders" : s.k === "Wishlist" ? "wishlist" : s.k.toLowerCase() as Tab)
                              }
                              className="text-[10px] md:text-xs font-semibold link-underline text-royalpurple-500 shrink-0 text-right"
                            >
                              {s.d}
                            </button>
                          </div>
                          <div className="mt-4 md:mt-5 text-2xl md:text-3xl font-display font-black">{s.v}</div>
                          <div className="mt-1 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                            {s.k}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Rewards progress */}
                  <div className="relative overflow-hidden rounded-2xl md:rounded-[32px] p-5 md:p-8 glass-card">
                    <div className="absolute inset-0 bg-signature-gradient opacity-10" />
                    <div className="relative grid gap-5 md:gap-6 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <span className="eyebrow !bg-gold-500/10 !text-gold-700 dark:!text-gold-400 !text-[9px] md:!text-[10px]">
                          <Sparkles className="h-3 w-3" /> Rewards Tier
                        </span>
                        <h3 className="mt-3 md:mt-4 font-display font-black leading-[0.95] tracking-tight text-2xl sm:text-3xl md:text-4xl">
                          Only {formatNumber(nextMilestone - user.rewardPoints)} pts to{" "}
                          <span className="text-gradient-signature">Gold Tier</span>
                        </h3>
                        <p className="mt-2 md:mt-3 text-xs md:text-sm text-ink-500 dark:text-white/60 max-w-xl">
                          Gold members unlock early drops, private atelier events, and 1.5× points on every purchase.
                        </p>
                      </div>
                      <div className="flex gap-2 md:gap-4 items-center justify-start md:justify-end">
                        {["Bronze", "Silver", "Gold", "Platinum"].map((t, i) => (
                          <div
                            key={t}
                            className={cn(
                              "grid h-12 w-12 md:h-16 md:w-16 place-items-center rounded-2xl border text-center",
                              i < 2
                                ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                                : "border-luxe-lineLight dark:border-luxe-line opacity-50"
                            )}
                          >
                            <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">
                              {t}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative mt-6 md:mt-8">
                      <div className="h-2 md:h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-signature-gradient"
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[11px] md:text-xs font-semibold gap-2">
                        <span>{formatNumber(user.rewardPoints)} pts</span>
                        <span className="text-ink-500 dark:text-white/60 text-right shrink-0">
                          {formatNumber(nextMilestone)} pts · Gold
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent order */}
                  <div>
                    <div className="mb-4 md:mb-5 flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <span className="eyebrow !text-[9px] md:!text-[10px]">Recent Order</span>
                        <h3 className="mt-2 md:mt-3 font-display font-black leading-[0.95] tracking-tight text-xl sm:text-2xl md:text-3xl">Latest delivery</h3>
                      </div>
                      <button onClick={() => setTab("orders")} className="btn-ghost !py-2 !px-3 md:!py-2.5 md:!px-4 !text-[11px] md:!text-xs">
                        All Orders <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
                      </button>
                    </div>
                    {orders.length > 0 && (
                      <OrderCard order={orders[0]} compact />
                    )}
                  </div>
                </div>
              )}

              {/* ORDERS */}
              {tab === "orders" && (
                <div>
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">Your Orders</h2>
                  <p className="mt-3 text-xs md:text-sm text-ink-500 dark:text-white/60">
                    Tracking, returns, and invoices for every order you've placed.
                  </p>
                  <div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
                    {orders.map((o) => (
                      <OrderCard key={o.id} order={o} />
                    ))}
                  </div>
                </div>
              )}

              {/* WISHLIST */}
              {tab === "wishlist" && (
                <div>
                  <div className="mb-6 md:mb-8 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">Saved Wishlist</h2>
                      <p className="mt-3 text-xs md:text-sm text-ink-500 dark:text-white/60">
                        {wishCount} piece{wishCount === 1 ? "" : "s"} saved for later.
                      </p>
                    </div>
                    {wishCount > 0 && (
                      <button className="btn-ghost-gold !py-2 !px-3 md:!py-2.5 md:!px-4 !text-[11px] md:!text-xs inline-flex gap-2">
                        <Heart className="h-3.5 w-3.5" /> Share Wishlist
                      </button>
                    )}
                  </div>
                  {wishlist.length === 0 ? (
                    <div className="rounded-2xl md:rounded-[32px] glass-card p-8 md:p-14 text-center">
                      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-aurora-gradient animate-float">
                        <Heart className="h-9 w-9 text-white" />
                      </div>
                      <h3 className="heading-md mt-6">Nothing saved yet.</h3>
                      <p className="mt-3 mx-auto max-w-md text-ink-500 dark:text-white/60">
                        Tap the heart on any product to save it here for later.
                      </p>
                      <Link to="/shop" className="btn-primary mt-6 inline-flex">
                        Browse Shop <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
                      {wishlist.map((p, i) => (
                        <ProductCard product={p} index={i} key={p.id} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* WALLET */}
              {tab === "wallet" && (
                <div className="space-y-5 md:space-y-6">
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">Wallet & Credits</h2>
                  <div className="relative overflow-hidden rounded-3xl md:rounded-[40px] p-6 md:p-8 lg:p-10">
                    <div
                      className="absolute inset-0 animate-gradientMove bg-[length:200%_200%]"
                      style={{
                        background:
                          "linear-gradient(120deg, #1E40AF 0%, #7C3AED 50%, #EC4899 100%)",
                      }}
                    />
                    <div className="absolute inset-0 opacity-30 animate-auroraShift" style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 80%, rgba(212,175,55,0.45), transparent 50%)",
                    }} />
                    <div className="relative text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4.5 w-4.5 md:h-5 md:w-5" />
                          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] opacity-80">Luxe Wallet</span>
                        </div>
                        <span className="rounded-full bg-white/15 px-2.5 md:px-3 py-1 text-[10px] md:text-[11px] font-bold uppercase tracking-widest backdrop-blur">
                          Active
                        </span>
                      </div>
                      <div className="mt-8 md:mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight">
                        {formatCurrency(user.wallet)}
                      </div>
                      <div className="mt-2 md:mt-3 text-xs md:text-sm opacity-80">Available balance</div>
                      <div className="mt-8 md:mt-10 font-mono text-sm md:text-xl tracking-[0.2em] md:tracking-[0.3em] opacity-80 truncate">
                        LUXE ·•••• · {user.id.slice(-6).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 md:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
                    {[
                      { t: "Add Funds", i: Plus, c: "bg-signature-gradient" },
                      { t: "Send as Gift", i: Gift, c: "bg-gold-gradient" },
                      { t: "Transaction History", i: Tag, c: "bg-aurora-gradient" },
                    ].map((a) => {
                      const Icon = a.i;
                      return (
                        <button key={a.t} className="rounded-2xl md:rounded-3xl glass-card p-4 md:p-5 flex items-center gap-3 md:gap-4 hover:-translate-y-1 transition text-left">
                          <div className={`grid h-11 w-11 md:h-12 md:w-12 shrink-0 place-items-center rounded-2xl text-white ${a.c}`}>
                            <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-heading font-semibold text-base md:text-lg">{a.t}</div>
                            <div className="text-[11px] md:text-xs text-ink-500 dark:text-white/60 truncate">
                              {a.t === "Add Funds" ? "From $10 to $5,000" : a.t === "Send as Gift" ? "Transfer to any LUXE user" : "Last 90 days of activity"}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* REWARDS */}
              {tab === "rewards" && (
                <div className="space-y-6 md:space-y-8">
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl">Rewards & Points</h2>
                  <div className="rounded-2xl md:rounded-[32px] glass-card p-5 md:p-6 lg:p-8">
                    <div className="grid gap-5 md:gap-6 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                          Current Balance
                        </div>
                        <div className="mt-2 md:mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-gradient-signature">
                          {formatNumber(user.rewardPoints)}
                        </div>
                        <div className="mt-2 md:mt-3 text-xs md:text-sm text-ink-500 dark:text-white/60">
                          Points worth ≈ <span className="font-semibold text-ink-900 dark:text-white">{formatCurrency(user.rewardPoints / 100)}</span>
                          , redeemable on your next order.
                        </div>
                      </div>
                      <button className="btn-primary justify-self-start md:justify-self-end !py-2.5 md:!py-3.5">
                        Redeem Points <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-6 md:mt-8 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.2 }}
                        className="h-full bg-signature-gradient"
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] md:text-xs font-semibold gap-2">
                      <span>Silver Tier</span>
                      <span className="text-ink-500 dark:text-white/60 text-right shrink-0">{formatNumber(nextMilestone - user.rewardPoints)} to Gold</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-black leading-[0.95] tracking-tight text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-5">Ways to earn</h3>
                    <div className="grid gap-3 md:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
                      {[
                        { t: "Shop", d: "Every $1 spent = 25 pts", p: "+25 pts", i: ShoppingBag },
                        { t: "Review", d: "Verify & review a product", p: "+250 pts", i: Star },
                        { t: "Refer", d: "Friend places first order", p: "+2,500 pts", i: Users },
                        { t: "Follow", d: "Instagram + TikTok", p: "+150 pts", i: Gift },
                        { t: "Birthday", d: "On your special day", p: "+500 pts", i: Sparkles },
                        { t: "Profile", d: "Complete your profile", p: "+100 pts", i: User },
                      ].map((r, i) => {
                        const Icon = r.i;
                        return (
                          <motion.div
                            key={r.t}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="rounded-2xl glass-card p-4 md:p-5 flex items-start gap-3 md:gap-4"
                          >
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signature-gradient text-white">
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-heading font-semibold">{r.t}</div>
                                <span className="shrink-0 rounded-full bg-gold-500/10 border border-gold-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400">
                                  {r.p}
                                </span>
                              </div>
                              <div className="mt-1 text-xs md:text-sm text-ink-500 dark:text-white/60">{r.d}</div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* REFERRAL */}
              {tab === "referral" && (
                <div className="space-y-8">
                  <h2 className="heading-lg !text-4xl">Refer a friend</h2>
                  <div className="relative overflow-hidden rounded-[40px] p-8 md:p-12">
                    <div className="absolute inset-0 bg-signature-gradient opacity-20" />
                    <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
                      <div>
                        <div className="eyebrow !bg-emerald-500/15 !text-emerald-700 dark:!text-emerald-400 !border-emerald-500/30">
                          <Gift className="h-3 w-3" /> Give $100 · Get $100
                        </div>
                        <h3 className="heading-md mt-4">Earn 2,500 pts + $100 for every friend.</h3>
                        <p className="mt-3 text-ink-600 dark:text-white/75 max-w-md">
                          Share your private link. When a friend places their first LUXE order, you both unlock rewards.
                          No caps, no limits.
                        </p>
                      </div>
                      <div className="rounded-3xl glass-card p-5 md:p-6">
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                          Your referral link
                        </div>
                        <div className="mt-2 flex gap-2">
                          <div className="flex-1 truncate rounded-xl border border-luxe-lineLight dark:border-luxe-line bg-white/60 dark:bg-white/5 px-4 py-3 text-sm font-mono">
                            https://luxe.shop/r/{user.referralCode}
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(`https://luxe.shop/r/${user.referralCode}`);
                              toast("Copied", "Referral link copied to clipboard", "success");
                            }}
                            className="btn-primary !py-3 px-4"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                          <div className="rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3">
                            <div className="font-display text-2xl font-bold text-gradient-signature">12</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500 dark:text-white/60">
                              Referrals
                            </div>
                          </div>
                          <div className="rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3">
                            <div className="font-display text-2xl font-bold text-gradient-signature">$1,200</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500 dark:text-white/60">
                              Earned
                            </div>
                          </div>
                          <div className="rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3">
                            <div className="font-display text-2xl font-bold text-gradient-signature">9</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-ink-500 dark:text-white/60">
                              Active
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ADDRESSES */}
              {tab === "addresses" && (
                <div>
                  <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="heading-lg !text-4xl">Your Addresses</h2>
                      <p className="mt-3 text-ink-500 dark:text-white/60">Ship to saved addresses in one click.</p>
                    </div>
                    <button className="btn-primary !py-2.5 !px-4 !text-xs inline-flex gap-2">
                      <Plus className="h-3.5 w-3.5" /> Add New Address
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[0, 1].map((i) => (
                      <div key={i} className="rounded-[28px] glass-card p-6 relative">
                        {i === 0 && (
                          <span className="absolute right-5 top-5 rounded-full bg-signature-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                            Default
                          </span>
                        )}
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-signature-gradient/15 text-royalpurple-500">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="mt-4 font-heading font-semibold text-xl">
                          {i === 0 ? "Home · Mumbai" : "Work · BKC Office"}
                        </div>
                        <div className="mt-2 text-sm text-ink-600 dark:text-white/75 leading-relaxed">
                          {user.name}
                          <br />
                          {i === 0 ? user.addresses[0].line1 : "F-501, The Capital, Bandra Kurla Complex"}
                          <br />
                          {i === 0 ? user.addresses[0].city : user.addresses[0].city}
                          {" · "}
                          {i === 0 ? user.addresses[0].zip : "400051"}
                          <br />
                          {i === 0 ? user.addresses[0].country : user.addresses[0].country}
                          <br />
                          <span className="text-ink-500 dark:text-white/60">{i === 0 ? user.addresses[0].phone : "+91 22 6123 4567"}</span>
                        </div>
                        <div className="mt-5 flex gap-2">
                          <button className="btn-ghost !py-2 !px-4 !text-xs flex-1">Edit</button>
                          {i !== 0 && (
                            <button className="btn-ghost !py-2 !px-4 !text-xs text-rose-500 border-rose-500/30 hover:bg-rose-500/10">
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS */}
              {tab === "notifications" && (
                <div>
                  <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="heading-lg !text-4xl">Notifications</h2>
                      <p className="mt-3 text-ink-500 dark:text-white/60">
                        {unreadCount} unread · {notifications.length} total
                      </p>
                    </div>
                    <button className="btn-ghost !py-2.5 !px-4 !text-xs">Mark all as read</button>
                  </div>
                  <div className="space-y-2">
                    {notifications.map((n) => {
                      const iconMap: Record<string, any> = {
                        order: Package,
                        offer: Sparkles,
                        reward: Gift,
                        system: Bell,
                      };
                      const Icon = iconMap[n.type] || Bell;
                      return (
                        <button
                          key={n.id}
                          onClick={() => markRead(n.id)}
                          className={cn(
                            "w-full flex items-start gap-4 rounded-3xl p-5 text-left transition border",
                            n.read
                              ? "border-transparent hover:bg-white/50 dark:hover:bg-white/5"
                              : "border-royalpurple-500/30 bg-royalpurple-500/5 hover:bg-royalpurple-500/10"
                          )}
                        >
                          <div className={cn(
                            "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                            n.read
                              ? "bg-white/50 dark:bg-white/5 text-ink-400 dark:text-white/40"
                              : "bg-signature-gradient text-white shadow-glow-purple"
                          )}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="font-semibold">{n.title}</div>
                              {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-royalpurple-500 animate-pulse" />}
                            </div>
                            <div className="mt-0.5 text-sm text-ink-600 dark:text-white/70">{n.description}</div>
                          </div>
                          <div className="text-xs font-semibold text-ink-500 dark:text-white/60 shrink-0">{n.time}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PROFILE */}
              {tab === "profile" && (
                <div className="space-y-8">
                  <h2 className="heading-lg !text-4xl">Account Settings</h2>
                  <div className="rounded-[32px] glass-card p-6 md:p-8">
                    <h3 className="font-heading text-xl font-semibold flex items-center gap-2">
                      <Settings className="h-4.5 w-4.5" /> Personal information
                    </h3>
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="label-luxe">Full name</label>
                        <input className="input-luxe" defaultValue={user.name} />
                      </div>
                      <div>
                        <label className="label-luxe">Email</label>
                        <input className="input-luxe" defaultValue={user.email} />
                      </div>
                      <div>
                        <label className="label-luxe">Phone</label>
                        <input className="input-luxe" defaultValue={user.addresses?.[0]?.phone || ""} />
                      </div>
                      <div>
                        <label className="label-luxe">Date of birth</label>
                        <input type="date" className="input-luxe" />
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="btn-primary">Save changes</button>
                      <button className="btn-ghost">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OrderCard({
  order,
  compact = false,
}: {
  order: (typeof import("@/fixtures"))["orders"][number];
  compact?: boolean;
}) {
  const step = statusStep[order.status] ?? 0;
  return (
    <div className="rounded-[28px] glass-card overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-luxe-lineLight dark:border-luxe-line p-5">
        <div className="flex items-center gap-4 min-w-0">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500 dark:text-white/60">
              Order #
            </div>
            <div className="font-mono text-lg font-bold">{order.id}</div>
          </div>
          <span className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest",
            statusColor[order.status]
          )}>
            <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", statusDot[order.status])} />
            {order.status}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500 dark:text-white/60">
          <div>
            <span className="text-[10px] uppercase tracking-widest opacity-70">Placed</span>
            <div className="font-semibold text-ink-900 dark:text-white">
              {new Date(order.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest opacity-70">Total</span>
            <div className="font-display text-2xl font-bold text-gradient-signature">
              {formatCurrency(order.total)}
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          {/* Status tracker */}
          {order.status !== "refunded" && (
            <div className="px-5 py-6 border-b border-luxe-lineLight dark:border-luxe-line">
              <div className="grid grid-cols-4 gap-2 relative">
                <div className="absolute left-0 right-0 top-6 h-0.5 bg-luxe-lineLight dark:bg-luxe-line mx-8" />
                <div
                  className="absolute top-6 h-0.5 bg-signature-gradient transition-all duration-700 mx-8"
                  style={{ width: `calc(100% * ${step / 3})` }}
                />
                {[
                  { k: "Confirmed", i: Check },
                  { k: "Paid", i: CreditCard },
                  { k: "Shipped", i: Truck },
                  { k: "Delivered", i: Package },
                ].map((s, i) => {
                  const Icon = s.i;
                  const done = i <= step;
                  return (
                    <div key={s.k} className="flex flex-col items-center gap-2 relative z-10">
                      <div
                        className={cn(
                          "grid h-12 w-12 place-items-center rounded-2xl border-2 transition",
                          done
                            ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                            : "bg-white dark:bg-white/5 border-luxe-lineLight dark:border-luxe-line text-ink-400 dark:text-white/40"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={cn(
                        "text-[11px] font-bold uppercase tracking-widest text-center",
                        done ? "text-ink-900 dark:text-white" : "text-ink-400 dark:text-white/40"
                      )}>
                        {s.k}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="divide-y divide-luxe-lineLight dark:divide-luxe-line">
            {order.items.map((i) => (
              <div key={i.productId} className="p-5 flex items-center gap-4">
                <img src={i.image} alt="" className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{i.title}</div>
                  <div className="mt-1 text-xs text-ink-500 dark:text-white/60">
                    {[i.color, i.size, `Qty ${i.quantity}`].filter(Boolean).join(" · ")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatCurrency(i.priceSnapshot * i.quantity)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 flex flex-wrap gap-2 justify-end border-t border-luxe-lineLight dark:border-luxe-line">
            <Link to={`/orders/${order.id}`} className="btn-ghost !py-2.5 !px-4 !text-xs">
              Invoice
            </Link>
            {order.status === "delivered" && (
              <button className="btn-ghost !py-2.5 !px-4 !text-xs">Return</button>
            )}
            {order.tracking && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toast("Tracking", `Opening tracking for ${order.tracking}`, "info");
                }}
                className="btn-primary !py-2.5 !px-4 !text-xs inline-flex gap-2"
              >
                <Truck className="h-3.5 w-3.5" /> Track Package
              </a>
            )}
          </div>
        </>
      )}

      {compact && (
        <div className="p-5 flex items-center gap-4">
          {order.items.slice(0, 4).map((i) => (
            <img key={i.productId} src={i.image} alt="" className="h-14 w-14 rounded-xl object-cover ring-2 ring-white dark:ring-ink-900 -ml-2 first:ml-0" />
          ))}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-ink-500 dark:text-white/60">
              {order.items.length} item{order.items.length === 1 ? "" : "s"} · {order.status}
            </div>
            <div className="font-semibold line-clamp-1">
              {order.items.map((i) => i.title).join(", ")}
            </div>
          </div>
          <Link to="/dashboard" className="btn-ghost !py-2.5 !px-4 !text-xs">
            Details <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
