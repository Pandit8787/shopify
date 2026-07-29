import { Heart, Eye, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/ui";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { products } from "@/fixtures";
import { Link } from "react-router-dom";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "@/components/ui/Toaster";
import RatingStars from "@/components/shop/RatingStars";

export default function QuickViewModal() {
  const id = useUIStore((s) => s.quickViewProductId);
  const close = () => useUIStore.getState().setQuickView(null);
  const product = products.find((p) => p.id === id);
  const wish = useWishlistStore();
  const addToCart = useCartStore((s) => s.add);

  if (!product) return null;

  return (
    <AnimatePresence>
      {id && product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/70 backdrop-blur-xl"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed left-1/2 top-1/2 z-[80] w-[min(96vw,1100px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] glass-card"
            style={{ maxHeight: "90vh" }}
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:h-full">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-4 top-4 eyebrow">Quick View</span>
              </div>
              <div className="flex max-h-[60vh] flex-col overflow-y-auto p-6 md:max-h-[90vh]">
                <div className="mb-2 flex items-center gap-3 text-xs text-ink-500 dark:text-white/60">
                  <span className="chip">{product.brand}</span>
                  <span className="inline-flex items-center gap-1">
                    <RatingStars value={product.rating} />
                    <span className="font-semibold">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </span>
                </div>
                <h3 className="heading-md !text-3xl">{product.title}</h3>
                <div className="mt-2 flex items-end gap-3">
                  <span className="font-display text-3xl font-bold text-gradient-signature">
                    {formatCurrency(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <>
                      <span className="text-lg text-ink-400 line-through">
                        {formatCurrency(product.compareAtPrice)}
                      </span>
                      <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                        −{product.discountPercent}%
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-white/70">
                  {product.description}
                </p>
                {product.colors && (
                  <div className="mt-5">
                    <div className="label-luxe">Color</div>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          className="group flex items-center gap-2 rounded-2xl border border-luxe-lineLight dark:border-luxe-line px-3 py-2 hover:bg-white/60 dark:hover:bg-white/10"
                        >
                          <span
                            className="h-5 w-5 rounded-full ring-2 ring-white dark:ring-black shadow"
                            style={{ background: c.hex }}
                          />
                          <span className="text-xs font-semibold">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {product.sizes && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <div className="label-luxe">Size</div>
                      <a className="text-xs font-semibold underline link-underline text-royalpurple-500">
                        Size Guide
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s, i) => (
                        <button
                          key={s + i}
                          className={cn(
                            "grid h-11 min-w-[3rem] place-items-center rounded-xl border text-sm font-semibold transition",
                            i === 1
                              ? "bg-signature-gradient text-white shadow-glow-purple"
                              : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/60 dark:hover:bg-white/10"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 grid grid-cols-3 gap-2 text-xs text-ink-600 dark:text-white/70">
                  {[
                    { i: Truck, t: "Free delivery over $500" },
                    { i: RotateCcw, t: "30-day returns" },
                    { i: ShieldCheck, t: "2-yr warranty" },
                  ].map((v) => (
                    <div key={v.t} className="rounded-xl border border-luxe-lineLight dark:border-luxe-line p-2 text-center">
                      <v.i className="mx-auto mb-1 h-4 w-4 text-royalpurple-500" />
                      <div className="text-[10px] font-semibold leading-tight">{v.t}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => {
                      addToCart({
                        productId: product.id,
                        priceSnapshot: product.price,
                        title: product.title,
                        image: product.images[0],
                        color: product.colors[0]?.name,
                        size: product.sizes?.[1],
                      });
                      toast("Added to bag", product.title, "success");
                    }}
                    className="btn-primary flex-1"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Bag
                  </button>
                  <button
                    onClick={() => {
                      wish.toggle(product.id);
                      toast(
                        wish.has(product.id) ? "Removed from wishlist" : "Saved to wishlist",
                        product.title,
                        wish.has(product.id) ? "info" : "success"
                      );
                    }}
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl border transition",
                      wish.has(product.id)
                        ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                        : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/60 dark:hover:bg-white/10"
                    )}
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        wish.has(product.id) ? "fill-rose-500" : ""
                      )}
                    />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={close}
                    className="btn-ghost px-4"
                  >
                    <Eye className="h-4 w-4" /> Details
                  </Link>
                </div>
                <div className="mt-6 h-px bg-luxe-lineLight dark:bg-luxe-line" />
                <div className="mt-4">
                  <div className="label-luxe">Specifications</div>
                  <ul className="divide-y divide-luxe-lineLight dark:divide-luxe-line rounded-2xl border border-luxe-lineLight dark:border-luxe-line text-sm">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <li key={k} className="grid grid-cols-[140px_1fr] px-4 py-2.5">
                        <span className="text-ink-500 dark:text-white/60 font-medium">{k}</span>
                        <span className="font-semibold">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
