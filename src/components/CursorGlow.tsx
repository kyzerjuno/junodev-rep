import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    let y = 0;
    let frame = 0;

    const update = () => {
      el.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`;
      frame = 0;
    };

    const handleMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(update);
    };
    const handleLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full opacity-0"
      style={{
        width: 300,
        height: 300,
        background: "radial-gradient(circle, hsl(270 80% 60% / 0.12) 0%, transparent 70%)",
        transition: "opacity 0.2s ease-out",
        willChange: "transform",
      }}
    />
  );
};

export default CursorGlow;
