import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Check,
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
  MapPin,
  Package,
  Sparkles,
  Copy,
  Home as HomeIcon,
  Building2,
  Phone,
  Mail,
  User,
} from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

type Step = "account" | "address" | "shipping" | "payment" | "confirm";
const steps: { k: Step; t: string; i: any }[] = [
  { k: "account", t: "Account", i: User },
  { k: "address", t: "Address", i: MapPin },
  { k: "shipping", t: "Shipping", i: Truck },
  { k: "payment", t: "Payment", i: CreditCard },
  { k: "confirm", t: "Confirm", i: Sparkles },
];

export default function CheckoutPage() {
  const nav = useNavigate();
  const user = useAuthStore((s) => s.user);
  const isGuest = useAuthStore((s) => s.isGuest);
  const isAuthed = useAuthStore((s) => s.isAuthed);

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = useCartStore((s) => s.shipping());
  const tax = useCartStore((s) => s.tax());
  const discount = useCartStore((s) => s.discount());
  const total = useCartStore((s) => s.total());
  const coupon = useCartStore((s) => s.coupon);
  const clear = useCartStore((s) => s.clear);

  const [step, setStep] = useState<Step>(!isAuthed && !isGuest ? "account" : "address");
  const [mode, setMode] = useState<"login" | "guest" | "register">(
    isAuthed ? "login" : isGuest ? "guest" : "login"
  );

  const [shipMethod, setShipMethod] = useState<"standard" | "express" | "nextday">("standard");
  const shipCost = shipMethod === "standard" ? shipping : shipMethod === "express" ? 35 : 75;
  const shipDays = shipMethod === "standard" ? "4–7" : shipMethod === "express" ? "2–3" : "Next day";

  const [addr, setAddr] = useState({
    first: user?.name.split(" ")[0] || "",
    last: user?.name.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.addresses?.[0]?.phone || "",
    line1: user?.addresses?.[0]?.line1 || "",
    line2: "",
    city: user?.addresses?.[0]?.city || "",
    zip: user?.addresses?.[0]?.zip || "",
    country: user?.addresses?.[0]?.country || "India",
    type: "home" as "home" | "work",
  });

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    save: true,
  });
  const [billingSame, setBillingSame] = useState(true);

  const [ordering, setOrdering] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const stepIdx = steps.findIndex((s) => s.k === step);
  const canNext = () => {
    if (step === "account") {
      if (mode === "login" || mode === "guest") return true;
      return true;
    }
    if (step === "address") return addr.first && addr.last && addr.email && addr.line1 && addr.city && addr.zip && addr.country;
    if (step === "shipping") return !!shipMethod;
    if (step === "payment") return card.number.replace(/\s/g, "").length >= 13 && card.name && card.expiry && card.cvv.length >= 3;
    return true;
  };

  const next = async () => {
    if (stepIdx < steps.length - 1) {
      setStep(steps[stepIdx + 1].k);
    } else {
      setOrdering(true);
      await new Promise((r) => setTimeout(r, 1800));
      const ordId = "ORD-" + Math.floor(Math.random() * 90000 + 10000);
      setDone(ordId);
      clear();
      setOrdering(false);
    }
  };

  const back = () => {
    if (stepIdx > 0) setStep(steps[stepIdx - 1].k);
    else nav("/cart");
  };

  if (done) {
    return (
      <div className="container pt-14 pb-24 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[40px] glass-card p-10 md:p-14 text-center"
        >
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-signature-gradient shadow-glow-purple">
            <Check className="h-12 w-12 text-white" strokeWidth={3} />
          </div>
          <h1 className="heading-lg mt-8">Order confirmed.</h1>
          <p className="mt-4 mx-auto max-w-lg text-ink-600 dark:text-white/75 text-lg">
            Thank you. Your order <span className="font-mono font-bold">{done}</span> has been received.
            A confirmation email has been dispatched to your inbox.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3 text-left">
            <div className="rounded-3xl border border-luxe-lineLight dark:border-luxe-line p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                Order #
              </div>
              <div className="mt-1 font-mono text-lg font-bold">{done}</div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(done);
                  toast("Copied", "Order number copied to clipboard", "success");
                }}
                className="mt-2 text-xs font-semibold link-underline text-royalpurple-500 inline-flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </button>
            </div>
            <div className="rounded-3xl border border-luxe-lineLight dark:border-luxe-line p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                Estimated delivery
              </div>
              <div className="mt-1 font-display text-lg font-bold">
                {shipDays} business days
              </div>
              <div className="mt-2 text-xs text-ink-500 dark:text-white/60">
                Signature required
              </div>
            </div>
            <div className="rounded-3xl border border-luxe-lineLight dark:border-luxe-line p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                Amount paid
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-gradient-signature">
                {formatCurrency(total + (shipCost - shipping))}
              </div>
              <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Secure & verified
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/dashboard" className="btn-primary">
              Track in Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/shop" className="btn-ghost">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container pt-14 pb-24 text-center max-w-2xl">
        <div className="rounded-[32px] glass-card p-10">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-aurora-gradient animate-float">
            <Package className="h-7 w-7 text-white" />
          </div>
          <h1 className="heading-md mt-6">Nothing to check out.</h1>
          <p className="mt-3 text-ink-500 dark:text-white/60">Your bag is currently empty.</p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Browse Shop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-6 md:pt-10 pb-44 lg:pb-24">
      <div className="mb-5 md:mb-8 flex items-center gap-3 text-xs md:text-sm text-ink-500 dark:text-white/60">
        <Link to="/cart" className="link-underline inline-flex items-center gap-1">
          <ChevronLeft className="h-3.5 w-3.5" /> Back to Cart
        </Link>
      </div>

      {/* Progress bar */}
      <div className="mb-6 md:mb-10">
        <div className="grid grid-cols-5 gap-1 md:gap-2 relative">
          <div className="absolute left-0 right-0 top-6 md:top-6 h-0.5 -z-10 bg-luxe-lineLight dark:bg-luxe-line mx-4 md:mx-8" />
          <div
            className="absolute top-6 md:top-6 h-0.5 -z-10 bg-signature-gradient transition-all duration-500 mx-4 md:mx-8"
            style={{ width: `calc(${(stepIdx / 4) * 100}% - ${(stepIdx === 0 ? 0 : (stepIdx / 4)) * 0}px)` }}
          />
          {steps.map((s, i) => {
            const Icon = s.i;
            const active = i === stepIdx;
            const passed = i < stepIdx;
            return (
              <button
                key={s.k}
                onClick={() => i <= stepIdx && setStep(s.k)}
                className="flex flex-col items-center gap-1.5 md:gap-2 group"
              >
                <div
                  className={cn(
                    "relative grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-xl md:rounded-2xl border-2 transition shrink-0",
                    passed
                      ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                      : active
                      ? "bg-white dark:bg-luxe-surface border-royalpurple-500 text-royalpurple-500 shadow-glow-purple md:scale-110"
                      : "bg-white dark:bg-white/5 border-luxe-lineLight dark:border-luxe-line text-ink-400 dark:text-white/40"
                  )}
                >
                  {passed ? <Check className="h-4 w-4 md:h-5 md:w-5" strokeWidth={3} /> : <Icon className="h-4 w-4 md:h-5 md:w-5" />}
                </div>
                <div
                  className={cn(
                    "hidden sm:block text-[10px] md:text-xs font-bold uppercase tracking-wider text-center",
                    active ? "text-ink-900 dark:text-white" : "text-ink-400 dark:text-white/40"
                  )}
                >
                  {s.t}
                </div>
                <div className="sm:hidden text-[10px] font-black text-royalpurple-500">{i + 1}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_420px]">
        {/* Step content */}
        <div className="rounded-2xl md:rounded-[32px] glass-card p-4 md:p-6 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === "account" && (
                <div>
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-2xl md:text-3xl mb-2">Account</h2>
                  <p className="text-xs md:text-sm text-ink-500 dark:text-white/60 mb-5 md:mb-8">
                    Check out faster with your LUXE account, or continue as a guest.
                  </p>
                  <div className="grid gap-1.5 md:gap-2 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-1.5 mb-5 md:mb-8 md:grid-cols-3">
                    {(["login", "guest", "register"] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={cn(
                          "rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold capitalize transition",
                          mode === m
                            ? "bg-signature-gradient text-white shadow-glow-purple"
                            : "hover:bg-white/60 dark:hover:bg-white/10 text-ink-600 dark:text-white/70"
                        )}
                      >
                        {m === "login" ? "Sign in" : m === "guest" ? "Guest" : "Create account"}
                      </button>
                    ))}
                  </div>

                  {mode === "login" && !isAuthed && (
                    <div className="space-y-3 md:space-y-4 max-w-md">
                      <div>
                        <label className="label-luxe !text-xs md:!text-sm">Email</label>
                        <input className="input-luxe !py-3 md:!py-3.5 text-sm" placeholder="you@luxe.atelier" defaultValue={user?.email || ""} />
                      </div>
                      <div>
                        <label className="label-luxe !text-xs md:!text-sm">Password</label>
                        <input type="password" className="input-luxe !py-3 md:!py-3.5 text-sm" placeholder="••••••••" />
                      </div>
                    </div>
                  )}
                  {mode === "register" && (
                    <div className="grid gap-3 md:gap-4 max-w-md md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label className="label-luxe !text-xs md:!text-sm">First name</label>
                        <input className="input-luxe !py-3 md:!py-3.5 text-sm" />
                      </div>
                      <div>
                        <label className="label-luxe !text-xs md:!text-sm">Last name</label>
                        <input className="input-luxe !py-3 md:!py-3.5 text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-luxe !text-xs md:!text-sm">Email</label>
                        <input type="email" className="input-luxe !py-3 md:!py-3.5 text-sm" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="label-luxe !text-xs md:!text-sm">Password</label>
                        <input type="password" className="input-luxe !py-3 md:!py-3.5 text-sm" placeholder="Create a secure password" />
                      </div>
                    </div>
                  )}
                  {mode === "guest" && (
                    <div className="max-w-md">
                      <label className="label-luxe !text-xs md:!text-sm">Email for order confirmation</label>
                      <input type="email" className="input-luxe !py-3 md:!py-3.5 text-sm" placeholder="you@example.com" />
                      <div className="mt-2 md:mt-3 text-xs text-ink-500 dark:text-white/60">
                        <Lock className="h-3.5 w-3.5 inline mr-1" /> Your email is used only for order updates.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === "address" && (
                <div>
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-2xl md:text-3xl mb-2">Shipping address</h2>
                  <p className="text-xs md:text-sm text-ink-500 dark:text-white/60 mb-5 md:mb-8">
                    Where should we deliver this order?
                  </p>

                  <div className="grid gap-3 md:gap-4 md:grid-cols-2">
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm">First name</label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.first} onChange={(e) => setAddr({ ...addr, first: e.target.value })} />
                    </div>
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm">Last name</label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.last} onChange={(e) => setAddr({ ...addr, last: e.target.value })} />
                    </div>
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </label>
                      <input type="email" className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.email} onChange={(e) => setAddr({ ...addr, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone
                      </label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.phone} onChange={(e) => setAddr({ ...addr, phone: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-luxe !text-xs md:!text-sm flex items-center gap-1">
                        <HomeIcon className="h-3 w-3" /> Street address
                      </label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.line1} onChange={(e) => setAddr({ ...addr, line1: e.target.value })} placeholder="Line 1" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-luxe !text-xs md:!text-sm opacity-60">Apt, suite, unit (optional)</label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.line2} onChange={(e) => setAddr({ ...addr, line2: e.target.value })} placeholder="Line 2" />
                    </div>
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm">City</label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} />
                    </div>
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm">ZIP / Postal</label>
                      <input className="input-luxe !py-3 md:!py-3.5 text-sm" value={addr.zip} onChange={(e) => setAddr({ ...addr, zip: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-luxe !text-xs md:!text-sm">Country</label>
                      <select
                        className="input-luxe !py-3 md:!py-3.5 text-sm"
                        value={addr.country}
                        onChange={(e) => setAddr({ ...addr, country: e.target.value })}
                      >
                        {["India", "United States", "United Kingdom", "France", "Germany", "Japan", "Australia", "UAE", "Singapore"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 grid gap-2 md:gap-2 md:grid-cols-2">
                    <label className={cn(
                      "flex items-center gap-3 rounded-2xl border p-3 md:p-4 cursor-pointer transition",
                      addr.type === "home" ? "border-royalpurple-500 bg-royalpurple-500/10" : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/50 dark:hover:bg-white/5"
                    )}>
                      <div className="grid h-8 w-8 md:h-9 md:w-9 place-items-center rounded-xl bg-white/50 dark:bg-white/10"><HomeIcon className="h-3.5 w-3.5 md:h-4 md:w-4" /></div>
                      <div className="flex-1 text-xs md:text-sm font-semibold">Home</div>
                      <input type="radio" checked={addr.type === "home"} onChange={() => setAddr({ ...addr, type: "home" })} className="accent-royalpurple-500" />
                    </label>
                    <label className={cn(
                      "flex items-center gap-3 rounded-2xl border p-3 md:p-4 cursor-pointer transition",
                      addr.type === "work" ? "border-royalpurple-500 bg-royalpurple-500/10" : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/50 dark:hover:bg-white/5"
                    )}>
                      <div className="grid h-8 w-8 md:h-9 md:w-9 place-items-center rounded-xl bg-white/50 dark:bg-white/10"><Building2 className="h-3.5 w-3.5 md:h-4 md:w-4" /></div>
                      <div className="flex-1 text-xs md:text-sm font-semibold">Work / Office</div>
                      <input type="radio" checked={addr.type === "work"} onChange={() => setAddr({ ...addr, type: "work" })} className="accent-royalpurple-500" />
                    </label>
                  </div>
                </div>
              )}

              {step === "shipping" && (
                <div>
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-2xl md:text-3xl mb-2">Delivery method</h2>
                  <p className="text-xs md:text-sm text-ink-500 dark:text-white/60 mb-5 md:mb-8">
                    Choose how fast (or fancy) you'd like your LUXE delivery.
                  </p>
                  <div className="space-y-2 md:space-y-3">
                    {[
                      {
                        k: "standard" as const,
                        t: subtotal >= 500 ? "Complimentary Standard" : "Standard",
                        d: `${shipDays} business days · Tracked`,
                        c: shipMethod === "standard" ? 0 : 15,
                        i: Truck,
                      },
                      { k: "express" as const, t: "Express", d: `${shipDays} business days · Signature required`, c: 35, i: Truck },
                      { k: "nextday" as const, t: "Next-Day Concierge", d: "Delivered tomorrow · White-glove", c: 75, i: Sparkles },
                    ].map((m) => {
                      const Icon = m.i;
                      return (
                        <button
                          key={m.k}
                          onClick={() => setShipMethod(m.k)}
                          className={cn(
                            "w-full flex items-center gap-2 md:gap-4 rounded-2xl md:rounded-3xl border p-3 md:p-5 transition text-left",
                            shipMethod === m.k
                              ? "border-royalpurple-500 bg-royalpurple-500/10 shadow-glow-purple"
                              : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/50 dark:hover:bg-white/5"
                          )}
                        >
                          <div className={cn(
                            "grid h-10 w-10 md:h-12 md:w-12 shrink-0 place-items-center rounded-xl md:rounded-2xl",
                            shipMethod === m.k ? "bg-signature-gradient text-white" : "bg-white/60 dark:bg-white/10 text-ink-700 dark:text-white"
                          )}>
                            <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-heading font-semibold text-sm md:text-lg">{m.t}</div>
                            <div className="text-xs md:text-sm text-ink-500 dark:text-white/60 truncate">{m.d}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-display text-lg md:text-xl font-bold text-gradient-signature">
                              {m.c === 0 ? <span className="text-emerald-600 dark:text-emerald-400 text-xs md:text-lg">FREE</span> : formatCurrency(m.c)}
                            </div>
                          </div>
                          <div className={cn(
                            "h-4 w-4 md:h-5 md:w-5 rounded-full border-2 shrink-0",
                            shipMethod === m.k ? "border-royalpurple-500 bg-royalpurple-500" : "border-luxe-lineLight dark:border-luxe-line"
                          )}>
                            {shipMethod === m.k && <div className="h-full w-full rounded-full ring-4 ring-white dark:ring-luxe-bg scale-[1.3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === "payment" && (
                <div>
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-2xl md:text-3xl mb-2">Payment</h2>
                  <p className="text-xs md:text-sm text-ink-500 dark:text-white/60 mb-5 md:mb-8">
                    All transactions are 256-bit SSL encrypted. We never store your full card number.
                  </p>

                  <div className="space-y-3 md:space-y-4 max-w-xl">
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm">Card number</label>
                      <div className="relative">
                        <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-royalpurple-500" />
                        <input
                          className="input-luxe !py-3 md:!py-3.5 text-sm pl-11"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={card.number}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                            setCard({ ...card, number: v.replace(/(.{4})/g, "$1 ").trim() });
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-luxe !text-xs md:!text-sm">Name on card</label>
                      <input
                        className="input-luxe !py-3 md:!py-3.5 text-sm"
                        placeholder="Aarav Mehta"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="label-luxe !text-xs md:!text-sm">Expiry</label>
                        <input
                          className="input-luxe !py-3 md:!py-3.5 text-sm"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={card.expiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                            setCard({ ...card, expiry: v });
                          }}
                        />
                      </div>
                      <div>
                        <label className="label-luxe !text-xs md:!text-sm">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          className="input-luxe !py-3 md:!py-3.5 text-sm"
                          placeholder="•••"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3 md:p-4 mt-3 md:mt-5 cursor-pointer hover:bg-white/50 dark:hover:bg-white/5">
                      <input
                        type="checkbox"
                        checked={card.save}
                        onChange={(e) => setCard({ ...card, save: e.target.checked })}
                        className="accent-royalpurple-500 mt-0.5"
                      />
                      <div className="text-xs md:text-sm">
                        <div className="font-semibold">Save card for future orders</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">
                          <ShieldCheck className="h-3.5 w-3.5 inline mr-1 text-emerald-500" />
                          Tokenized, PCI-DSS compliant.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3 md:p-4 cursor-pointer hover:bg-white/50 dark:hover:bg-white/5">
                      <input
                        type="checkbox"
                        checked={billingSame}
                        onChange={(e) => setBillingSame(e.target.checked)}
                        className="accent-royalpurple-500 mt-0.5"
                      />
                      <div className="text-xs md:text-sm">
                        <div className="font-semibold">Billing address same as shipping</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">
                          Uncheck to use different billing address.
                        </div>
                      </div>
                    </label>

                    <div className="mt-3 md:mt-5 grid grid-cols-5 gap-1 md:gap-2">
                      {["VISA", "MC", "AMEX", "UPI", "GPay"].map((p) => (
                        <div key={p} className="rounded-xl border border-luxe-lineLight dark:border-luxe-line bg-white/50 dark:bg-white/5 py-2 md:py-3 text-center text-[9px] md:text-[10px] font-bold tracking-widest text-ink-500 dark:text-white/60">
                          {p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === "confirm" && (
                <div>
                  <h2 className="font-display font-black leading-[0.95] tracking-tight text-2xl md:text-3xl mb-2">Review & place order</h2>
                  <p className="text-xs md:text-sm text-ink-500 dark:text-white/60 mb-5 md:mb-8">
                    Please confirm everything looks good before placing your order.
                  </p>

                  <div className="space-y-3 md:space-y-6">
                    <div className="rounded-2xl md:rounded-3xl border border-luxe-lineLight dark:border-luxe-line p-3 md:p-5">
                      <div className="flex items-center justify-between mb-2 md:mb-3 gap-2">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                          <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5 inline mr-1" /> Shipping to
                        </div>
                        <button onClick={() => setStep("address")} className="text-[11px] md:text-xs font-semibold text-royalpurple-500 link-underline shrink-0">
                          Edit
                        </button>
                      </div>
                      <div className="font-semibold text-sm md:text-base">{addr.first} {addr.last}</div>
                      <div className="text-xs md:text-sm text-ink-600 dark:text-white/75">
                        {addr.line1}
                        {addr.line2 && ` · ${addr.line2}`}
                        <br />
                        {addr.city}, {addr.zip}, {addr.country}
                        <br />
                        {addr.phone} · {addr.email}
                      </div>
                    </div>

                    <div className="rounded-2xl md:rounded-3xl border border-luxe-lineLight dark:border-luxe-line p-3 md:p-5">
                      <div className="flex items-center justify-between mb-2 md:mb-3 gap-2">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                          <Truck className="h-3 w-3 md:h-3.5 md:w-3.5 inline mr-1" /> Delivery
                        </div>
                        <button onClick={() => setStep("shipping")} className="text-[11px] md:text-xs font-semibold text-royalpurple-500 link-underline shrink-0">
                          Edit
                        </button>
                      </div>
                      <div className="font-semibold text-sm md:text-base capitalize">{shipMethod}</div>
                      <div className="text-xs md:text-sm text-ink-600 dark:text-white/75">
                        {shipDays} business days · {shipCost === 0 ? "Complimentary" : formatCurrency(shipCost)}
                      </div>
                    </div>

                    <div className="rounded-2xl md:rounded-3xl border border-luxe-lineLight dark:border-luxe-line p-3 md:p-5">
                      <div className="flex items-center justify-between mb-3 md:mb-4 gap-2">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                          <Package className="h-3 w-3 md:h-3.5 md:w-3.5 inline mr-1" /> Items ({items.length})
                        </div>
                        <button onClick={() => nav("/cart")} className="text-[11px] md:text-xs font-semibold text-royalpurple-500 link-underline shrink-0">
                          Edit bag
                        </button>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        {items.map((i) => (
                          <div key={i.productId} className="flex gap-3 items-center">
                            <img src={i.image} className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-xl object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold truncate text-sm md:text-base">{i.title}</div>
                              <div className="text-[10px] md:text-xs text-ink-500 dark:text-white/60">
                                {[i.color, i.size, `Qty ${i.quantity}`].filter(Boolean).join(" · ")}
                              </div>
                            </div>
                            <div className="font-semibold text-xs md:text-base shrink-0">{formatCurrency(i.priceSnapshot * i.quantity)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="hidden lg:flex mt-8 md:mt-10 items-center justify-between gap-3 pt-4 md:pt-6 border-t border-luxe-lineLight dark:border-luxe-line">
            <button onClick={back} className="btn-ghost !py-3 inline-flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" /> {stepIdx === 0 ? "Cart" : "Back"}
            </button>
            <button
              onClick={next}
              disabled={!canNext() || ordering}
              className={cn(
                "btn-primary !py-3.5 min-w-[180px]",
                !canNext() && "opacity-50 cursor-not-allowed"
              )}
            >
              {ordering ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Placing order…
                </span>
              ) : stepIdx === steps.length - 1 ? (
                <>Place Order <ShieldCheck className="h-4 w-4" /></>
              ) : (
                <>Continue <ChevronRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="pb-0 lg:pb-0 -mx-1 lg:mx-0 order-2">
          <div className="space-y-3 md:space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-6 space-y-3 md:space-y-4">
              <h3 className="font-display font-black text-2xl md:text-3xl">Summary</h3>
              <div className="space-y-2 md:space-y-3 max-h-64 md:max-h-80 overflow-y-auto">
                {items.map((i) => (
                  <div key={i.productId} className="flex gap-3 items-center">
                    <img src={i.image} className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm font-semibold truncate">{i.title}</div>
                      <div className="text-[10px] md:text-[11px] text-ink-500 dark:text-white/60 truncate">
                        {[i.color, i.size].filter(Boolean).join(" · ")} · Qty {i.quantity}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm font-bold shrink-0">{formatCurrency(i.priceSnapshot * i.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-luxe-lineLight dark:bg-luxe-line" />
              <dl className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-white/60">Subtotal</dt>
                  <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
                </div>
                {discount > 0 && coupon && (
                  <div className="flex justify-between">
                    <dt className="text-rose-500 text-[11px] md:text-xs">{coupon.code}</dt>
                    <dd className="font-semibold text-rose-500">− {formatCurrency(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-white/60">Shipping</dt>
                  <dd className="font-semibold">
                    {shipCost === 0 ? <span className="text-emerald-600 dark:text-emerald-400">FREE</span> : formatCurrency(shipCost)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-white/60">Tax</dt>
                  <dd className="font-semibold">{formatCurrency(tax)}</dd>
                </div>
              </dl>
              <div className="h-px bg-luxe-lineLight dark:bg-luxe-line" />
              <div className="flex items-end justify-between gap-2">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">Total</div>
                <div className="font-display font-black text-gradient-signature text-2xl md:text-3xl leading-none">
                  {formatCurrency(total + (shipCost - shipping))}
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-2.5 md:p-3 flex items-center gap-2 text-[10px] md:text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Lock className="h-3.5 w-3.5 shrink-0" />
                256-bit SSL · PCI-DSS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom pay bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-luxe-lineLight dark:border-luxe-line bg-white/85 dark:bg-ink-950/90 backdrop-blur-xl p-3 sm:p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
        <div className="container max-w-xl mx-auto flex items-center gap-3">
          <button onClick={back} className="hidden sm:inline-flex btn-ghost !py-2.5 !px-4 !text-xs">
            <ChevronLeft className="h-3.5 w-3.5" /> Back
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink-500 dark:text-white/60">
              Step {stepIdx + 1}/5 · Total
            </div>
            <div className="font-display font-black text-gradient-signature text-xl sm:text-2xl leading-none">
              {formatCurrency(total + (shipCost - shipping))}
            </div>
          </div>
          <button
            onClick={next}
            disabled={!canNext() || ordering}
            className={cn(
              "btn-primary flex-1 !py-2.5 text-sm inline-flex items-center justify-center gap-1.5 min-w-0",
              !canNext() && "opacity-50 cursor-not-allowed"
            )}
          >
            {ordering ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Placing…
              </span>
            ) : stepIdx === steps.length - 1 ? (
              <>Pay Now <ShieldCheck className="h-4 w-4" /></>
            ) : (
              <>Continue <ChevronRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
