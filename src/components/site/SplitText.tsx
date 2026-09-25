import type { CSSProperties } from "react";
import { useReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PUNCTUATION = /^[^\w]+|[^\w]+$/g;

/**
 * Headline that rises word-by-word when it scrolls into view. Each word sits in
 * its own overflow-hidden mask so it slides up from behind the baseline.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  step = 55,
  emphasis = [],
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  step?: number;
  emphasis?: string[];
}) {
  const ref = useReveal<HTMLSpanElement>();
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span ref={ref} className={cn("split", className)}>
      {words.map((word, i) => {
        const isEmphasised = emphasis.includes(word.replace(PUNCTUATION, ""));
        return (
          <span key={`${word}-${i}`} className="contents">
            <span className="split-word-mask">
              <span
                className={cn("split-word", isEmphasised && "text-gradient", wordClassName)}
                style={{ transitionDelay: `${i * step}ms` } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
