import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Sparkles, ArrowRight, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { useUIStore } from "@/stores/ui";
import { products, collections } from "@/fixtures";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

const suggestions = [
  { icon: TrendingUp, label: "Aurora Bomber Jacket", sub: "Bestseller" },
  { icon: ShoppingBag, label: "Weekender Bag", sub: "New" },
  { icon: Package, label: "Chronograph Héritage", sub: "Limited" },
];

export default function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const close = () => useUIStore.getState().setSearchOpen(false);
  const setOpen = useUIStore.getState().setSearchOpen;
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("is-lock");
      setTimeout(() => ref.current?.focus(), 30);
    } else {
      document.body.classList.remove("is-lock");
      setQ("");
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const matches = products.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 6);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-xl"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed left-1/2 top-24 z-[80] w-[min(92vw,900px)] -translate-x-1/2 rounded-[28px] glass-card p-3 shadow-2xl"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-luxe-lineLight dark:border-luxe-line bg-white/60 dark:bg-white/5 p-2">
              <Search className="ml-2 h-5 w-5 text-royalpurple-500" />
              <input
                ref={ref}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search LUXE — apparel, watches, tech…"
                className="flex-1 bg-transparent py-3 px-2 text-base outline-none placeholder:text-ink-400 dark:placeholder:text-white/50"
              />
              <div className="hidden items-center gap-1 rounded-md border border-luxe-lineLight dark:border-luxe-line px-2 py-1 text-[10px] font-bold text-ink-500 dark:text-white/60 sm:flex">
                ESC
              </div>
              <button
                className="grid h-9 w-9 place-items-center rounded-xl bg-white/70 dark:bg-white/10"
                onClick={close}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl p-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                  <Sparkles className="h-3.5 w-3.5 text-gold-500" /> {q ? "Results" : "Trending"}
                </div>
                <div className="space-y-1 max-h-80 overflow-auto pr-1">
                  {(q ? matches : products.slice(0, 5)).map((p, i) => (
                    <Link
                      key={p.id + i}
                      to={`/product/${p.id}`}
                      onClick={close}
                      className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-white/60 dark:hover:bg-white/10 transition"
                    >
                      <img
                        src={p.images[0]}
                        className="h-14 w-14 rounded-xl object-cover"
                        alt={p.title}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold">{p.title}</div>
                        <div className="text-xs text-ink-500 dark:text-white/60">{p.brand} • {p.category}</div>
                      </div>
                      <div className="text-sm font-bold text-gradient-signature">
                        {formatCurrency(p.price)}
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                    </Link>
                  ))}
                  {q && matches.length === 0 && (
                    <div className="py-10 text-center text-sm text-ink-500 dark:text-white/50">
                      No results for <span className="font-semibold">"{q}"</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                  Popular
                </div>
                <ul className="space-y-1.5">
                  {suggestions.map((s) => (
                    <li key={s.label}>
                      <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm hover:bg-white/60 dark:hover:bg-white/10">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-royalpurple-500/15 text-royalpurple-500">
                          <s.icon className="h-4 w-4" />
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold">{s.label}</div>
                          <div className="text-xs text-ink-500 dark:text-white/60">{s.sub}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
                  Collections
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {collections.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      to="/shop"
                      onClick={close}
                      className="relative overflow-hidden rounded-xl"
                    >
                      <img src={c.image} alt={c.title} className="h-20 w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                        <div className="text-xs font-bold">{c.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
