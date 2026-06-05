"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * SubstrateBackground: Clean gradient foundation
 *
 * Simplified version without constellation/network elements.
 * Just subtle, breathing gradients that create depth.
 *
 * Perf: the breathing cycle is extremely slow, so the loop is frame-capped
 * (~15fps) instead of running at 60fps, and pauses entirely when the tab is
 * hidden. Cuts steady-state CPU/GPU work by ~4x with no visible change.
 */
const TARGET_FPS = 15;
const FRAME_INTERVAL = 1000 / TARGET_FPS;

export default function SubstrateBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const drawGradientMesh = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const time = Date.now() * 0.00005; // Very slow breathing

    // Deep emergence glow - bottom left (purple)
    const grad1 = ctx.createRadialGradient(
      width * 0.1 + Math.sin(time) * 30,
      height * 0.9 + Math.cos(time) * 20,
      0,
      width * 0.1,
      height * 0.9,
      width * 0.5
    );
    grad1.addColorStop(0, "rgba(139, 92, 246, 0.06)");
    grad1.addColorStop(1, "transparent");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    // Data glow - top right (blue)
    const grad2 = ctx.createRadialGradient(
      width * 0.9 + Math.cos(time * 0.8) * 25,
      height * 0.1 + Math.sin(time * 0.8) * 25,
      0,
      width * 0.9,
      height * 0.1,
      width * 0.4
    );
    grad2.addColorStop(0, "rgba(59, 130, 246, 0.04)");
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);

    // Cognition accent - center right (cyan)
    const grad3 = ctx.createRadialGradient(
      width * 0.7 + Math.sin(time * 1.2) * 40,
      height * 0.5 + Math.cos(time * 1.2) * 40,
      0,
      width * 0.7,
      height * 0.5,
      width * 0.25
    );
    grad3.addColorStop(0, "rgba(0, 217, 255, 0.03)");
    grad3.addColorStop(1, "transparent");
    ctx.fillStyle = grad3;
    ctx.fillRect(0, 0, width, height);
  };

  const drawStaticBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Static gradient for reduced motion
    const grad1 = ctx.createRadialGradient(width * 0.1, height * 0.9, 0, width * 0.1, height * 0.9, width * 0.5);
    grad1.addColorStop(0, "rgba(139, 92, 246, 0.06)");
    grad1.addColorStop(1, "transparent");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    const grad2 = ctx.createRadialGradient(width * 0.9, height * 0.1, 0, width * 0.9, height * 0.1, width * 0.4);
    grad2.addColorStop(0, "rgba(59, 130, 246, 0.04)");
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);
  };

  // Frame-capped animation loop. Reads live canvas dims so resize stays correct.
  const animate = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (isReducedMotion) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStaticBackground(ctx, canvas.width, canvas.height);
      return;
    }

    const draw = (now: number) => {
      animationRef.current = requestAnimationFrame(draw);
      if (now - lastFrameRef.current < FRAME_INTERVAL) return;
      lastFrameRef.current = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGradientMesh(ctx, canvas.width, canvas.height);
    };

    animationRef.current = requestAnimationFrame(draw);
  }, [isReducedMotion]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reduced motion never animates — repaint the static frame on resize.
      if (isReducedMotion) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStaticBackground(ctx, canvas.width, canvas.height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const stop = () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const start = () => {
      if (animationRef.current === null && !isReducedMotion) {
        animate(ctx, canvas);
      }
    };

    // Don't burn cycles animating an invisible tab.
    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", handleVisibility);

    start();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      stop();
    };
  }, [animate, isReducedMotion]);

  return (
    <>
      {/* Canvas layer for breathing gradients */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -20 }}
        aria-hidden="true"
      />

      {/* Static base layer */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -30,
          background: `
            linear-gradient(180deg, #0a0814 0%, #0d1b2a 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle vignette for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -5,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(10, 8, 20, 0.4) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
