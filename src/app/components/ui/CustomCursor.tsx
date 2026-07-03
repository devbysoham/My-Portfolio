import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  // ALL hooks at top level — never inside JSX or after early returns
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Main dot springs
  const x = useSpring(rawX, { stiffness: 600, damping: 45, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 600, damping: 45, mass: 0.3 });

  // Trailing ring springs — MUST be at top level too
  const trailX = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.5 });
  const trailY = useSpring(rawY, { stiffness: 100, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [role='button'], [data-hover]"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Use opacity to show/hide — NEVER use early return after hooks
  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#111111]"
        style={{ x, y, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
        animate={{
          width: hovering ? 42 : 10,
          height: hovering ? 42 : 10,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#111111]"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          opacity: visible ? (hovering ? 0.4 : 0.18) : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
