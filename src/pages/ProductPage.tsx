import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Sparkles,
  ChevronDown,
  ZoomIn,
  Move3D,
  Share2,
} from "lucide-react";
import { products, reviews } from "@/fixtures";
import ProductCard from "@/components/shop/ProductCard";
import RatingStars from "@/components/shop/RatingStars";
import { cn, formatCurrency } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { toast } from "@/components/ui/Toaster";

export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = products.find((p) => p.id === id) || products[0];
  const related = useMemo(
    () => products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4),
    [product.id, product.category]
  );
  const alsoBought = useMemo(
    () => products.filter((p) => p.id !== product.id).slice(0, 4),
    [product.id]
  );
  const productReviews = reviews.filter((r) => r.productId === product.id);

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes?.[1] ?? null);
  const [color, setColor] = useState(product.colors[0]?.name ?? null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"details" | "specs" | "shipping" | "reviews">("details");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [rotate3d, setRotate3d] = useState(0);

  const wish = useWishlistStore();
  const addToCart = useCartStore((s) => s.add);

  const faqs = [
    { q: "What is the return policy for this piece?", a: "Every LUXE piece comes with a 30-day atelier return. Simply contact concierge and we'll arrange complimentary pickup from your door — no questions, no fine print." },
    { q: "How is this piece made and by whom?", a: `${product.title} is handmade in Florence, IT by third-generation artisans. Each step — cutting, stitching, finishing — is logged to a serial laser-etched inside the garment.` },
    { q: "Will I receive a certificate of authenticity?", a: "Yes. Every purchase ships with a hand-numbered card signed by our creative director, plus an NFC chip in the label that verifies on-chain provenance via your LUXE account." },
    { q: "How should I care for this item?", a: "We recommend professional dry-clean only. Store in the included cotton dust bag in a cool, dry place, away from direct sunlight. A lifetime reconditioning service is included." },
  ];

  return (
    <div className="container pt-10 pb-44 lg:pb-24">
      <div className="mb-6 md:mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-ink-500 dark:text-white/60">
        <Link to="/home" className="link-underline">Home</Link>
        <ChevronRight className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
        <Link to="/shop" className="link-underline">Shop</Link>
        <ChevronRight className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0" />
        <span className="capitalize">{product.category}</span>
        <ChevronRight className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0 hidden sm:block" />
        <span className="font-semibold text-ink-900 dark:text-white line-clamp-1 sm:max-w-[260px]">{product.title}</span>
      </div>

      <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.1fr_1fr] items-start">
        {/* ========= GALLERY ========= */}
        <div>
          <div className="sticky top-28 space-y-4">
            <div className="grid grid-cols-[80px_1fr] gap-2.5 md:gap-3 md:grid-cols-[100px_1fr]">
              <div className="flex flex-col gap-2 md:gap-2 overflow-y-auto max-h-[70vh] md:max-h-[60vh]">
                {product.images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "relative aspect-square shrink-0 overflow-hidden rounded-2xl border transition",
                      activeImg === i
                        ? "border-royalpurple-500 shadow-glow-purple"
                        : "border-luxe-lineLight dark:border-luxe-line opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
                <button
                  onClick={() => setRotate3d((v) => v + 30)}
                  className="relative aspect-square shrink-0 grid place-items-center rounded-2xl border border-dashed border-luxe-lineLight dark:border-luxe-line bg-white/50 dark:bg-white/5"
                  aria-label="360° view"
                >
                  <Move3D className="h-5 w-5 text-royalpurple-500" />
                  <span className="absolute bottom-1 text-[9px] font-bold uppercase tracking-widest opacity-60">
                    360°
                  </span>
                </button>
              </div>

              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl md:rounded-[32px] glass-card"
              >
                <img
                  src={product.images[activeImg]}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  style={{ transform: `rotateY(${rotate3d}deg)`, transition: "transform 0.5s" }}
                />
                <div className="absolute left-3 top-3 md:left-4 md:top-4 flex gap-1.5 md:gap-2">
                  {product.isNew && (
                    <span className="chip !py-0.5 !px-2 md:!py-1 md:!px-3 !bg-emerald-500/15 !border-emerald-500/30 !text-emerald-600 dark:!text-emerald-400 text-[10px] md:text-xs">
                      NEW
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="chip !py-0.5 !px-2 md:!py-1 md:!px-3 !bg-rose-500/15 !border-rose-500/30 !text-rose-600 dark:!text-rose-400 text-[10px] md:text-xs">
                      −{product.discountPercent}%
                    </span>
                  )}
                </div>
                <div className="absolute right-3 top-3 md:right-4 md:top-4 flex gap-1.5 md:gap-2">
                  <button className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-2xl glass text-ink-700 dark:text-white" aria-label="Zoom">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button className="grid h-9 w-9 md:h-10 md:w-10 place-items-center rounded-2xl glass text-ink-700 dark:text-white" aria-label="Share">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { i: Truck, t: "Complimentary shipping", d: "On all orders over $500" },
                { i: RotateCcw, t: "30-day atelier returns", d: "No questions, no hassle" },
                { i: ShieldCheck, t: "Lifetime warranty", d: "Craftsmanship guarantee" },
              ].map((v, i) => (
                <div key={i} className="rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-2.5 md:p-3 text-center">
                  <v.i className="mx-auto mb-1 md:mb-1.5 h-4 w-4 text-royalpurple-500" />
                  <div className="font-semibold text-[11px] md:text-xs">{v.t}</div>
                  <div className="mt-0.5 text-[10px] text-ink-500 dark:text-white/60 line-clamp-2">{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========= DETAILS ========= */}
        <div className="pb-40 lg:pb-0">
          <div className="chip !bg-gold-500/10 !border-gold-500/30 !text-gold-700 dark:!text-gold-400 !text-[10px] md:!text-xs">
            <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3" /> {product.brand} · Handmade in Italy
          </div>
          <h1 className="mt-4 md:mt-5 font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {product.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2">
              <RatingStars value={product.rating} />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-ink-500 dark:text-white/60">({product.reviewCount} reviews)</span>
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> In stock · {product.stock} left
            </span>
          </div>

          <div className="mt-5 md:mt-6 flex flex-wrap items-end gap-3 md:gap-4">
            <span className="font-display font-black text-gradient-signature text-3xl sm:text-4xl md:text-5xl leading-none">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-base md:text-lg text-ink-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
                <span className="chip !bg-rose-500/15 !text-rose-600 dark:!text-rose-400 text-[10px] md:text-xs">
                  Save {formatCurrency(product.compareAtPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-5 md:mt-6 text-base md:text-lg leading-relaxed text-ink-600 dark:text-white/75">
            {product.description}
          </p>

          {/* Color */}
          {product.colors.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="label-luxe">Color</div>
                <div className="text-xs font-semibold">{color}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "group flex items-center gap-2 rounded-2xl border px-3 py-2 transition",
                      color === c.name
                        ? "border-royalpurple-500 bg-royalpurple-500/10 shadow-glow-purple"
                        : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/50 dark:hover:bg-white/10"
                    )}
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

          {/* Size */}
          {product.sizes && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="label-luxe">Size</div>
                <a href="#" className="text-xs font-semibold link-underline text-royalpurple-500">
                  Size Guide
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s + i}
                    onClick={() => setSize(s)}
                    className={cn(
                      "grid h-12 min-w-[3.25rem] place-items-center rounded-xl border text-sm font-semibold transition",
                      size === s
                        ? "bg-signature-gradient text-white border-transparent shadow-glow-purple"
                        : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/50 dark:hover:bg-white/10"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add */}
          <div className="mt-7 md:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <div className="inline-flex items-center justify-between sm:justify-start overflow-hidden rounded-2xl border border-luxe-lineLight dark:border-luxe-line sm:w-auto">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center hover:bg-white/60 dark:hover:bg-white/10 flex-none"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-12 sm:w-12 flex-1 sm:flex-none text-center font-display text-lg font-bold">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-12 w-12 place-items-center hover:bg-white/60 dark:hover:bg-white/10 flex-none"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) {
                  addToCart({
                    productId: product.id,
                    priceSnapshot: product.price,
                    title: product.title,
                    image: product.images[0],
                    color: color ?? undefined,
                    size: size ?? undefined,
                  });
                }
                toast("Added to bag", `${qty}× ${product.title}`, "success");
              }}
              className="btn-primary !py-3.5 flex-1 inline-flex items-center justify-center gap-2 order-first sm:order-none w-full sm:w-auto"
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
                "grid h-12 w-12 place-items-center rounded-2xl border transition order-last sm:order-none self-center",
                wish.has(product.id)
                  ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                  : "border-luxe-lineLight dark:border-luxe-line hover:bg-white/50 dark:hover:bg-white/10"
              )}
              aria-label="Wishlist"
            >
              <Heart className={cn("h-5 w-5", wish.has(product.id) ? "fill-rose-500" : "")} />
            </button>
          </div>

          {/* Sticky mobile bottom bar */}
          <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden border-t border-luxe-lineLight dark:border-luxe-line bg-white/85 dark:bg-ink-950/90 backdrop-blur-xl p-3 sm:p-4 pb-[calc(env(safe-area-inset-bottom)+12px)]">
            <div className="container max-w-xl mx-auto flex items-center gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-500 dark:text-white/60">
                  Total
                </div>
                <div className="font-display font-black text-gradient-signature text-xl leading-none">
                  {formatCurrency(product.price * qty)}
                </div>
              </div>
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
                  "grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition",
                  wish.has(product.id)
                    ? "border-rose-500/40 bg-rose-500/10 text-rose-500"
                    : "border-luxe-lineLight dark:border-luxe-line"
                )}
                aria-label="Wishlist"
              >
                <Heart className={cn("h-4 w-4", wish.has(product.id) ? "fill-rose-500" : "")} />
              </button>
              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) {
                    addToCart({
                      productId: product.id,
                      priceSnapshot: product.price,
                      title: product.title,
                      image: product.images[0],
                      color: color ?? undefined,
                      size: size ?? undefined,
                    });
                  }
                  toast("Added to bag", `${qty}× ${product.title}`, "success");
                }}
                className="btn-primary flex-1 !py-2.5 text-sm inline-flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Bag
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-ink-500 dark:text-white/60">
            <div className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Secure checkout · SSL encrypted
            </div>
            <div>·</div>
            <div>Est. delivery: 3–5 business days</div>
          </div>

          {/* Tabs */}
          <div className="mt-10 md:mt-12 border-t border-luxe-lineLight dark:border-luxe-line pt-8 md:pt-10">
            <div className="flex gap-1 -mx-1 overflow-x-auto px-1 snap-x snap-mandatory scrollbar-thin border-b border-luxe-lineLight dark:border-luxe-line mb-6">
              {(["details", "specs", "shipping", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-3 md:px-4 py-3 text-sm font-semibold capitalize border-b-2 -mb-px transition shrink-0 snap-start whitespace-nowrap",
                    tab === t
                      ? "border-royalpurple-500 text-royalpurple-500"
                      : "border-transparent text-ink-500 dark:text-white/60 hover:text-ink-900 dark:hover:text-white"
                  )}
                >
                  {t} {t === "reviews" && `(${productReviews.length})`}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {tab === "details" && (
                  <div className="space-y-5 text-ink-600 dark:text-white/75 leading-relaxed">
                    <p className="text-base md:text-lg">{product.longDescription || product.description}</p>
                    <div className="rounded-3xl border-l-2 border-gold-500/60 bg-gold-500/5 p-4 md:p-6 italic text-base md:text-lg">
                      "The attention to detail is unreal. You can feel the human hand in every stitch."
                      <div className="mt-2 not-italic text-xs font-semibold text-ink-500 dark:text-white/60">
                        — Vogue Atelier Review
                      </div>
                    </div>
                  </div>
                )}
                {tab === "specs" && (
                  <ul className="divide-y divide-luxe-lineLight dark:divide-luxe-line rounded-3xl border border-luxe-lineLight dark:border-luxe-line overflow-hidden">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <li key={k} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-0 px-4 md:px-6 py-3 md:py-4">
                        <span className="font-semibold text-ink-500 dark:text-white/60 text-xs uppercase tracking-wider md:text-sm md:normal-case md:tracking-normal">{k}</span>
                        <span className="font-medium">{v}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "shipping" && (
                  <div className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { t: "Complimentary Express", d: "All orders over $500 · 2–3 business days" },
                        { t: "Standard", d: "$15 flat · 4–7 business days" },
                        { t: "White-Glove", d: "Available on select pieces · Contact concierge" },
                        { t: "International", d: "140+ countries · DDP available" },
                      ].map((s, i) => (
                        <div key={i} className="rounded-2xl glass-card p-4">
                          <div className="font-semibold">{s.t}</div>
                          <div className="mt-1 text-sm text-ink-500 dark:text-white/60">{s.d}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === "reviews" && (
                  <div className="space-y-5">
                    {productReviews.length === 0 ? (
                      <p className="text-ink-500 dark:text-white/60">Be the first to review this piece.</p>
                    ) : (
                      productReviews.map((r) => (
                        <div key={r.id} className="rounded-3xl glass-card p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={
                                r.avatar ||
                                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80"
                              }
                              alt=""
                              className="h-11 w-11 shrink-0 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-3">
                                <div className="font-semibold">{r.user}</div>
                                {r.verified && (
                                  <span className="chip !bg-emerald-500/15 !border-emerald-500/30 !text-emerald-600 dark:!text-emerald-400 !py-0.5 !px-2 text-[10px]">
                                    <ShieldCheck className="h-3 w-3" /> Verified
                                  </span>
                                )}
                                <div className="ml-auto text-xs text-ink-500 dark:text-white/60">{r.date}</div>
                              </div>
                              <div className="mt-1">
                                <RatingStars value={r.rating} size={12} />
                              </div>
                              <div className="mt-2 font-semibold">{r.title}</div>
                              <p className="mt-1.5 text-sm text-ink-600 dark:text-white/75 leading-relaxed">
                                {r.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* FAQs */}
          <div className="mt-12 border-t border-luxe-lineLight dark:border-luxe-line pt-10">
            <h3 className="heading-md mb-6">Frequently asked</h3>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-luxe-lineLight dark:border-luxe-line">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold">{f.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-royalpurple-500 transition",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm text-ink-600 dark:text-white/75 leading-relaxed">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========= Customers also bought ========= */}
      <section className="section-rhythm !pt-16 md:!pt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-10">
          <div>
            <span className="eyebrow !text-[9px] md:!text-[10px]">Complete the Look</span>
            <h2 className="mt-3 md:mt-4 font-display font-black leading-[0.95] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Customers also bought</h2>
          </div>
          <Link to="/shop" className="btn-ghost !py-2.5 !px-4 !text-sm">
            Browse All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {alsoBought.map((p, i) => (
            <ProductCard product={p} index={i} key={p.id} />
          ))}
        </div>
      </section>

      {/* ========= Related ========= */}
      {related.length > 0 && (
        <section className="section-rhythm !pt-8 md:!pt-12 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-10">
            <div>
              <span className="eyebrow !text-[9px] md:!text-[10px]">You May Also Love</span>
              <h2 className="mt-3 md:mt-4 font-display font-black leading-[0.95] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">From the same collection</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {related.map((p, i) => (
              <ProductCard product={p} index={i} key={p.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
