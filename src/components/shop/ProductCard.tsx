import { Heart, ShoppingBag, Eye, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import type { Product } from "@/services/types";
import { cn, formatCurrency } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { useUIStore } from "@/stores/ui";
import { toast } from "@/components/ui/Toaster";
import RatingStars from "@/components/shop/RatingStars";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hover, setHover] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const wish = useWishlistStore();
  const add = useCartStore((s) => s.add);
  const setQuickView = useUIStore.getState().setQuickView;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px * -8, y: py * 10 });
  };

  const onReset = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onReset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="tilt-card group relative"
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      <div className="glass-card relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden">
          {product.discountPercent && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-500/90 px-2.5 py-1 text-[10px] font-bold text-white shadow">
              −{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold text-white shadow ml-[calc(52px+0.5rem)]">
              NEW
            </span>
          )}
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
              "absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-xl border backdrop-blur-md transition",
              wish.has(product.id)
                ? "border-rose-500/40 bg-rose-500/15 text-rose-500"
                : "border-white/60 bg-white/60 text-ink-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
            )}
            aria-label="Wishlist"
          >
            <Heart className={cn("h-4 w-4", wish.has(product.id) ? "fill-rose-500" : "")} />
          </button>
          <Link to={`/product/${product.id}`} className="block h-full w-full">
            <img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                hover && product.images[1] ? "scale-110 opacity-0" : "scale-100 opacity-100"
              )}
            />
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt=""
                aria-hidden
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                  hover ? "scale-105 opacity-100" : "scale-110 opacity-0"
                )}
              />
            )}
          </Link>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 transition-opacity duration-500",
              hover ? "opacity-100" : "opacity-0"
            )}
            style={{
              background:
                "linear-gradient(180deg, rgba(124,58,237,0.25), transparent 40%, rgba(212,175,55,0.35) 100%)",
            }}
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={hover ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2"
          >
            <button
              onClick={() => setQuickView(product.id)}
              className="btn-ghost !py-2.5 !px-3 !text-xs w-full"
            >
              <Eye className="h-3.5 w-3.5" /> Quick View
            </button>
            <button
              onClick={() => {
                add({
                  productId: product.id,
                  priceSnapshot: product.price,
                  title: product.title,
                  image: product.images[0],
                  color: product.colors[0]?.name,
                  size: product.sizes?.[1],
                });
                toast("Added to bag", product.title, "success");
              }}
              className="btn-primary !py-2.5 !px-3 !text-xs w-full"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add
            </button>
          </motion.div>
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400">
              {product.brand}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-500 dark:text-white/60">
              <RatingStars value={product.rating} size={12} />
              <span className="font-semibold">
                {product.rating}
              </span>
            </span>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="block font-heading text-lg font-semibold leading-tight tracking-tight line-clamp-2 group-hover:text-royalpurple-500 transition"
          >
            {product.title}
          </Link>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold text-gradient-signature">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-ink-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-black shadow"
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
