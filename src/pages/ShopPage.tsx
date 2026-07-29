import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Grid3x3,
  LayoutGrid,
  X,
  Star,
  Heart,
  Tag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { products, categories, brands } from "@/fixtures";
import ProductCard from "@/components/shop/ProductCard";
import { formatCurrency } from "@/lib/utils";
import RatingStars from "@/components/shop/RatingStars";
import { useUIStore } from "@/stores/ui";

const sorts = [
  { k: "featured", l: "Featured" },
  { k: "newest", l: "Newest" },
  { k: "price-asc", l: "Price: Low → High" },
  { k: "price-desc", l: "Price: High → Low" },
  { k: "rating", l: "Top Rated" },
];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]["k"]>("featured");
  const [cat, setCat] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [range, setRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState<"grid4" | "grid3">("grid4");

  const toggleColor = (c: string) =>
    setColors((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (query && !(p.title + p.brand + p.description).toLowerCase().includes(query.toLowerCase())) return false;
      if (cat && p.category !== cat) return false;
      if (brand && p.brand !== brand) return false;
      if (p.price < range[0] || p.price > range[1]) return false;
      if (p.rating < minRating) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      return true;
    });
    switch (sort) {
      case "newest":
        list = list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
        break;
      case "price-asc":
        list = list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = list.sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [query, sort, cat, brand, range, minRating, colors]);

  const setQuickView = useUIStore.getState().setQuickView;

  return (
    <div className="container pt-12 pb-40">
      <div className="mb-6 md:mb-10 rounded-3xl md:rounded-[32px] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="h-40 sm:h-52 md:h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        <div className="absolute inset-0 flex items-center px-5 sm:px-8 md:p-12">
          <div className="max-w-xl">
            <span className="eyebrow !bg-white/10 !text-white border-white/20 !text-[9px] md:!text-[10px] !px-2 !py-1">
              <Sparkles className="h-2.5 w-2.5" /> Shop
            </span>
            <h1 className="mt-2 md:mt-4 font-display font-black leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              Every piece. <span className="text-gradient-signature">Curated.</span>
            </h1>
            <p className="mt-1 md:mt-2 text-xs sm:text-sm md:text-base text-white/70 max-w-md">
              {products.length} objects — handmade, serialized, ready to ship in 48h.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky top-20 z-30 mb-6 -mx-1 rounded-3xl glass-card p-3 backdrop-blur-xxl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-0 sm:min-w-[240px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500 dark:text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search styles, brands, materials…"
              className="input-luxe pl-11 py-2.5 !bg-transparent"
            />
          </div>
          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="btn-ghost !py-2.5 !px-4 !text-sm inline-flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters{" "}
            <span className="font-mono text-xs opacity-70">
              {[cat, brand, minRating > 0, colors.length > 0, range[0] > 0 || range[1] < 5000].filter(Boolean).length || ""}
            </span>
          </button>
          <div className="flex items-center gap-1 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-1">
            <button
              onClick={() => setSort(sorts[0].k)}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-ink-500 dark:text-white/60"
            >
              Sort
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="bg-transparent rounded-xl px-3 py-2 text-sm font-semibold outline-none"
            >
              {sorts.map((s) => (
                <option key={s.k} value={s.k} className="bg-white dark:bg-ink-900">
                  {s.l}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-auto hidden items-center gap-1 rounded-2xl border border-luxe-lineLight dark:border-luxe-line p-1 sm:flex">
            <button
              onClick={() => setView("grid4")}
              className={`grid h-9 w-9 place-items-center rounded-xl ${view === "grid4" ? "bg-signature-gradient text-white" : "text-ink-500 dark:text-white/60"}`}
              aria-label="Grid 4"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("grid3")}
              className={`grid h-9 w-9 place-items-center rounded-xl ${view === "grid3" ? "bg-signature-gradient text-white" : "text-ink-500 dark:text-white/60"}`}
              aria-label="Grid 3"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr] relative">
        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setFilterOpen(false)}
              />
              <motion.aside
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 260 }}
                className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto glass-strong p-4 sm:p-5 pb-20 lg:hidden"
              >
                <div className="sticky top-0 -mx-4 sm:-mx-5 px-4 sm:px-5 py-3 mb-4 flex items-center justify-between bg-gradient-to-b from-white/80 dark:from-ink-900/90 to-transparent backdrop-blur-md z-10">
                  <div className="font-heading text-lg font-semibold">Filters</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCat(null);
                        setBrand(null);
                        setMinRating(0);
                        setColors([]);
                        setRange([0, 5000]);
                        setQuery("");
                      }}
                      className="text-xs font-semibold text-royalpurple-500 hover:underline"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10"
                      aria-label="Close filters"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
                <ShopSidebarContents
                  cat={cat} setCat={setCat} brand={brand} setBrand={setBrand}
                  range={range} setRange={setRange} colors={colors} toggleColor={toggleColor}
                  minRating={minRating} setMinRating={setMinRating}
                />
                <button
                  onClick={() => setFilterOpen(false)}
                  className="btn-primary mt-6 w-full sticky bottom-0"
                >
                  See {filtered.length} Results <ArrowRight className="h-4 w-4" />
                </button>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <aside className="hidden lg:block">
          <div className="sticky top-40 space-y-6 rounded-3xl glass-card p-5">
            <div className="flex items-center justify-between">
              <div className="font-heading text-lg font-semibold">Filters</div>
              <button
                onClick={() => {
                  setCat(null);
                  setBrand(null);
                  setMinRating(0);
                  setColors([]);
                  setRange([0, 5000]);
                  setQuery("");
                }}
                className="text-xs font-semibold text-royalpurple-500 hover:underline"
              >
                Reset
              </button>
            </div>
            <ShopSidebarContents
              cat={cat} setCat={setCat} brand={brand} setBrand={setBrand}
              range={range} setRange={setRange} colors={colors} toggleColor={toggleColor}
              minRating={minRating} setMinRating={setMinRating}
            />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ink-500 dark:text-white/60">
            <div>
              Showing <span className="font-semibold text-ink-900 dark:text-white">{filtered.length}</span> pieces
              {(query || cat || brand) && (
                <> · <button onClick={() => { setQuery(""); setCat(null); setBrand(null); }} className="text-royalpurple-500 hover:underline">Clear filters</button></>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Tag className="h-3.5 w-3.5" /> Free returns · Free ship over $500
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl glass-card p-8 sm:p-16 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-aurora-gradient animate-float">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="heading-md !text-2xl sm:!text-3xl">Nothing quite matches yet.</h3>
              <p className="mt-3 mx-auto max-w-md text-ink-500 dark:text-white/60">
                Try loosening a filter, removing a color, or clearing the search query.
              </p>
              <button
                onClick={() => {
                  setCat(null); setBrand(null); setMinRating(0); setColors([]); setRange([0, 5000]); setQuery("");
                }}
                className="btn-primary mt-6"
              >
                Reset & Browse All <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className={cn(
                "grid gap-4 sm:gap-5",
                view === "grid3"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              )}
            >
              {filtered.map((p, i) => (
                <ProductCard product={p} index={i} key={p.id} />
              ))}
            </motion.div>
          )}

          {filtered.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button className="btn-ghost-gold group inline-flex gap-2">
                Load more pieces
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-500/20 group-hover:rotate-180 transition-transform duration-500">
                  <ChevronDown className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShopSidebarContents(props: {
  cat: string | null;
  setCat: (v: string | null) => void;
  brand: string | null;
  setBrand: (v: string | null) => void;
  range: [number, number];
  setRange: (v: [number, number]) => void;
  colors: string[];
  toggleColor: (c: string) => void;
  minRating: number;
  setMinRating: (v: number) => void;
}) {
  const { cat, setCat, brand, setBrand, range, setRange, colors, toggleColor, minRating, setMinRating } = props;
  return (
    <div className="space-y-6">
      <FilterBlock title="Categories">
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setCat(null)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${cat === null ? "bg-signature-gradient text-white" : "hover:bg-white/50 dark:hover:bg-white/10"}`}
            >
              All Categories
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setCat(c.slug)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium ${cat === c.slug ? "bg-signature-gradient text-white" : "hover:bg-white/50 dark:hover:bg-white/10"}`}
              >
                {c.name}
                <span className="text-xs opacity-70">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </FilterBlock>

      <FilterBlock title="Brands">
        <div className="space-y-1.5">
          <button
            onClick={() => setBrand(null)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${brand === null ? "bg-signature-gradient text-white" : "hover:bg-white/50 dark:hover:bg-white/10"}`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => setBrand(b.name)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${brand === b.name ? "bg-signature-gradient text-white" : "hover:bg-white/50 dark:hover:bg-white/10"}`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Price">
        <div className="px-1">
          <div className="flex items-baseline justify-between text-sm font-semibold">
            <span>{formatCurrency(range[0])}</span>
            <span>—</span>
            <span>{formatCurrency(range[1])}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={range[1]}
            onChange={(e) => setRange([range[0], Number(e.target.value)])}
            className="mt-3 w-full accent-royalpurple-500"
          />
          <div className="mt-4 grid grid-cols-4 gap-1.5 text-[10px] font-bold">
            {[250, 500, 1000, 2500].map((n) => (
              <button
                key={n}
                onClick={() => setRange([0, n])}
                className={cn(
                  "rounded-lg border border-luxe-lineLight dark:border-luxe-line py-1.5",
                  range[1] === n ? "bg-signature-gradient text-white border-transparent" : "hover:bg-white/50 dark:hover:bg-white/10"
                )}
              >
                ≤{formatCurrency(n)}
              </button>
            ))}
          </div>
        </div>
      </FilterBlock>

      <FilterBlock title="Color">
        <div className="flex flex-wrap gap-2">
          {[
            { n: "Aurora", c: "#8b5cf6" },
            { n: "Obsidian", c: "#0a0a0a" },
            { n: "Signal Red", c: "#dc2626" },
            { n: "Whiskey", c: "#b45309" },
            { n: "Parchment", c: "#fafaf9" },
            { n: "Midnight", c: "#1e293b" },
            { n: "Graphite", c: "#27272a" },
            { n: "Rose Gold", c: "#b45309" },
            { n: "Ranger", c: "#365314" },
            { n: "Sand", c: "#e7e5e4" },
          ].map((c) => (
            <button
              key={c.n}
              onClick={() => toggleColor(c.n)}
              title={c.n}
              className={`h-8 w-8 rounded-full ring-2 transition ${colors.includes(c.n) ? "ring-royalpurple-500 scale-110" : "ring-white dark:ring-ink-800 hover:scale-105"}`}
              style={{ background: c.c }}
            />
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Minimum Rating">
        <div className="space-y-1.5">
          {[4, 3, 2, 1, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${minRating === r ? "bg-signature-gradient text-white" : "hover:bg-white/50 dark:hover:bg-white/10"}`}
            >
              <RatingStars value={r} size={12} />
              <span>& up</span>
              <span className="ml-auto text-xs opacity-70">
                {products.filter((p) => p.rating >= r).length}
              </span>
            </button>
          ))}
        </div>
      </FilterBlock>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-white/60">
        {title}
      </div>
      {children}
    </div>
  );
}

function cn(...x: unknown[]) {
  return x.filter(Boolean).join(" ");
}
