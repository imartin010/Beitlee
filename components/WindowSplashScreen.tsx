"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ANIMATION_DURATION = 2.2;
const EASE = [0.25, 0.1, 0.25, 1] as const; // smooth ease-in-out

export interface WindowSplashScreenProps {
  /** Optional image URL for the shutters. If not provided, a wooden-style placeholder is used. */
  shutterImageSrc?: string;
}

/**
 * Cinematic splash: two shutters cover the viewport; left slides left, right slides right.
 * Runs once, then unmounts so the page is fully interactive.
 */
export function WindowSplashScreen({ shutterImageSrc }: WindowSplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);

  const handleShutterComplete = () => {
    setCompletedCount((prev) => {
      if (prev >= 1) setIsVisible(false);
      return prev + 1;
    });
  };

  const shutterStyle = shutterImageSrc
    ? {
        backgroundImage: `url(${shutterImageSrc})`,
        backgroundSize: "200% 100%",
        backgroundRepeat: "no-repeat",
      }
    : undefined;

  const leftShutterStyle = shutterImageSrc
    ? { ...shutterStyle, backgroundPosition: "0% 0%" }
    : undefined;

  const rightShutterStyle = shutterImageSrc
    ? { ...shutterStyle, backgroundPosition: "100% 0%" }
    : undefined;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 overflow-hidden" aria-hidden>
      {/* Left shutter — slides left off screen */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 will-change-transform"
        style={{
          ...(leftShutterStyle ?? {
            background: `
              linear-gradient(90deg, #5c4033 0%, #6b4e3d 8%, #5c4033 16%, #4a3328 24%),
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 12px,
                rgba(0,0,0,0.15) 12px,
                rgba(0,0,0,0.15) 14px
              ),
              linear-gradient(180deg, #3d2c22 0%, #5c4033 50%, #4a3328 100%)
            `,
            backgroundBlendMode: "multiply",
          }),
        }}
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: ANIMATION_DURATION, ease: EASE }}
        onAnimationComplete={handleShutterComplete}
      />

      {/* Right shutter — slides right off screen */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 will-change-transform"
        style={{
          ...(rightShutterStyle ?? {
            background: `
              linear-gradient(90deg, #4a3328 0%, #5c4033 84%, #6b4e3d 92%, #5c4033 100%),
              repeating-linear-gradient(
                270deg,
                transparent 0px,
                transparent 12px,
                rgba(0,0,0,0.15) 12px,
                rgba(0,0,0,0.15) 14px
              ),
              linear-gradient(180deg, #3d2c22 0%, #5c4033 50%, #4a3328 100%)
            `,
            backgroundBlendMode: "multiply",
          }),
        }}
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: ANIMATION_DURATION, ease: EASE }}
        onAnimationComplete={handleShutterComplete}
      />
    </div>
  );
}
