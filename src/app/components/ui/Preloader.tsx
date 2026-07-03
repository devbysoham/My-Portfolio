import { motion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0% to 100% over 1.4 seconds
    const duration = 1400;
    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(currentProgress);

      if (currentProgress < 100) {
        requestAnimationFrame(update);
      } else {
        // Short delay before fading out
        setTimeout(onComplete, 250);
      }
    };

    requestAnimationFrame(update);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F7F7F5]"
    >
      <div className="flex flex-col items-center max-w-[280px] w-full px-4">
        {/* Name / Logo Centered */}
        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-2xl font-black tracking-widest text-[#111111] mb-6 uppercase"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          SOHAM MAZUMDER
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-[#E0E0DC] rounded-full overflow-hidden relative">
          {/* Progress bar line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-[#111111] origin-left"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Subtle percentage display */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.3 }}
          className="text-[10px] font-mono text-[#111111] mt-2 tracking-wider"
        >
          {Math.floor(progress)}%
        </motion.span>
      </div>
    </motion.div>
  );
}
