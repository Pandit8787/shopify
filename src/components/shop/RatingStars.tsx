import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RatingStars({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold-500", className)}>
      {[1, 2, 3, 4, 5].map((i) => {
        const pct = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <span
            key={i}
            className="relative inline-block"
            style={{ width: size, height: size }}
          >
            <Star
              size={size}
              className="absolute inset-0 text-gold-500/20 fill-current"
            />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${pct * 100}%` }}
            >
              <Star size={size} className="text-gold-500 fill-current" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
