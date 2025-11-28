"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

/**
 * SubstrateBackground: The cognitive foundation layer
 * 
 * Concept: Multiple translucent planes at different z-depths create the feeling
 * of looking through layers of intelligence. Particles flow through the network,
 * representing data and thought processes. The substrate breathes - subtle motion
 * indicates a living system, not a static document.
 */
export default function SubstrateBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const networkRef = useRef<NetworkNode[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Initialize particles and network
  const initializeSystem = useCallback((width: number, height: number) => {
    // Data flow particles - moving purposefully through the substrate
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor((width * height) / 30000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.2, // Slight upward drift
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? "#00d9ff" : "#8b5cf6",
      });
    }
    particlesRef.current = particles;

    // Network nodes - breathing distributed intelligence
    const nodes: NetworkNode[] = [];
    const nodeCount = Math.min(8, Math.floor(width / 200));
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        connections: [],
      });
    }

    // Create connections (each node connects to 2-3 nearest neighbors)
    nodes.forEach((node, i) => {
      const distances = nodes
        .map((other, j) => ({
          index: j,
          dist: Math.hypot(other.x - node.x, other.y - node.y),
        }))
        .filter((d) => d.index !== i)
        .sort((a, b) => a.dist - b.dist);

      node.connections = distances.slice(0, 3).map((d) => d.index);
    });

    networkRef.current = nodes;
  }, []);

  // Animation loop
  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (isReducedMotion) {
      // Static render for reduced motion
      ctx.clearRect(0, 0, width, height);
      drawStaticBackground(ctx, width, height);
      return;
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Deep gradient mesh (slow drift)
      drawGradientMesh(ctx, width, height);

      // Layer 2: Network connections (breathing)
      drawNetwork(ctx, width, height);

      // Layer 3: Flowing particles (data stream)
      drawParticles(ctx, width, height);

      // Update particle positions
      updateParticles(width, height);
      updateNetwork(width, height);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, [isReducedMotion]);

  const drawGradientMesh = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const time = Date.now() * 0.0001;
    
    // Deep emergence glow - bottom left
    const grad1 = ctx.createRadialGradient(
      width * 0.1 + Math.sin(time) * 50,
      height * 0.9 + Math.cos(time) * 30,
      0,
      width * 0.1,
      height * 0.9,
      width * 0.5
    );
    grad1.addColorStop(0, "rgba(139, 92, 246, 0.08)");
    grad1.addColorStop(1, "transparent");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    // Data glow - top right
    const grad2 = ctx.createRadialGradient(
      width * 0.9 + Math.cos(time * 0.8) * 40,
      height * 0.1 + Math.sin(time * 0.8) * 40,
      0,
      width * 0.9,
      height * 0.1,
      width * 0.4
    );
    grad2.addColorStop(0, "rgba(59, 130, 246, 0.06)");
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);

    // Cognition pulse - center
    const grad3 = ctx.createRadialGradient(
      width * 0.5 + Math.sin(time * 1.2) * 60,
      height * 0.5 + Math.cos(time * 1.2) * 60,
      0,
      width * 0.5,
      height * 0.5,
      width * 0.3
    );
    grad3.addColorStop(0, "rgba(0, 217, 255, 0.04)");
    grad3.addColorStop(1, "transparent");
    ctx.fillStyle = grad3;
    ctx.fillRect(0, 0, width, height);
  };

  const drawNetwork = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const nodes = networkRef.current;
    const time = Date.now() * 0.001;
    const pulsePhase = (Math.sin(time) + 1) / 2;

    // Draw connections first (behind nodes)
    ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 + pulsePhase * 0.1})`;
    ctx.lineWidth = 1;

    nodes.forEach((node) => {
      node.connections.forEach((connIndex) => {
        const other = nodes[connIndex];
        if (other) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach((node) => {
      // Node glow
      const nodeGrad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
      nodeGrad.addColorStop(0, `rgba(0, 217, 255, ${0.15 + pulsePhase * 0.1})`);
      nodeGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nodeGrad;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Node core
      ctx.fillStyle = `rgba(0, 217, 255, ${0.5 + pulsePhase * 0.3})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    particlesRef.current.forEach((particle) => {
      // Particle glow
      const grad = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      );
      grad.addColorStop(0, particle.color.replace(")", `, ${particle.opacity})`).replace("rgb", "rgba"));
      grad.addColorStop(1, "transparent");
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Particle core
      ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity * 1.5})`).replace("rgb", "rgba");
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const updateParticles = (width: number, height: number) => {
    particlesRef.current.forEach((particle) => {
      // Mouse influence (subtle attraction)
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const dist = Math.hypot(dx, dy);
      
      if (dist < 200 && dist > 0) {
        particle.vx += (dx / dist) * 0.01;
        particle.vy += (dy / dist) * 0.01;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
    });
  };

  const updateNetwork = (width: number, height: number) => {
    networkRef.current.forEach((node) => {
      // Gentle drift
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x < 50 || node.x > width - 50) node.vx *= -1;
      if (node.y < 50 || node.y > height - 50) node.vy *= -1;

      // Small random perturbation
      node.vx += (Math.random() - 0.5) * 0.02;
      node.vy += (Math.random() - 0.5) * 0.02;

      // Limit velocity
      const speed = Math.hypot(node.vx, node.vy);
      if (speed > 0.5) {
        node.vx = (node.vx / speed) * 0.5;
        node.vy = (node.vy / speed) * 0.5;
      }
    });
  };

  const drawStaticBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Static gradient for reduced motion
    const grad1 = ctx.createRadialGradient(width * 0.1, height * 0.9, 0, width * 0.1, height * 0.9, width * 0.5);
    grad1.addColorStop(0, "rgba(139, 92, 246, 0.08)");
    grad1.addColorStop(1, "transparent");
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    const grad2 = ctx.createRadialGradient(width * 0.9, height * 0.1, 0, width * 0.9, height * 0.1, width * 0.4);
    grad2.addColorStop(0, "rgba(59, 130, 246, 0.06)");
    grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);
  };

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
      initializeSystem(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animate(ctx, canvas.width, canvas.height);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeSystem, animate]);

  return (
    <>
      {/* Canvas layer for particles and network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -20 }}
        aria-hidden="true"
      />
      
      {/* Static gradient layers for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -30,
          background: `
            radial-gradient(ellipse 80% 60% at 10% 90%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 90% 10%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
            linear-gradient(180deg, #0a0814 0%, #0d1b2a 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Vignette overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -5,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(10, 8, 20, 0.6) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

