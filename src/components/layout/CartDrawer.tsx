import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Gift, Tag, Truck, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, productById } from "@/stores/cart";
import { cn, formatCurrency } from "@/lib/utils";
import { products } from "@/fixtures";
import { useState } from "react";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
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

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const nav = useNavigate();

  const recommendations = products
    .filter((p) => !items.some((i) => i.productId === p.id))
    .slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={close}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 z-[65] flex h-full w-full max-w-[460px] flex-col glass-strong"
          >
            <div className="flex items-center justify-between p-5 border-b border-luxe-lineLight dark:border-luxe-line">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-white/60">
                  Shopping Cart
                </div>
                <div className="mt-0.5 font-display text-2xl font-bold">
                  {items.length === 0
                    ? "Your bag is empty"
                    : `${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"}`}
                </div>
              </div>
              <button
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-2xl hover:bg-white/60 dark:hover:bg-white/10"
                aria-label="Close cart"
                data-cursor="hover"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-aurora-gradient animate-float">
                  <Sparkles className="h-9 w-9 text-white" />
                </div>
                <div className="mt-5 text-xl font-semibold">
                  Start something beautiful.
                </div>
                <div className="mt-1 text-sm text-ink-500 dark:text-white/60 max-w-xs">
                  Explore the season's most coveted pieces curated by our stylists.
                </div>
                <Link
                  to="/shop"
                  onClick={close}
                  className="btn-primary mt-6"
                >
                  Browse Shop <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto p-5">
                  {items.map((i) => (
                    <motion.div
                      key={i.productId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="group relative overflow-hidden rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/50 dark:bg-white/5 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={i.image}
                          className="h-24 w-24 shrink-0 rounded-xl object-cover"
                          alt={i.title}
                        />
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="truncate font-semibold">{i.title}</div>
                          <div className="mt-0.5 text-xs text-ink-500 dark:text-white/60">
                            {[i.color, i.size].filter(Boolean).join(" · ")}
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <div className="inline-flex items-center overflow-hidden rounded-xl border border-luxe-lineLight dark:border-luxe-line">
                              <button
                                onClick={() => updateQty(i.productId, i.quantity - 1)}
                                className="grid h-8 w-8 place-items-center hover:bg-white/60 dark:hover:bg-white/10"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <div className="w-7 text-center text-sm font-semibold">
                                {i.quantity}
                              </div>
                              <button
                                onClick={() => updateQty(i.productId, i.quantity + 1)}
                                className="grid h-8 w-8 place-items-center hover:bg-white/60 dark:hover:bg-white/10"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="ml-auto text-sm font-bold text-gradient-signature">
                              {formatCurrency(i.priceSnapshot * i.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(i.productId)}
                        aria-label="Remove item"
                        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-lg opacity-0 transition group-hover:opacity-100 hover:bg-rose-500/10 text-rose-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}

                  <label className="flex items-center gap-3 rounded-2xl border border-dashed border-luxe-lineLight dark:border-luxe-line p-3 cursor-pointer hover:bg-white/50 dark:hover:bg-white/5">
                    <div
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl transition",
                        giftWrap
                          ? "bg-signature-gradient text-white shadow-glow-purple"
                          : "border border-luxe-lineLight dark:border-luxe-line text-white/60"
                      )}
                    >
                      <Gift className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Gift Wrap</div>
                      <div className="text-xs text-ink-500 dark:text-white/60">
                        Luxe matte paper, hand-tied ribbon, handwritten card — {formatCurrency(25)}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                    />
                  </label>

                  <div className="rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                      <Tag className="h-3.5 w-3.5 text-gold-500" /> Promo code
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Try LUXE10"
                        className="input-luxe flex-1 py-3"
                      />
                      <button
                        onClick={() => {
                          const r = applyCoupon(code);
                          setMsg({ ok: r.ok, text: r.message });
                          setTimeout(() => setMsg(null), 2400);
                        }}
                        className="btn-ghost px-4 py-3"
                      >
                        Apply
                      </button>
                    </div>
                    {coupon && (
                      <div className="mt-2 flex items-center justify-between rounded-xl bg-gold-500/10 border border-gold-500/30 px-3 py-2 text-xs font-semibold">
                        <span className="text-gold-700 dark:text-gold-300">
                          {coupon.code} — {formatCurrency(discount)} off
                        </span>
                        <button
                          onClick={() => {
                            removeCoupon();
                            setCode("");
                          }}
                          className="text-rose-500 hover:underline"
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

                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                      Complete the look
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {recommendations.map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={close}
                          className="group overflow-hidden rounded-2xl border border-luxe-lineLight dark:border-luxe-line"
                        >
                          <img src={p.images[0]} alt={p.title} className="h-32 w-full object-cover transition group-hover:scale-110 duration-700" />
                          <div className="p-2">
                            <div className="truncate text-xs font-semibold">{p.title}</div>
                            <div className="text-[11px] font-bold text-gradient-signature">{formatCurrency(p.price)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-luxe-lineLight dark:border-luxe-line p-5">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-ink-500 dark:text-white/60">Subtotal</dt>
                      <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="flex items-center gap-1.5 text-ink-500 dark:text-white/60">
                        <Truck className="h-3.5 w-3.5" /> Shipping
                      </dt>
                      <dd className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            Free
                          </span>
                        ) : (
                          formatCurrency(shipping)
                        )}
                      </dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-rose-500">Discount</dt>
                        <dd className="font-semibold text-rose-500">
                          − {formatCurrency(discount)}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-ink-500 dark:text-white/60">Estimated tax</dt>
                      <dd className="font-semibold">{formatCurrency(tax)}</dd>
                    </div>
                  </dl>
                  <div className="my-4 h-px bg-luxe-lineLight dark:bg-luxe-line" />
                  <div className="mb-4 flex items-end justify-between">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                      Total
                    </div>
                    <div className="font-display text-3xl font-bold text-gradient-signature">
                      {formatCurrency(total)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        close();
                        nav("/cart");
                      }}
                      className="btn-ghost flex-1"
                    >
                      View Bag
                    </button>
                    <button
                      onClick={() => {
                        close();
                        nav("/checkout");
                      }}
                      className="btn-primary flex-1"
                    >
                      Checkout <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 text-center text-[11px] text-ink-500 dark:text-white/50">
                    Taxes & shipping calculated at checkout · 30-day returns
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function _productById(id: string) {
  return productById(id);
}
