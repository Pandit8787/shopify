import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useUIStore } from "@/stores/ui";

export default function BackToTop() {
  const visible = useUIStore((s) => s.backToTopVisible);
  const setVis = useUIStore((s) => s.setBackToTopVisible);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVis(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setVis]);
  if (!mounted) return null;
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.6 }}
          whileHover={{ y: -4 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-signature-gradient text-white shadow-glow-purple"
          aria-label="Back to top"
          data-cursor="hover"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
