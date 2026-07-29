import { motion } from "framer-motion";

export default function Logo() {
  return (
    <span className="relative inline-grid h-8 w-8 shrink-0 place-items-center">
      <motion.span
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        className="absolute inset-0 rounded-xl bg-conic-gradient"
        style={{
          background:
            "conic-gradient(from 0deg, #1E40AF, #7C3AED, #EC4899, #D4AF37, #1E40AF)",
          filter: "blur(8px)",
          opacity: 0.7,
        }}
      />
      <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-white/80 dark:bg-black/70 backdrop-blur-xl border border-luxe-lineLight dark:border-white/10 shadow-inner-glow overflow-hidden">
        <svg viewBox="0 0 32 32" className="h-5 w-5">
          <defs>
            <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path
            fill="url(#lg)"
            d="M8 6h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm2.2 4.4v9.2h1.9l2.8-4.6 2.8 4.6h1.9v-9.2h-1.9l-2.8 4.8-2.8-4.8h-1.9Z"
          />
          <path
            fill="url(#lg)"
            d="M21.5 10.2h4v1.6h-2.1v2.7h1.9v1.5h-1.9v3.7h-1.9v-9.5Z"
            opacity="0.9"
          />
        </svg>
      </span>
    </span>
  );
}
