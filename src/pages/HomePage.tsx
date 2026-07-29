import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Star,
  Gift,
} from "lucide-react";
import { products, collections, categories } from "@/fixtures";
import ProductCard from "@/components/shop/ProductCard";
import { formatCurrency } from "@/lib/utils";
import RatingStars from "@/components/shop/RatingStars";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const op = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const nav = useNavigate();

  return (
    <div>
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden pt-12 pb-28 md:pt-20 md:pb-36"
      >
        <motion.div
          style={{ y, opacity: op, scale }}
          className="absolute inset-0 -z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1503342452485-86ec28691130?auto=format&fit=crop&w=2400&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white dark:from-black/70 dark:via-black/50 dark:to-luxe-bg" />
          <div className="absolute inset-0 bg-aurora-gradient opacity-60 mix-blend-soft-light" />
        </motion.div>

        <div className="container grid items-center gap-12 pt-16 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow">
                <Sparkles className="h-3 w-3" /> FW26 · Chapter I · Aurora
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="heading-xl mt-6"
            >
              Crafted for the{" "}
              <span className="relative inline-block">
                <span className="text-gradient-signature">extraordinary.</span>
                <motion.span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #1E40AF, #7C3AED, #EC4899)",
                    filter: "blur(6px)",
                    opacity: 0.55,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-white/75"
            >
              Heritage handcraft meets future materials. An elevated curation of
              apparel, objects, and machines — made in limited runs for those who
              refuse the ordinary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button className="btn-primary" onClick={() => nav("/shop")}>
                Shop The Collection <ArrowRight className="h-4 w-4" />
              </button>
              <button className="btn-ghost-gold group inline-flex">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-500/20">
                  <Play className="ml-0.5 h-3 w-3 fill-current" />
                </span>
                Watch Film (1:48)
              </button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-12 grid grid-cols-1 gap-4 border-t border-luxe-lineLight dark:border-luxe-line pt-6 sm:grid-cols-3 sm:gap-6 sm:max-w-lg"
            >
              {[
                { k: "500+", v: "Limited pieces / season" },
                { k: "4.9★", v: "Avg. customer rating" },
                { k: "140+", v: "Countries delivered" },
              ].map((s, i) => (
                <div key={i}>
                  <dt className="font-display text-2xl font-bold text-gradient-signature">
                    {s.k}
                  </dt>
                  <dd className="mt-1 text-xs text-ink-500 dark:text-white/60">
                    {s.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="relative hidden h-[520px] perspective-1200 lg:block">
            <motion.div
              style={{ y: y2, rotate }}
              className="absolute inset-0 preserve-3d"
            >
              {/* Floating cards */}
              <motion.div
                className="absolute left-6 top-8 h-64 w-48 rounded-3xl overflow-hidden shadow-soft-xl animate-float"
                style={{ rotateY: -14, rotateX: 8 }}
              >
                <img
                  src={products[0].images[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 eyebrow !bg-rose-500/20 !text-rose-600 dark:!text-rose-300">
                  −{products[0].discountPercent}%
                </span>
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-0 h-80 w-60 -translate-x-1/2 rounded-3xl overflow-hidden shadow-2xl animate-floatSlow"
                style={{ rotateY: 2, rotateX: -4, animationDelay: "-2s" }}
              >
                <img
                  src={products[2].images[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="font-display text-white text-lg">{products[2].title}</div>
                  <div className="text-xs text-white/70">{products[2].brand}</div>
                  <div className="mt-1 text-lg font-bold text-gradient-gold">
                    {formatCurrency(products[2].price)}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-4 top-24 h-56 w-44 rounded-3xl overflow-hidden shadow-soft-xl animate-float"
                style={{ rotateY: 12, rotateX: 4, animationDelay: "-3s" }}
              >
                <img
                  src={products[3].images[0]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-0 h-40 w-56 rounded-2xl glass-card p-4 animate-floatSlow"
                style={{ animationDelay: "-1.5s" }}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
                  <TrendingUp className="h-3.5 w-3.5" /> Flash Sale
                </div>
                <div className="mt-2 flex items-end gap-3">
                  <div className="font-mono text-2xl font-bold">05:12:48</div>
                  <div className="text-xs text-ink-500 dark:text-white/60">
                    left to claim −40%
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-signature-gradient animate-gradientMove bg-[length:200%_200%]"
                    initial={{ width: "10%" }}
                    animate={{ width: "62%" }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-6 w-56 rounded-2xl glass-card p-4 animate-float"
                style={{ animationDelay: "-4s" }}
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-royalpurple-500">
                  <Zap className="h-3.5 w-3.5" /> Members-Only
                </div>
                <ul className="space-y-1.5 text-sm">
                  <li className="flex items-center gap-2">
                    <Gift className="h-3.5 w-3.5 text-gold-500" /> Exclusive drops
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="h-3.5 w-3.5 text-royal-500" /> Priority shipping
                  </li>
                  <li className="flex items-center gap-2">
                    <RotateCcw className="h-3.5 w-3.5 text-emerald-500" /> Atelier returns
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-ink-500 dark:text-white/50"
        >
          <div className="mx-auto mb-2 grid h-10 w-6 place-items-start overflow-hidden rounded-full border border-current p-1">
            <motion.span
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-current"
            />
          </div>
          Scroll
        </motion.div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-y border-luxe-lineLight dark:border-luxe-line bg-white/50 dark:bg-white/[0.02] backdrop-blur">
        <div className="container grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: Truck, t: "Complimentary shipping", d: "On all orders over $500" },
            { i: RotateCcw, t: "30-day returns", d: "No questions, no hassle" },
            { i: ShieldCheck, t: "Lifetime craft warranty", d: "On every piece we make" },
            { i: Zap, t: "Concierge 24/7", d: "Real humans, worldwide" },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-signature-gradient text-white shadow-glow-purple">
                <v.i className="h-5 w-5" />
              </span>
              <div>
                <div className="font-semibold">{v.t}</div>
                <div className="text-xs text-ink-500 dark:text-white/60">{v.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="section-rhythm">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Shop by Category</span>
              <h2 className="heading-lg mt-4">
                A universe of{" "}
                <span className="text-gradient-signature">modern luxury.</span>
              </h2>
            </div>
            <Link to="/shop" className="btn-ghost">
              View All Categories <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
            {categories.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to="/shop"
                  className="group block overflow-hidden rounded-3xl glass-card"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-heading text-lg font-semibold">{c.name}</div>
                      <div className="text-xs text-ink-400 dark:text-white/50">
                        {c.count} pieces
                      </div>
                    </div>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-900 transition group-hover:rotate-45 group-hover:bg-signature-gradient group-hover:text-white">
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <section className="section-rhythm relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-aurora-gradient opacity-40 mix-blend-soft-light" />
        <div className="container relative">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">
                <Sparkles className="h-3 w-3" /> Curated Collections
              </span>
              <h2 className="heading-lg mt-4">
                Stories stitched into{" "}
                <span className="text-gradient-gold">every thread.</span>
              </h2>
            </div>
            <div className="text-sm text-ink-500 dark:text-white/60 max-w-sm">
              Four limited chapters a year. Each piece is serialized, numbered,
              and never re-issued. Once gone — gone forever.
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {collections.map((col, i) => (
              <motion.article
                key={col.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={cn(
                  "tilt-card relative overflow-hidden rounded-[28px] shadow-soft-xl group",
                  i === 0 && "xl:row-span-2 xl:h-[640px]"
                )}
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                <div className="absolute left-4 top-4">
                  <span className="chip !bg-white/10 !border-white/20 !text-white backdrop-blur-md">
                    {col.tag}
                  </span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                    {col.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{col.subtitle}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link to="/shop" className="btn-primary !py-2.5 !px-4 !text-xs">
                      Explore <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <span className="text-xs font-mono text-white/60">
                      0{i + 1} / 0{collections.length}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="section-rhythm">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">
                <Star className="h-3 w-3" /> Featured · Staff Picks
              </span>
              <h2 className="heading-lg mt-4">
                The <span className="text-gradient-signature">best</span> of the atelier.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/shop" className="btn-ghost">
                All Products <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard product={p} index={i} key={p.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ STORY / NIKE-STYLE ============ */}
      <section className="section-rhythm relative overflow-hidden">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-5 -bottom-6 w-48 rounded-2xl glass-card p-4"
            >
              <RatingStars value={4.9} size={12} />
              <div className="mt-1 font-heading text-lg font-bold">9.6 / 10</div>
              <div className="text-xs text-ink-500 dark:text-white/60">
                From 12,400+ verified reviews
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-6 w-56 rounded-2xl glass-card p-4"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-signature-gradient text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-400">
                  Since 1987
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold leading-relaxed">
                Three generations of Florentine artisans, now under one roof.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow">Our Story</span>
            <h2 className="heading-lg mt-4">
              Slow luxury.{" "}
              <span className="text-gradient-signature">Fast obsession.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-600 dark:text-white/75">
              We built LUXE because we believed luxury didn't have to choose between
              heritage and the future. A jacket that lasts 30 years and carries a
              chip that proves its provenance. A pair of sneakers tuned like a
              Formula 1 monocoque. A watch whose meteorite dial has been waiting
              4.5 billion years to find your wrist.
            </p>
            <blockquote className="mt-8 border-l-2 border-gold-500/60 pl-6 italic text-xl leading-relaxed text-ink-700 dark:text-white/85">
              "Make fewer things. But make the things that make you stop walking."
              <div className="mt-3 font-sans not-italic text-sm font-semibold text-ink-500 dark:text-white/60">
                — Priya Varma, Founding Creative Director
              </div>
            </blockquote>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {topRated.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group space-y-2"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl">
                    <img
                      src={p.images[0]}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      alt={p.title}
                    />
                  </div>
                  <div className="truncate text-xs font-semibold">{p.title}</div>
                  <div className="text-sm font-bold text-gradient-signature">
                    {formatCurrency(p.price)}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ BRAND MARQUEE ============ */}
      <section className="border-y border-luxe-lineLight dark:border-luxe-line overflow-hidden py-10">
        <div className="mb-6 text-center text-xs font-bold uppercase tracking-[0.4em] text-ink-500 dark:text-white/50">
          Trusted by the world's most discerning
        </div>
        <div className="mask-fade-y overflow-hidden">
          <div className="marquee gap-16">
            {Array.from({ length: 2 }).map((_, r) => (
              <div key={r} className="flex shrink-0 items-center gap-16 px-8">
                {[
                  "L'ATELIER",
                  "MONOGRAM",
                  "NOIR.22",
                  "CÉLESTE",
                  "AURORA LABS",
                  "HERITAGE & CO",
                  "MOTO NOVA",
                  "MAISON V",
                  "OBSIDIAN",
                  "THE GILDED",
                ].map((n, i) => (
                  <span
                    key={`${r}-${i}`}
                    className="font-display whitespace-nowrap text-2xl md:text-3xl font-bold tracking-wider text-ink-400/70 dark:text-white/40"
                  >
                    {n}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA STRIP ============ */}
      <section className="section-rhythm">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-[40px] p-8 md:p-16 shadow-soft-xl"
          >
            <div
              className="absolute inset-0 animate-gradientMove bg-[length:200%_200%]"
              style={{
                background:
                  "linear-gradient(120deg, #1E40AF 0%, #7C3AED 40%, #EC4899 70%, #D4AF37 100%)",
              }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div
              className="absolute inset-0 opacity-40 animate-auroraShift"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25), transparent 40%)",
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
                  <Sparkles className="h-3 w-3" /> Members · Early Access
                </span>
                <h3 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                  Be the first to wear the next chapter.
                </h3>
                <p className="mt-4 max-w-xl text-lg text-white/85">
                  48-hour early access to new drops, personalized recommendations
                  from our stylists, and invites to private atelier events.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={() => nav("/shop")} className="btn-ghost !bg-white !text-ink-900 border-none shadow-xl">
                  Shop the Drop <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => nav("/login")} className="btn-ghost !bg-white/15 !text-white !border-white/30 hover:!bg-white/25">
                  Create Account <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// local helper to avoid unused imports
function cn(...x: unknown[]) {
  return x.filter(Boolean).join(" ");
}
