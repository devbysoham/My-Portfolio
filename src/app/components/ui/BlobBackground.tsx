import { motion } from "motion/react";

/**
 * Animated blob background — three soft blobs drifting infinitely.
 * Opacity is intentionally < 5% so they're felt, not seen.
 * Fixed to viewport so they move independent of scroll.
 */
export function BlobBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Warm amber blob — top-left */}
      <motion.div
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -60, 80, -30, 0],
          scale: [1, 1.08, 0.96, 1.04, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{
          position: "absolute",
          top: "5%",
          left: "-5%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.09) 0%, rgba(245,158,11,0.04) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Cool blue blob — center-right */}
      <motion.div
        animate={{
          x: [0, -70, 50, -30, 0],
          y: [0, 80, -50, 60, 0],
          scale: [1, 0.94, 1.1, 0.98, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{
          position: "absolute",
          top: "35%",
          right: "-8%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147,197,253,0.07) 0%, rgba(99,179,237,0.03) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Neutral warm blob — bottom-left */}
      <motion.div
        animate={{
          x: [0, 50, -60, 30, 0],
          y: [0, -40, 70, -50, 0],
          scale: [1, 1.06, 0.92, 1.03, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "20%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,243,208,0.06) 0%, rgba(52,211,153,0.025) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
