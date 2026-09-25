import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Seamless infinite ticker. The children are rendered twice and the track
 * travels exactly one copy width, so the loop never shows a seam.
 */
export function Marquee({
  children,
  duration = 34,
  className,
  itemClassName,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("mask-fade-x group overflow-hidden", className)}>
      <div
        className="marquee-track group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={cn("flex shrink-0 items-center gap-3 pr-3", itemClassName)}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
