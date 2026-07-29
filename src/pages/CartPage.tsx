import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  Gift,
  Tag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { products } from "@/fixtures";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";

export default function CartPage() {
  const nav = useNavigate();
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const remove = useCartStore((s) => s.remove);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = useCartStore((s) => s.shipping());
  const tax = useCartStore((s) => s.tax());
  const discount = useCartStore((s) => s.discount());
  const total = useCartStore((s) => s.total());
  const giftWrap = useCartStore((s) => s.giftWrap);
  const setGiftWrap = useCartStore((s) => s.setGiftWrap);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const coupon = useCartStore((s) => s.coupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);
  const giftWrapFee = useCartStore((s) => s.giftWrapFee());

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [giftMsg, setGiftMsg] = useState("");

  const recommendations = products
    .filter((p) => !items.some((i) => i.productId === p.id))
    .slice(0, 4);

  return (
    <div className="container pt-10 pb-52 lg:pb-24">
      <div className="mb-8 md:mb-10">
        <h1 className="mt-0 font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Your Shopping Bag</h1>
        <p className="mt-2 md:mt-3 text-sm md:text-base text-ink-500 dark:text-white/60">
          {items.length === 0
            ? "Start something beautiful — browse the atelier."
            : `${items.reduce((s, i) => s + i.quantity, 0)} piece${items.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"} ready for checkout.`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl md:rounded-[40px] glass-card p-8 sm:p-12 md:p-16 text-center">
          <div className="mx-auto grid h-20 w-20 md:h-24 md:w-24 place-items-center rounded-full bg-aurora-gradient animate-float">
            <Sparkles className="h-9 w-9 md:h-11 md:w-11 text-white" />
          </div>
          <h2 className="mt-6 md:mt-8 font-display font-black leading-[0.95] tracking-tight text-2xl sm:text-3xl md:text-4xl">Your bag is empty.</h2>
          <p className="mt-2 md:mt-3 mx-auto max-w-md text-sm md:text-base text-ink-500 dark:text-white/60">
            Every LUXE piece ships in hand-numbered packaging with a lifetime craft guarantee.
            Discover the season's edit.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn-primary justify-center inline-flex w-full sm:w-auto">
              Browse Shop <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/home" className="btn-ghost justify-center inline-flex w-full sm:w-auto">
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_420px] items-start">
          {/* Items */}
          <div className="space-y-5">
            <AnimatePresence>
              {items.map((i) => (
                <motion.div
                  key={i.productId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="group overflow-hidden rounded-[28px] glass-card"
                >
                  <div className="flex flex-col sm:flex-row">
                    <Link
                      to={`/product/${i.productId}`}
                      className="relative aspect-square sm:w-56 shrink-0 overflow-hidden"
                    >
                      <img
                        src={i.image}
                        alt={i.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
                            {[i.color, i.size].filter(Boolean).join(" · ") || "LUXE Atelier"}
                          </div>
                          <Link
                            to={`/product/${i.productId}`}
                            className="mt-1 block font-heading text-xl font-semibold leading-tight line-clamp-2 group-hover:text-royalpurple-500 transition"
                          >
                            {i.title}
                          </Link>
                          <div className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> In stock · Ships in 48h
                          </div>
                        </div>
                        <button
                          onClick={() => remove(i.productId)}
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-transparent hover:border-rose-500/30 hover:bg-rose-500/10 text-ink-400 hover:text-rose-500 transition"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto pt-5 flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center overflow-hidden rounded-2xl border border-luxe-lineLight dark:border-luxe-line">
                          <button
                            onClick={() => updateQty(i.productId, i.quantity - 1)}
                            className="grid h-10 w-10 place-items-center hover:bg-white/60 dark:hover:bg-white/10"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="w-10 text-center font-display font-bold">{i.quantity}</div>
                          <button
                            onClick={() => updateQty(i.productId, i.quantity + 1)}
                            className="grid h-10 w-10 place-items-center hover:bg-white/60 dark:hover:bg-white/10"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="ml-auto">
                          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60 text-right">
                            Subtotal
                          </div>
                          <div className="font-display text-2xl font-bold text-gradient-signature">
                            {formatCurrency(i.priceSnapshot * i.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Gift wrap + message */}
            <div className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div
                  className={cn(
                    "grid h-11 w-11 md:h-12 md:w-12 shrink-0 place-items-center rounded-2xl transition",
                    giftWrap
                      ? "bg-signature-gradient text-white shadow-glow-purple"
                      : "border border-luxe-lineLight dark:border-luxe-line text-ink-500 dark:text-white/60"
                  )}
                >
                  <Gift className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="flex items-start justify-between gap-3 cursor-pointer">
                    <div>
                      <div className="font-heading font-semibold text-base md:text-lg">Gift Wrap & Handwritten Note</div>
                      <div className="mt-1 text-xs md:text-sm text-ink-500 dark:text-white/60">
                        Luxe matte paper, hand-tied silk ribbon, wax-seal envelope.
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                      <div className="text-xs md:text-sm font-semibold">{formatCurrency(25)}</div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                      />
                      <div
                        className={cn(
                          "relative h-6 w-11 md:h-7 md:w-12 shrink-0 rounded-full transition",
                          giftWrap ? "bg-signature-gradient" : "bg-ink-200 dark:bg-white/10"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-0.5 h-5 w-5 md:h-5 md:w-5 rounded-full bg-white shadow transition-all",
                            giftWrap ? "left-5 md:left-6" : "left-0.5 md:left-1"
                          )}
                        />
                      </div>
                    </div>
                  </label>
                  <AnimatePresence>
                    {giftWrap && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <textarea
                          value={giftMsg}
                          onChange={(e) => setGiftMsg(e.target.value)}
                          placeholder="Write a personal message (max 200 characters)…"
                          maxLength={200}
                          className="mt-4 input-luxe resize-none !h-24 text-sm"
                        />
                        <div className="mt-2 text-right text-xs text-ink-500 dark:text-white/60 font-semibold">
                          {giftMsg.length}/200
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="mb-4 md:mb-5 flex items-center justify-between">
                <div>
                  <div className="eyebrow !text-[9px] md:!text-[10px]">Complete the Look</div>
                  <h3 className="mt-2 md:mt-3 font-display font-black leading-[0.95] tracking-tight text-xl sm:text-2xl md:text-3xl">Stylist's picks for you</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {recommendations.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="group overflow-hidden rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/40 dark:bg-white/5"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-2.5 md:p-3">
                      <div className="truncate text-xs font-semibold">{p.title}</div>
                      <div className="mt-0.5 text-sm md:text-base font-bold text-gradient-signature">
                        {formatCurrency(p.price)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="pb-0 lg:pb-0 -mx-1 lg:mx-0">
            <div className="space-y-4 md:space-y-5 lg:sticky lg:top-28">
              <div className="rounded-2xl md:rounded-[28px] glass-card p-4 md:p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl md:text-3xl">Order Summary</h3>
                  <span className="chip !text-[10px] md:!text-xs">{items.length} items</span>
                </div>

                <div className="mt-4 md:mt-5 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3 md:p-3.5">
                  <div className="mb-2 flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                    <Tag className="h-3 w-3 md:h-3.5 md:w-3.5 text-gold-500" /> Promo code
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Try LUXE10"
                      className="input-luxe flex-1 py-3 text-sm"
                    />
                    <button
                      onClick={() => {
                        const r = applyCoupon(code);
                        setMsg({ ok: r.ok, text: r.message });
                        setTimeout(() => setMsg(null), 2500);
                        if (r.ok) setCode("");
                      }}
                      className="btn-ghost px-4 py-3 w-full sm:w-auto"
                    >
                      Apply
                    </button>
                  </div>
                  {coupon && (
                    <div className="mt-2 flex items-center justify-between gap-2 rounded-xl bg-gold-500/10 border border-gold-500/30 px-3 py-2 text-[11px] md:text-xs font-semibold">
                      <span className="text-gold-700 dark:text-gold-300 min-w-0 truncate">
                        {coupon.code} applied — {formatCurrency(discount)} off
                      </span>
                      <button
                        onClick={() => {
                          removeCoupon();
                          toast("Coupon removed", "", "info");
                        }}
                        className="text-rose-500 hover:underline shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {msg && (
                    <div
                      className={cn(
                        "mt-2 text-xs font-semibold",
                        msg.ok ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                      )}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>

                <dl className="mt-4 md:mt-5 space-y-2.5 md:space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <dt className="text-ink-500 dark:text-white/60 flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5" /> Subtotal
                    </dt>
                    <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-rose-500 text-xs md:text-sm">Coupon {coupon?.code}</dt>
                      <dd className="font-semibold text-rose-500">− {formatCurrency(discount)}</dd>
                    </div>
                  )}
                  {giftWrapFee > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-ink-500 dark:text-white/60 text-xs md:text-sm">Gift Wrap</dt>
                      <dd className="font-semibold">{formatCurrency(giftWrapFee)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-ink-500 dark:text-white/60 text-xs md:text-sm">Shipping</dt>
                    <dd className="font-semibold text-xs md:text-sm">
                      {shipping === 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400">Complimentary</span>
                      ) : (
                        formatCurrency(shipping)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-500 dark:text-white/60 text-xs md:text-sm">Estimated tax</dt>
                    <dd className="font-semibold">{formatCurrency(tax)}</dd>
                  </div>
                </dl>

                {shipping > 0 && (
                  <div className="mt-4 md:mt-5 rounded-2xl bg-aurora-gradient p-[1px]">
                    <div className="rounded-2xl bg-white/80 dark:bg-luxe-surface p-3 md:p-4">
                      <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-royalpurple-500">
                        Almost there
                      </div>
                      <div className="mt-1 text-xs md:text-sm font-semibold">
                        Add {formatCurrency(500 - subtotal)} more for free express shipping.
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-signature-gradient"
                          style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="my-5 md:my-6 h-px bg-luxe-lineLight dark:bg-luxe-line" />

                <div className="flex items-end justify-between gap-2">
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                    Grand Total
                  </div>
                  <div className="font-display font-black text-gradient-signature text-2xl sm:text-3xl md:text-4xl leading-none">
                    {formatCurrency(total)}
                  </div>
                </div>

                <div className="mt-5 md:mt-6 space-y-3 hidden lg:block">
                  <button
                    onClick={() => {
                      toast("Redirecting to secure checkout…", "", "success");
                      nav("/checkout");
                    }}
                    className="btn-primary w-full !py-4"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to="/shop"
                    className="btn-ghost w-full !py-3 flex justify-center"
                  >
                    Continue Shopping <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 justify-center text-[10px] md:text-[11px] font-semibold uppercase tracking-widest text-ink-400 dark:text-white/50">
                  <div className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> SSL Secured
                  </div>
                  <div className="inline-flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5 text-royalpurple-500" /> 30-Day Returns
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
                  {["VISA", "MC", "AMEX", "PayPal", "Apple Pay", "GPay"].map((p) => (
                    <div
                      key={p}
                      className="rounded-xl border border-luxe-lineLight dark:border-luxe-line bg-white/60 dark:bg-white/5 px-2 md:px-3 py-1.5 text-[9px] md:text-[10px] font-bold tracking-wider text-ink-500 dark:text-white/60"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile sticky bottom checkout bar */}
            <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-luxe-lineLight dark:border-luxe-line bg-white/85 dark:bg-ink-950/90 backdrop-blur-xl p-3 sm:p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
              <div className="container max-w-xl mx-auto flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-ink-500 dark:text-white/60">
                    {items.length} item{items.length === 1 ? "" : "s"} · Total
                  </div>
                  <div className="font-display font-black text-gradient-signature text-2xl leading-none">
                    {formatCurrency(total)}
                  </div>
                </div>
                <Link
                  to="/shop"
                  className="hidden sm:inline-flex btn-ghost !py-2.5 !px-4 !text-xs"
                >
                  Continue
                </Link>
                <button
                  onClick={() => {
                    toast("Redirecting to secure checkout…", "", "success");
                    nav("/checkout");
                  }}
                  className="btn-primary flex-1 !py-2.5 text-sm inline-flex items-center justify-center gap-1.5 min-w-0"
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
