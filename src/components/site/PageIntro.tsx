import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const BOOT_LINES = [
  "initialising event index",
  "resolving calendar records",
  "warming image cache",
  "calibrating motion",
];

const HOLD_MS = 900;
const FADE_MS = 520;

/**
 * One-shot boot overlay for the events page. It is intentionally never
 * interactive (`pointer-events-none`) and unmounts itself, so it can't trap
 * input even if a timer is throttled by a background tab.
 */
export function PageIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const ticker = setInterval(
      () => setLine((n) => (n + 1) % BOOT_LINES.length),
      HOLD_MS / BOOT_LINES.length,
    );
    const fadeOut = setTimeout(() => setLeaving(true), HOLD_MS);
    const unmount = setTimeout(() => setVisible(false), HOLD_MS + FADE_MS);
    return () => {
      clearInterval(ticker);
      clearTimeout(fadeOut);
      clearTimeout(unmount);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[95] grid place-items-center overflow-hidden bg-background transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        leaving ? "scale-[1.04] opacity-0" : "opacity-100"
      }`}
    >
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <div className="circuit-lines pointer-events-none absolute inset-0 opacity-70" />

      <div className="relative flex w-full max-w-xs flex-col items-center px-6">
        <div className="animate-float">
          <Logo className="h-16 w-auto drop-shadow-[0_0_24px_oklch(0.727_0.176_41_/_45%)]" />
        </div>

        <p className="eyebrow mt-6 text-center">Tech Fusion Club</p>

        <div className="mt-5 h-px w-full overflow-hidden rounded-full bg-border">
          <div className="animate-boot-bar h-full w-full origin-left bg-primary" />
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {BOOT_LINES[line % BOOT_LINES.length] ?? ""}
          <span className="animate-caret ml-1 text-primary-glow">_</span>
        </p>
      </div>
    </div>
  );
}
