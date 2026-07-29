import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings as SettingsIcon,
  Sparkles,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  UserPlus,
  ArrowRight,
  Search,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Bell,
  LogOut,
  Star,
  Eye,
  Send,
  Zap,
  Menu,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { products, orders, revenueSeries, trafficBySource, categories } from "@/fixtures";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

const nav = [
  { k: "/admin", t: "Dashboard", i: LayoutDashboard, end: true },
  { k: "/admin/orders", t: "Orders", i: ShoppingBag },
  { k: "/admin/products", t: "Products", i: Package },
  { k: "/admin/customers", t: "Customers", i: Users },
  { k: "/admin/analytics", t: "Analytics", i: BarChart3 },
  { k: "/admin/settings", t: "Settings", i: SettingsIcon },
];

function Shell({ children }: { children: React.ReactNode }) {
  const navi = useNavigate();
  const loc = useLocation();
  const onThis = (p: string) => p === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(p);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeNav = nav.find(n => onThis(n.k));
  const ActiveIcon = activeNav?.i || LayoutDashboard;

  return (
    <div className="min-h-[calc(100vh-80px)] container py-6 md:py-8">
      {/* Mobile top header */}
      <div className="lg:hidden mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3 justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-luxe-lineLight dark:border-luxe-line glass-card"
              aria-label="Menu"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500 dark:text-white/60 truncate">Control Center</div>
              <div className="font-heading font-bold text-base md:text-lg truncate flex items-center gap-2">
                <ActiveIcon className="h-3.5 w-3.5 text-royalpurple-500" />
                {activeNav?.t || "Admin Panel"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="grid h-9 w-9 place-items-center rounded-xl glass-card relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            </button>
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-signature-gradient text-white shadow-glow-purple">
              <LayoutDashboard className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Horizontal scroll nav */}
        <div className="mt-4 flex gap-2 overflow-x-auto snap-x snap-mandatory shrink-0 whitespace-nowrap pb-2 -mx-4 px-4 hide-scrollbar">
          {nav.map((item) => {
            const Icon = item.i;
            const active = onThis(item.k);
            return (
              <NavLink
                key={item.k}
                to={item.k}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "snap-start inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition border",
                    isActive || active
                      ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                      : "border-luxe-lineLight dark:border-luxe-line glass-card text-ink-600 dark:text-white/80"
                  )
                }
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.t}</span>
              </NavLink>
            );
          })}
          <button
            onClick={() => navi("/home")}
            className="snap-start inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold text-ink-500 dark:text-white/60 hover:bg-white/50 dark:hover:bg-white/10 transition border border-luxe-lineLight dark:border-luxe-line"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" /> Storefront
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
                <div className="font-display font-black text-lg">Admin Panel</div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-luxe-lineLight dark:border-luxe-line"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-5 mb-4 md:mb-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-signature-gradient text-white shadow-glow-purple">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500 dark:text-white/60">
                      Control Center
                    </div>
                    <div className="font-display font-black text-xl">Admin Panel</div>
                  </div>
                </div>
              </div>

              <nav className="rounded-2xl md:rounded-[28px] glass-card p-2 space-y-1">
                {nav.map((item) => {
                  const Icon = item.i;
                  const active = onThis(item.k);
                  return (
                    <NavLink
                      key={item.k}
                      to={item.k}
                      end={item.end}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                          isActive || active
                            ? "bg-signature-gradient text-white shadow-glow-purple"
                            : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-600 dark:text-white/80"
                        )
                      }
                    >
                      <Icon className="h-4.5 w-4.5" />
                      <span className="flex-1 text-left">{item.t}</span>
                      {active && <ChevronRight className="h-3.5 w-3.5" />}
                    </NavLink>
                  );
                })}
                <div className="my-2 h-px bg-luxe-lineLight dark:bg-luxe-line mx-2" />
                <button
                  onClick={() => {
                    navi("/home");
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink-500 dark:text-white/60 hover:bg-white/60 dark:hover:bg-white/10"
                >
                  <ArrowRight className="h-4.5 w-4.5 rotate-180" />
                  Back to Storefront
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start space-y-5 h-fit">
          <div className="rounded-[28px] glass-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-signature-gradient text-white shadow-glow-purple">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-ink-500 dark:text-white/60">
                  Control Center
                </div>
                <div className="font-display text-xl font-bold">Admin Panel</div>
              </div>
            </div>
          </div>

          <nav className="rounded-[28px] glass-card p-2 space-y-1">
            {nav.map((item) => {
              const Icon = item.i;
              const active = onThis(item.k);
              return (
                <NavLink
                  key={item.k}
                  to={item.k}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      isActive || active
                        ? "bg-signature-gradient text-white shadow-glow-purple"
                        : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-600 dark:text-white/80"
                    )
                  }
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span className="flex-1 text-left">{item.t}</span>
                  {active && <ChevronRight className="h-3.5 w-3.5" />}
                </NavLink>
              );
            })}
            <div className="my-2 h-px bg-luxe-lineLight dark:bg-luxe-line mx-2" />
            <button
              onClick={() => navi("/home")}
              className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink-500 dark:text-white/60 hover:bg-white/60 dark:hover:bg-white/10"
            >
              <ArrowRight className="h-4.5 w-4.5 rotate-180" />
              Back to Storefront
            </button>
          </nav>
        </aside>

        <div className="min-w-0 space-y-5 md:space-y-6">{children}</div>
      </div>
    </div>
  );
}

