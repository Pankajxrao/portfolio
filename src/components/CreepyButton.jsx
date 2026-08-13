import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const CreepyButton = ({
  children,
  className = "",
  coverClassName = "",
  onClick,
  ...props
}) => {
  const eyesRef = useRef(null);

  const [eyeCoords, setEyeCoords] = useState({
    x: 0,
    y: 0,
  });

  const [isHovered, setIsHovered] = useState(false);

  const updateEyes = (e) => {
    const userEvent =
      "touches" in e ? e.touches[0] : e;

    if (!eyesRef.current || !userEvent) return;

    // Get the center position of the eyes
    const eyesRect = eyesRef.current.getBoundingClientRect();

    const eyesCenter = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2,
    };

    // Get cursor/touch position
    const cursor = {
      x: userEvent.clientX,
      y: userEvent.clientY,
    };

    // Difference between cursor and eyes
    const dx = cursor.x - eyesCenter.x;
    const dy = cursor.y - eyesCenter.y;

    // Calculate angle
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;

    // Maximum pupil movement
    const visionRangeX = 180;
    const visionRangeY = 75;

    const distance = Math.hypot(dx, dy);

    // Limit pupil movement
    const x =
      (Math.sin(angle) * Math.min(distance, visionRangeX)) /
      visionRangeX;

    const y =
      (Math.cos(angle) * Math.min(distance, visionRangeY)) /
      visionRangeY;

    setEyeCoords({
      x,
      y,
    });
  };

  // Reset eyes when mouse leaves
  const resetEyes = () => {
    setEyeCoords({
      x: 0,
      y: 0,
    });

    setIsHovered(false);
  };

  // Pupil movement
  const pupilStyle = {
    transform: `translate(
      calc(-50% + ${eyeCoords.x * 50}%),
      calc(-50% + ${eyeCoords.y * 50}%)
    )`,
  };

  return (
    <button
      type="button"
      className={`relative min-w-[9em] rounded-xl bg-black cursor-pointer outline-none select-none group tap-highlight-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 ${className}`}
      onClick={onClick}
      onMouseMove={(e) => {
        updateEyes(e);
        setIsHovered(true);
      }}
      onTouchMove={updateEyes}
      onMouseLeave={resetEyes}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      {...props}
    >
      {/* =========================
          EYES
      ========================== */}
      <span
        ref={eyesRef}
        className="absolute flex items-center gap-[0.375em] right-[1em] bottom-[0.5em] h-[0.75em] z-0 pointer-events-none"
      >
        {/* Left Eye */}
        <motion.span
          className="relative w-[0.75em] bg-white rounded-full overflow-hidden"
          animate={{
            height: ["0.75em", "0.75em", "0em", "0.75em"],
          }}
          transition={{
            duration: 3,
            times: [0, 0.92, 0.96, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span
            className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
            style={pupilStyle}
          />
        </motion.span>

        {/* Right Eye */}
        <motion.span
          className="relative w-[0.75em] bg-white rounded-full overflow-hidden"
          animate={{
            height: ["0.75em", "0.75em", "0em", "0.75em"],
          }}
          transition={{
            duration: 3,
            times: [0, 0.92, 0.96, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span
            className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
            style={pupilStyle}
          />
        </motion.span>
      </span>

      {/* =========================
          BUTTON COVER
      ========================== */}
      <motion.span
        className={`absolute inset-0 block rounded-xl bg-zinc-900 text-white font-bold tracking-wider shadow-[inset_0_0_0_0.125em_rgba(0,0,0,1)] flex items-center justify-center px-4 py-2 origin-[1.25em_50%] ${coverClassName}`}
        animate={{
          rotate: isHovered ? -12 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      >
        {children}
      </motion.span>

      {/* =========================
          INVISIBLE PLACEHOLDER
          Keeps button dimensions
      ========================== */}
      <span className="block opacity-0 px-4 py-2 font-bold tracking-wider min-w-[9em]">
        {children}
      </span>
    </button>
  );
};

export default CreepyButton;