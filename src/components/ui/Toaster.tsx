import { AnimatePresence, motion } from "framer-motion";
import { create } from "zustand";
import { Check, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type ToastKind = "success" | "error" | "info";
interface Toast {
  id: number;
  title: string;
  description?: string;
  kind: ToastKind;
}

interface ToastStore {
  items: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  remove: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  items: [],
  push: (t) => {
    const id = Date.now() + Math.random();
    set({ items: [...get().items, { ...t, id }] });
    setTimeout(() => get().remove(id), 3800);
  },
  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
}));

export function toast(
  title: string,
  description?: string,
  kind: ToastKind = "info"
) {
  useToastStore.getState().push({ title, description, kind });
}

const iconFor = (k: ToastKind) =>
  k === "success" ? Check : k === "error" ? AlertCircle : Info;

const clsFor = (k: ToastKind) =>
  k === "success"
    ? "border-emerald-500/30 bg-emerald-500/10"
    : k === "error"
    ? "border-rose-500/30 bg-rose-500/10"
    : "border-royalpurple-500/30 bg-royalpurple-500/10";

const iconClsFor = (k: ToastKind) =>
  k === "success"
    ? "bg-emerald-500 text-white"
    : k === "error"
    ? "bg-rose-500 text-white"
    : "bg-royalpurple-500 text-white";

export default function Toaster() {
  const items = useToastStore((s) => s.items);
  const remove = useToastStore((s) => s.remove);
  useEffect(() => {}, []);
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8 sm:right-8 sm:left-auto sm:translate-x-0 sm:items-end">
      <AnimatePresence initial={false}>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className={cn(
              "pointer-events-auto flex min-w-[280px] max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xxl shadow-soft-xl",
              clsFor(t.kind)
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl",
                iconClsFor(t.kind)
              )}
            >
              {(() => {
                const I = iconFor(t.kind);
                return <I className="h-4 w-4" />;
              })()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">{t.title}</div>
              {t.description && (
                <div className="mt-0.5 text-xs text-ink-600 dark:text-white/70">
                  {t.description}
                </div>
              )}
            </div>
            <button
              onClick={() => remove(t.id)}
              className="ml-1 rounded-lg p-1 hover:bg-white/60 dark:hover:bg-white/10"
              aria-label="Close toast"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
