import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowUpRight,
  MapPin,
  Headphones,
  ShieldCheck,
  RefreshCcw,
  CreditCard,
  Apple,
  Play,
  Send,
  Sparkles,
  Globe2,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useState } from "react";

const columns = [
  {
    title: "Shop",
    links: ["New Arrivals", "Best Sellers", "Collections", "Men", "Women", "Accessories", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["About LUXE", "Stories & Journal", "Careers", "Press", "Stores", "Sustainability"],
  },
  {
    title: "Support",
    links: ["Help Center", "Shipping & Returns", "Track Order", "Size Guide", "Warranty", "Contact Us"],
  },
  {
    title: "Policies",
    links: ["Privacy Policy", "Terms of Use", "Cookie Settings", "Accessibility", "Terms of Sale"],
  },
];

const socials = [
  { i: Instagram, href: "#", label: "Instagram" },
  { i: Twitter, href: "#", label: "X" },
  { i: Facebook, href: "#", label: "Facebook" },
  { i: Youtube, href: "#", label: "YouTube" },
];

const insta = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503342452485-86ec28691130?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-luxe-lineLight dark:border-luxe-line">
      <div className="pointer-events-none absolute inset-0 bg-aurora-gradient opacity-60 mix-blend-soft-light" />
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute -top-px left-0 h-32 w-full text-white/5 dark:text-white/10"
      >
        <defs>
          <linearGradient id="wave" x1="0" x2="1">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ d: "M0,96 C360,160 720,20 1080,96 C1260,140 1380,70 1440,96 L1440,200 L0,200 Z" }}
          animate={{
            d: [
              "M0,96 C360,160 720,20 1080,96 C1260,140 1380,70 1440,96 L1440,200 L0,200 Z",
              "M0,120 C360,40 720,180 1080,112 C1260,80 1380,150 1440,120 L1440,200 L0,200 Z",
              "M0,96 C360,160 720,20 1080,96 C1260,140 1380,70 1440,96 L1440,200 L0,200 Z",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          fill="url(#wave)"
        />
      </svg>

      <div className="container relative section-rhythm pb-10">
        <section className="mb-20 grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="eyebrow">
              <Sparkles className="h-3 w-3" /> Insider Circle
            </span>
            <h3 className="heading-lg mt-5 max-w-2xl">
              Join the list. Be the first to unlock{" "}
              <span className="text-gradient-signature">new drops, private sales & stories</span> from the atelier.
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) {
                setOk(true);
                setTimeout(() => setOk(false), 2200);
                setEmail("");
              }
            }}
            className="relative"
          >
            <div className="group flex overflow-hidden rounded-2xl border border-gold-500/30 bg-white/70 dark:bg-black/40 backdrop-blur-xxl p-1.5 shadow-glow">
              <span className="ml-3 grid place-items-center text-gold-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@luxe.atelier"
                className="flex-1 bg-transparent px-3 py-3 text-sm font-medium outline-none placeholder:text-ink-400 dark:placeholder:text-white/50"
              />
              <button
                type="submit"
                className="btn-primary shrink-0"
                data-cursor="hover"
              >
                Subscribe <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-ink-500 dark:text-white/60">
              <ShieldCheck className="h-3.5 w-3.5" />
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
              {ok && (
                <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  Welcome to LUXE
                </span>
              )}
            </div>
          </form>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr_1.2fr]">
          <div className="space-y-6">
            <Link to="/home" className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-2xl font-bold">
                <span className="text-gradient-signature">LUXE</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-600 dark:text-white/70 max-w-sm">
              Redefining modern luxury — a curated universe of heritage craft,
              future materials, and cinematic experience.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="group grid h-10 w-10 place-items-center rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/50 dark:bg-white/5 hover:bg-signature-gradient hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  data-cursor="hover"
                >
                  <s.i className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="space-y-3 rounded-3xl border border-luxe-lineLight dark:border-luxe-line bg-white/60 dark:bg-white/5 backdrop-blur-xl p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-royalpurple-500/15 text-royalpurple-500">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">Concierge</div>
                  <div className="font-semibold">+1 (800) 555-LUXE</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-royal-500" />
                5th Avenue, Manhattan · Tokyo · Paris
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe2 className="h-4 w-4 text-gold-500" />
                Shipping to 140+ countries
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                Download App
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="inline-flex items-center gap-2 rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/70 dark:bg-white/10 px-4 py-2.5 hover:bg-white/90 dark:hover:bg-white/20" data-cursor="hover">
                  <Apple className="h-5 w-5" />
                  <div className="leading-tight">
                    <div className="text-[10px] uppercase tracking-wider text-ink-500 dark:text-white/60">Download on</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </a>
                <a href="#" className="inline-flex items-center gap-2 rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/70 dark:bg-white/10 px-4 py-2.5 hover:bg-white/90 dark:hover:bg-white/20" data-cursor="hover">
                  <Play className="h-5 w-5" />
                  <div className="leading-tight">
                    <div className="text-[10px] uppercase tracking-wider text-ink-500 dark:text-white/60">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <div className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                  {c.title}
                </div>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="/shop"
                        className="group inline-flex items-center gap-1 text-sm text-ink-700 dark:text-white/80 hover:text-royalpurple-500"
                      >
                        {l}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
              @LUXE on Instagram
            </div>
            <div className="grid grid-cols-3 gap-2">
              {insta.map((src, i) => (
                <a
                  href="#"
                  key={src + i}
                  className="group relative aspect-square overflow-hidden rounded-2xl"
                  data-cursor="hover"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-125"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-2 text-xs font-semibold">
                    <Instagram className="mr-1 h-3 w-3" /> #luxeatelier
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/50 dark:bg-white/5 p-4">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                Country / Region
              </div>
              <button className="btn-ghost w-full justify-between px-4 py-2.5 text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-5 w-7 rounded border overflow-hidden">
                    <img alt="" src="https://flagcdn.com/w40/us.png" className="h-full w-full object-cover" />
                  </span>
                  United States (USD)
                </span>
                <ArrowUpRight className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-luxe-lineLight dark:border-luxe-line pt-6 text-xs text-ink-500 dark:text-white/55">
          <div className="flex items-center gap-2">
            <RefreshCcw className="h-3.5 w-3.5" /> 30-day free returns
            <span className="mx-1.5 h-3 w-px bg-current opacity-40" />
            <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout
            <span className="mx-1.5 h-3 w-px bg-current opacity-40" />
            <CreditCard className="h-3.5 w-3.5" /> Flexible payment
          </div>
          <div className="flex items-center gap-2">
            {[
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg",
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg",
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amex.svg",
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/applepay.svg",
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlepay.svg",
              "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg",
            ].map((u, i) => (
              <span
                key={i}
                className="grid h-7 w-11 place-items-center rounded-lg border border-luxe-lineLight dark:border-luxe-line bg-white/70 dark:bg-white/10"
              >
                <img src={u} alt="" className="h-4 w-7 object-contain opacity-70" />
              </span>
            ))}
          </div>
          <div>© {new Date().getFullYear()} LUXE Atelier — All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
