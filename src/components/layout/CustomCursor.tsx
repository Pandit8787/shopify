import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const hoverable =
        target?.closest(
          "a, button, [data-cursor='hover'], input, textarea, select, label"
        );
      setHover(Boolean(hoverable));
    };
    const onDown = () => setClick(true);
    const onUp = () => setClick(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    const tick = () => {
      setRing((r) => ({
        x: r.x + (pos.x - r.x) * 0.18,
        y: r.y + (pos.y - r.y) * 0.18,
      }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        className="cursor--ring"
        style={{
          transform: `translate3d(${ring.x}px, ${ring.y}px, 0) scale(${click ? 0.7 : 1}) translate(-50%, -50%)`,
          opacity: click ? 0.8 : 1,
        }}
        aria-hidden
      />
      <div
        className={`cursor--ring ${hover ? "is-hover" : ""}`}
        style={{
          transform: `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden
      />
      <div
        className="cursor--dot"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            click ? 0.6 : 1
          })`,
        }}
        aria-hidden
      />
    </>
  );
}
