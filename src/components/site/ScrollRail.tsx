import { useScrollProgress } from "@/lib/motion";

/** Thin fixed bar showing how far down the page the reader is. */
export function ScrollRail() {
  useScrollProgress();
  return (
    <div className="scroll-rail" aria-hidden="true">
      <div className="scroll-rail-fill" />
    </div>
  );
}
