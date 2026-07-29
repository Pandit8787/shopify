import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/stores/ui";

export default function ThemeToggle() {
  const theme = useUIStore((s) => s.theme);
  const toggle = useUIStore((s) => s.toggleTheme);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" aria-hidden />;
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      data-cursor="hover"
      className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-luxe-lineLight dark:border-luxe-line bg-white/40 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/20 transition"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 grid place-items-center text-gold-400"
          >
            <Sun className="h-[18px] w-[18px]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 grid place-items-center text-royal-800"
          >
            <Moon className="h-[18px] w-[18px]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