function KPI({
  title,
  value,
  delta,
  up = true,
  icon: Icon,
  tint = "signature",
}: {
  title: string;
  value: string;
  delta: string;
  up?: boolean;
  icon: any;
  tint?: "signature" | "gold" | "emerald" | "rose";
}) {
  const tints: Record<string, string> = {
    signature: "from-royal-500 via-royalpurple-500 to-rose-500 text-white",
    gold: "from-amber-400 via-gold-500 to-amber-600 text-white",
    emerald: "from-emerald-400 via-emerald-500 to-teal-600 text-white",
    rose: "from-rose-400 via-rose-500 to-pink-600 text-white",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-5 relative overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-aurora-gradient opacity-20 blur-2xl" />
      <div className="relative flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60 truncate">
            {title}
          </div>
          <div className="mt-2 text-2xl sm:text-3xl md:text-4xl font-display font-black">{value}</div>
        </div>
        <div className={`grid h-10 w-10 md:h-11 md:w-11 shrink-0 place-items-center rounded-xl md:rounded-2xl bg-gradient-to-br ${tints[tint]} shadow-glow-purple`}>
          <Icon className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      </div>
      <div className={`mt-3 md:mt-4 inline-flex items-center gap-1 rounded-full px-2 md:px-2.5 py-1 text-[10px] md:text-[11px] font-bold ${up ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}>
        <TrendingUp className={cn("h-3 w-3", !up && "rotate-180")} />
        {delta}
      </div>
    </motion.div>
  );
}

function DashboardIndex() {
  const totalRevenue = revenueSeries.reduce((s, r) => s + r.revenue, 0);
  const totalOrders = revenueSeries.reduce((s, r) => s + r.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">
            <Sparkles className="h-3 w-3" /> Today · Monday
          </span>
          <h1 className="heading-lg mt-3">Welcome back, Commander.</h1>
          <p className="mt-2 text-ink-500 dark:text-white/60 max-w-xl">
            Here's what's happening at LUXE today — live revenue, order flow, and AI-curated next moves.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500 dark:text-white/60" />
            <input className="input-luxe !py-2.5 pl-11 !w-64" placeholder="Search orders, products…" />
          </div>
          <button className="btn-primary !py-2.5 inline-flex gap-2">
            <Plus className="h-4 w-4" /> New Product
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-2xl glass-card relative">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPI title="Revenue (MTD)" value={formatCurrency(totalRevenue)} delta="+24.1% vs last month" icon={DollarSign} tint="signature" />
        <KPI title="Total Orders" value={formatNumber(totalOrders)} delta="+18.6%" icon={ShoppingCart} tint="emerald" />
        <KPI title="Avg. Order Value" value={formatCurrency(avgOrderValue)} delta="+5.3%" icon={TrendingUp} tint="gold" />
        <KPI title="New Customers" value="248" delta="+31.2%" icon={UserPlus} tint="rose" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[32px] glass-card p-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="eyebrow">Revenue · Last 7 months</span>
              <h2 className="heading-md mt-3 !text-2xl md:!text-3xl">Revenue vs Orders</h2>
            </div>
            <div className="flex gap-1 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-1">
              {["7D", "30D", "90D", "6M", "1Y"].map((t, i) => (
                <button
                  key={t}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider",
                    i === 3 ? "bg-signature-gradient text-white shadow-glow-purple" : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-500 dark:text-white/60"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={revenueSeries} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ordGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" opacity={0.12} vertical={false} />
              <XAxis dataKey="month" stroke="currentColor" className="text-xs" opacity={0.5} axisLine={false} tickLine={false} />
              <YAxis stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ stroke: "#7C3AED", strokeDasharray: "4 4", strokeOpacity: 0.35 }}
                contentStyle={{
                  borderRadius: 16,
                  border: "none",
                  background: "rgba(10,10,10,0.85)",
                  color: "white",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                }}
                labelStyle={{ color: "#D4AF37", fontWeight: 700, marginBottom: 4 }}
                formatter={(v: any) => [formatCurrency(v), ""]}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: 16 }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#7C3AED" strokeWidth={3} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="orders" name="Orders" stroke="#D4AF37" strokeWidth={3} fill="url(#ordGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[32px] glass-card p-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="eyebrow">Traffic</span>
              <h2 className="heading-md mt-3 !text-2xl md:!text-3xl">By source</h2>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={trafficBySource}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {trafficBySource.map((e, i) => (
                  <Cell key={i} fill={e.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {trafficBySource.map((s) => (
              <div key={s.name} className="flex items-center gap-3 text-sm">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="font-semibold flex-1">{s.name}</span>
                <span className="text-ink-500 dark:text-white/60 font-bold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Category bar chart */}
        <div className="rounded-[32px] glass-card p-6">
          <div className="mb-6">
            <span className="eyebrow">Performance</span>
            <h2 className="heading-md mt-3 !text-2xl md:!text-3xl">Top categories</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categories.slice(0, 6).map((c, i) => ({ name: c.name, pieces: c.count, revenue: (i + 1) * 65000 + Math.random() * 20000 }))} margin={{ top: 10, left: -10 }}>
              <CartesianGrid strokeDasharray="4 4" opacity={0.12} vertical={false} />
              <XAxis dataKey="name" stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
              <YAxis stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 16, border: "none", background: "rgba(10,10,10,0.85)", color: "white", backdropFilter: "blur(12px)" }}
              />
              <Bar dataKey="revenue" fill="#1E40AF" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="relative overflow-hidden rounded-[32px] p-6 glass-card">
          <div className="absolute inset-0 bg-signature-gradient opacity-[0.08]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <span className="eyebrow !bg-gold-500/10 !text-gold-700 dark:!text-gold-400 !border-gold-500/30">LUXE AI · Insights</span>
                <h2 className="heading-md mt-3 !text-2xl md:!text-3xl">Your next best moves</h2>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { t: "Bump Aurora Bomber price", d: "Demand is 2.3× supply. Test a +8% price lift this week.", icon: Zap, c: "text-royalpurple-500" },
                { t: "Bundle runners + hoodie", d: "Bestseller co-occurrence — projected +$41k / month.", icon: TrendingUp, c: "text-emerald-500" },
                { t: "Replenish Chronograph stock", d: "Only 18 units left; reorder lead-time 6 weeks.", icon: ShoppingBag, c: "text-rose-500" },
              ].map((n, i) => {
                const Icon = n.icon;
                return (
                  <motion.div
                    key={n.t}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 rounded-2xl bg-white/60 dark:bg-white/5 border border-luxe-lineLight dark:border-luxe-line p-4"
                  >
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-current/10 ${n.c}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-heading font-semibold">{n.t}</div>
                      <div className="text-sm text-ink-500 dark:text-white/60">{n.d}</div>
                    </div>
                    <button className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-signature-gradient text-white">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-black/40 dark:bg-white/5 p-2 pl-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-royalpurple-500/20 text-royalpurple-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <input
                placeholder="Ask LUXE AI anything about your store…"
                className="flex-1 bg-transparent outline-none text-sm font-medium"
              />
              <button className="btn-primary !py-2 px-4 !text-xs inline-flex gap-1.5">
                <Send className="h-3.5 w-3.5" /> Ask
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-[32px] glass-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-luxe-lineLight dark:border-luxe-line p-6">
          <div>
            <span className="eyebrow">Latest</span>
            <h2 className="heading-md mt-3 !text-2xl md:!text-3xl">Recent Orders</h2>
          </div>
          <Link to="/admin/orders" className="btn-ghost !py-2.5 !px-4 !text-xs">
            All Orders <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-luxe-lineLight dark:border-luxe-line text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                <th className="text-left px-6 py-4 font-semibold">Order</th>
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">Items</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-right px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-lineLight dark:divide-luxe-line">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold">{o.id}</div>
                    <div className="text-xs text-ink-500 dark:text-white/60">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-signature-gradient text-white text-xs font-bold">
                        A
                      </div>
                      <div>
                        <div className="font-semibold">Aarav Mehta</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">aarav@luxe.shop</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {o.items.slice(0, 3).map((i) => (
                        <img key={i.productId} src={i.image} alt="" className="h-9 w-9 rounded-xl object-cover ring-2 ring-white dark:ring-ink-900" />
                      ))}
                      {o.items.length > 3 && (
                        <div className="grid h-9 w-9 place-items-center rounded-xl ring-2 ring-white dark:ring-ink-900 bg-white/60 dark:bg-white/10 text-[10px] font-bold">
                          +{o.items.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
                      o.status === "shipped"
                        ? "bg-royal-500/15 text-royal-600 dark:text-royal-400 border-royal-500/30"
                        : o.status === "delivered"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-gold-500/15 text-gold-700 dark:text-gold-400 border-gold-500/30"
                    )}>
                      <span className={cn(
                        "h-1.5 w-1.5 rounded-full animate-pulse",
                        o.status === "delivered" ? "bg-emerald-500" : o.status === "shipped" ? "bg-royal-500" : "bg-gold-500"
                      )} />
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="font-display text-xl font-bold text-gradient-signature">
                      {formatCurrency(o.total)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 ml-auto">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrdersAdmin() {
  const [f, setF] = useState<string>("all");
  const filtered = orders.filter((o) => f === "all" || o.status === f);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg !text-4xl">Orders ({orders.length})</h1>
          <p className="mt-2 text-ink-500 dark:text-white/60">
            Manage, fulfill, and track every customer order.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500 dark:text-white/60" />
            <input className="input-luxe !py-2.5 pl-11 !w-72" placeholder="Search by order, customer…" />
          </div>
          <button className="btn-primary !py-2.5">Export CSV</button>
        </div>
      </div>

      <div className="flex gap-2 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-1.5 flex-wrap">
        {["all", "pending", "paid", "shipped", "delivered", "refunded"].map((s) => (
          <button
            key={s}
            onClick={() => setF(s)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider capitalize transition",
              f === s ? "bg-signature-gradient text-white shadow-glow-purple" : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-500 dark:text-white/60"
            )}
          >
            {s} · {s === "all" ? orders.length : orders.filter((o) => o.status === s).length}
          </button>
        ))}
      </div>

      <div className="rounded-[32px] glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-luxe-lineLight dark:border-luxe-line text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                <th className="text-left px-6 py-4 font-semibold">Order</th>
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">Items</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-left px-6 py-4 font-semibold">Tracking</th>
                <th className="text-right px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-lineLight dark:divide-luxe-line">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="font-mono font-bold">{o.id}</div>
                    <div className="text-xs text-ink-500 dark:text-white/60">
                      {new Date(o.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-signature-gradient text-white text-xs font-bold">
                        A
                      </div>
                      <div>
                        <div className="font-semibold">Aarav Mehta</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">aarav@luxe.shop</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {o.items.slice(0, 3).map((i) => (
                          <img key={i.productId} src={i.image} alt="" className="h-9 w-9 rounded-xl object-cover ring-2 ring-white dark:ring-ink-900" />
                        ))}
                      </div>
                      <div className="text-xs text-ink-500 dark:text-white/60 font-semibold">
                        {o.items.length} item{o.items.length === 1 ? "" : "s"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      defaultValue={o.status}
                      className="rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider border border-luxe-lineLight dark:border-luxe-line bg-transparent outline-none focus:border-royalpurple-500 transition"
                    >
                      {["pending", "paid", "shipped", "delivered", "refunded"].map((s) => (
                        <option key={s} value={s} className="bg-white dark:bg-ink-900 capitalize">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono">
                    {o.tracking || "—"}
                  </td>
                  <td className="px-6 py-4 text-right font-display text-xl font-bold text-gradient-signature">
                    {formatCurrency(o.total)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProductsAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg !text-4xl">Products ({products.length})</h1>
          <p className="mt-2 text-ink-500 dark:text-white/60">
            Edit inventory, pricing, and product content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500 dark:text-white/60" />
            <input className="input-luxe !py-2.5 pl-11 !w-72" placeholder="Search products…" />
          </div>
          <button className="btn-primary !py-2.5 inline-flex gap-2">
            <Plus className="h-4 w-4" /> New Product
          </button>
        </div>
      </div>

      <div className="rounded-[32px] glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-luxe-lineLight dark:border-luxe-line text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                <th className="text-left px-6 py-4 font-semibold">Product</th>
                <th className="text-left px-6 py-4 font-semibold">Category</th>
                <th className="text-left px-6 py-4 font-semibold">Price</th>
                <th className="text-left px-6 py-4 font-semibold">Stock</th>
                <th className="text-left px-6 py-4 font-semibold">Rating</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-lineLight dark:divide-luxe-line">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={p.images[0]} alt="" className="h-14 w-14 rounded-2xl object-cover" />
                      <div className="min-w-0">
                        <div className="font-semibold truncate max-w-sm">{p.title}</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">
                          {p.brand} · SKU {p.id.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">
                    <span className="chip">{p.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-display text-lg font-bold">{formatCurrency(p.price)}</div>
                    {p.compareAtPrice && (
                      <div className="text-xs text-ink-400 line-through">{formatCurrency(p.compareAtPrice)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={cn(
                      "font-bold",
                      p.stock < 25 ? "text-rose-500" : p.stock < 75 ? "text-gold-600 dark:text-gold-400" : "text-emerald-500"
                    )}>
                      {p.stock}
                    </div>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10 mt-1.5">
                      <div
                        className={cn(
                          "h-full",
                          p.stock < 25 ? "bg-rose-500" : p.stock < 75 ? "bg-gold-500" : "bg-emerald-500"
                        )}
                        style={{ width: `${Math.min(100, p.stock)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 text-gold-500 fill-gold-500" />
                      <span className="font-bold">{p.rating}</span>
                      <span className="text-xs text-ink-500 dark:text-white/60">({p.reviewCount})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.featured && (
                        <span className="rounded-full bg-signature-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                          Featured
                        </span>
                      )}
                      {p.isNew && (
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                          NEW
                        </span>
                      )}
                      {!p.featured && !p.isNew && (
                        <span className="rounded-full bg-ink-200/50 dark:bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-500 dark:text-white/60">
                          Standard
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toast("Deleted", `Removed ${p.title}`, "info")}
                        className="grid h-9 w-9 place-items-center rounded-xl hover:bg-rose-500/10 text-rose-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CustomersAdmin() {
  const sample = [
    { n: "Aarav Mehta", e: "aarav@luxe.shop", s: "Mumbai, IN", orders: 12, spent: 8420, tier: "Gold", last: "2 days ago" },
    { n: "Isabella Moretti", e: "isa@maison.it", s: "Milan, IT", orders: 7, spent: 5280, tier: "Silver", last: "1 week ago" },
    { n: "Noah Williams", e: "noah@w.llms", s: "New York, US", orders: 19, spent: 12340, tier: "Platinum", last: "Today" },
    { n: "Priya Kapoor", e: "priya@kaps.in", s: "Delhi, IN", orders: 4, spent: 1780, tier: "Bronze", last: "3 weeks ago" },
    { n: "Kenji Tanaka", e: "kenji@tok.jp", s: "Tokyo, JP", orders: 22, spent: 15980, tier: "Platinum", last: "5 hours ago" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-lg !text-4xl">Customers ({sample.length}+)</h1>
          <p className="mt-2 text-ink-500 dark:text-white/60">
            View lifetime value, tier, and activity of every LUXE member.
          </p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500 dark:text-white/60" />
          <input className="input-luxe !py-2.5 pl-11 !w-80" placeholder="Search customers…" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { t: "Total", v: "12,482", d: "+6.4% this month", c: "signature" },
          { t: "Active", v: "7,214", d: "+4.1% WoW", c: "emerald" },
          { t: "Gold+", v: "982", d: "Top 7.8% of customers", c: "gold" },
          { t: "At risk", v: "318", d: "Idle > 90 days", c: "rose" },
        ].map((s, i) => (
          <KPI key={s.t} title={s.t} value={s.v} delta={s.d} icon={Users} tint={s.t as any} up={i !== 3} />
        ))}
      </div>

      <div className="rounded-[32px] glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-luxe-lineLight dark:border-luxe-line text-[11px] uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                <th className="text-left px-6 py-4 font-semibold">Customer</th>
                <th className="text-left px-6 py-4 font-semibold">Location</th>
                <th className="text-left px-6 py-4 font-semibold">Orders</th>
                <th className="text-left px-6 py-4 font-semibold">Total Spent</th>
                <th className="text-left px-6 py-4 font-semibold">Tier</th>
                <th className="text-left px-6 py-4 font-semibold">Last Seen</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxe-lineLight dark:divide-luxe-line">
              {sample.map((c, i) => (
                <tr key={i} className="hover:bg-white/40 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-signature-gradient text-white font-bold">
                        {c.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-semibold">{c.n}</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">{c.e}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink-500 dark:text-white/60">{c.s}</td>
                  <td className="px-6 py-4 font-semibold">{c.orders}</td>
                  <td className="px-6 py-4 font-display text-lg font-bold text-gradient-signature">
                    {formatCurrency(c.spent)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border",
                      c.tier === "Platinum"
                        ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                        : c.tier === "Gold"
                        ? "bg-gold-500/10 text-gold-700 dark:text-gold-400 border-gold-500/30"
                        : c.tier === "Silver"
                        ? "bg-ink-200/50 dark:bg-white/10 text-ink-700 dark:text-white/80 border-luxe-lineLight dark:border-luxe-line"
                        : "bg-amber-700/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                    )}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-500 dark:text-white/60 text-xs font-semibold">{c.last}</td>
                  <td className="px-6 py-4">
                    <button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 ml-auto">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg !text-4xl">Analytics</h1>
        <p className="mt-2 text-ink-500 dark:text-white/60">
          Deep dive into performance metrics, attribution, and cohort trends.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPI title="Conversion Rate" value="3.82%" delta="+0.6pp" icon={TrendingUp} tint="signature" />
        <KPI title="Returning Customer" value="48.4%" delta="+3.1pp" icon={Users} tint="emerald" />
        <KPI title="AOV" value={formatCurrency(682)} delta="+5.3%" icon={DollarSign} tint="gold" />
        <KPI title="Cart Abandonment" value="62.1%" delta="-2.1pp" icon={ShoppingCart} tint="rose" up />
      </div>

      <div className="rounded-[32px] glass-card p-6">
        <div className="mb-6">
          <span className="eyebrow">Year-over-Year</span>
          <h2 className="heading-md mt-3 !text-2xl md:!text-3xl">Revenue trend (stacked)</h2>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueSeries} margin={{ left: -10 }}>
            <defs>
              <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1E40AF" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#1E40AF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="a2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="a3" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" opacity={0.12} vertical={false} />
            <XAxis dataKey="month" stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
            <YAxis stroke="currentColor" opacity={0.5} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 16, border: "none", background: "rgba(10,10,10,0.85)", color: "white", backdropFilter: "blur(12px)" }} />
            <Legend wrapperStyle={{ paddingTop: 16 }} />
            <Area type="monotone" dataKey="revenue" stackId="1" name="Apparel" stroke="#1E40AF" strokeWidth={2} fill="url(#a1)" />
            <Area
              type="monotone"
              dataKey="orders"
              stackId="1"
              name="Footwear"
              stroke="#7C3AED"
              strokeWidth={2}
              fill="url(#a2)"
            />
            <Area
              type="monotone"
              dataKey={(d) => (d.revenue * 0.4)}
              stackId="1"
              name="Accessories"
              stroke="#D4AF37"
              strokeWidth={2}
              fill="url(#a3)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SettingsAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-lg !text-4xl">Store Settings</h1>
        <p className="mt-2 text-ink-500 dark:text-white/60">
          Theme, payments, shipping, taxes, and team members.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { t: "Store details", d: "Name, logo, contact, legal pages", i: Sparkles },
          { t: "Theme & Branding", d: "Colors, fonts, homepage layout", i: Eye },
          { t: "Payments", d: "Stripe, PayPal, Apple Pay, wallets", i: DollarSign },
          { t: "Shipping & Taxes", d: "Zones, carriers, tax calculations", i: ShoppingBag },
          { t: "Domains & URLs", d: "Primary domain, redirects, SEO", i: Zap },
          { t: "Team Members", d: "Roles, permissions, invites", i: Users },
        ].map((c, i) => {
          const Icon = c.i;
          return (
            <motion.button
              key={c.t}
              whileHover={{ y: -3 }}
              className="rounded-[28px] glass-card p-6 text-left hover:shadow-2xl transition flex items-center gap-4"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-signature-gradient text-white shadow-glow-purple">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="font-heading text-xl font-semibold">{c.t}</div>
                <div className="mt-0.5 text-sm text-ink-500 dark:text-white/60">{c.d}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-royalpurple-500" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <Shell>
      <Routes>
        <Route index element={<DashboardIndex />} />
        <Route path="orders" element={<OrdersAdmin />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="customers" element={<CustomersAdmin />} />
        <Route path="analytics" element={<AnalyticsAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Routes>
    </Shell>
  );
}
