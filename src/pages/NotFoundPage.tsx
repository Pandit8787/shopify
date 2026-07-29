import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, ShoppingBag, Sparkles, Compass } from "lucide-react";
import { products } from "@/fixtures";
import ProductCard from "@/components/shop/ProductCard";

export default function NotFoundPage() {
  const navi = useNavigate();
  const loc = useLocation();
  const picks = products.slice(0, 4);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-16">
      <div className="relative w-full max-w-5xl px-6">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-aurora-gradient opacity-20 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-center"
        >
          <span className="eyebrow inline-flex">
            <Compass className="h-3 w-3" /> Page Lost in the Atelier
          </span>

          <h1 className="mt-6 font-display text-[120px] md:text-[200px] leading-none font-black tracking-tight text-gradient-signature drop-shadow-[0_0_60px_rgba(124,58,237,0.35)]">
            4
            <motion.span
              animate={{ y: [0, -14, 0], rotate: [0, 6, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mx-1"
            >
              0
            </motion.span>
            4
          </h1>

          <h2 className="heading-lg mt-2 !text-3xl md:!text-5xl">This page went off the runway.</h2>
          <p className="mt-5 text-ink-500 dark:text-white/60 max-w-xl mx-auto leading-relaxed">
            <code className="font-mono text-xs font-bold px-2 py-1 rounded-lg bg-white/60 dark:bg-white/10 border border-luxe-lineLight dark:border-luxe-line mx-1">{loc.pathname}</code>
            isn't part of the LUXE collection. Perhaps it moved, was never made, or the link carried you off course.
          </p>

          <div className="mt-9 flex flex-wrap gap-3 justify-center">
            <button onClick={() => navi(-1)} className="btn-ghost inline-flex items-center gap-2">
              <ArrowLeft className="h-4.5 w-4.5" /> Go Back
            </button>
            <Link to="/home" className="btn-primary inline-flex items-center gap-2">
              <Home className="h-4.5 w-4.5" /> Return Home
            </Link>
            <Link to="/shop" className="btn-ghost-gold inline-flex items-center gap-2">
              <ShoppingBag className="h-4.5 w-4.5" /> Browse the Shop
            </Link>
          </div>
        </motion.div>

        {/* Curated picks */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20"
        >
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="h-px w-16 bg-luxe-lineLight dark:bg-luxe-line" />
            <span className="eyebrow inline-flex">
              <Sparkles className="h-3 w-3" /> Instead, try these
            </span>
            <div className="h-px w-16 bg-luxe-lineLight dark:bg-luxe-line" />
          </div>
          <h3 className="heading-md text-center !text-3xl md:!text-4xl">
            Curated just for <span className="text-gradient-gold">you</span>
          </h3>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {picks.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
