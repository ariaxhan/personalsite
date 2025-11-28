"use client";

import { motion, useInView } from "framer-motion";
import { Mail, Github, BookOpen, Linkedin, ArrowUpRight, X } from "lucide-react";
import { useRef, useState } from "react";

interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
  color: "cognition" | "emergence" | "memory" | "data";
}

const contactLinks: ContactLink[] = [
  {
    label: "ariaxhan@gmail.com",
    href: "mailto:ariaxhan@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    color: "cognition",
  },
  {
    label: "GitHub",
    href: "https://github.com/ariaxhan",
    external: true,
    icon: <Github className="w-5 h-5" />,
    color: "emergence",
  },
  {
    label: "Medium",
    href: "https://medium.com/@ariaxhan",
    external: true,
    icon: <BookOpen className="w-5 h-5" />,
    color: "data",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ariahan/",
    external: true,
    icon: <Linkedin className="w-5 h-5" />,
    color: "memory",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/aria__han",
    external: true,
    icon: <X className="w-5 h-5" />,
    color: "cognition",
  },
];

const colorStyles = {
  cognition: {
    text: "text-cognition",
    border: "border-cognition/30 hover:border-cognition/60",
    bg: "hover:bg-cognition/5",
    glow: "rgba(0, 217, 255, 0.2)",
  },
  emergence: {
    text: "text-emergence",
    border: "border-emergence/30 hover:border-emergence/60",
    bg: "hover:bg-emergence/5",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  memory: {
    text: "text-memory",
    border: "border-memory/30 hover:border-memory/60",
    bg: "hover:bg-memory/5",
    glow: "rgba(251, 191, 36, 0.2)",
  },
  data: {
    text: "text-data",
    border: "border-data/30 hover:border-data/60",
    bg: "hover:bg-data/5",
    glow: "rgba(59, 130, 246, 0.2)",
  },
};

/**
 * Contact: Network nodes for connection
 * 
 * Concept: Each contact method is a node in the network of connection.
 * Like neurons reaching out to form synapses, these are the pathways
 * through which communication flows. Hovering activates the node.
 */
export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background gradient - convergence point */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0, 217, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 50% 0%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-data tracking-[0.2em] mb-6">
            <span className="text-cognition/60">⊛</span> 05_CONTACT
          </p>
          <h2 className="text-display text-4xl lg:text-6xl text-white/90 mb-6">
            Get in Touch
          </h2>
          <p className="text-neutral-400 text-lg">
            Building something interesting? The network is open for new connections.
          </p>
        </motion.div>

        {/* Contact links as network nodes */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {contactLinks.map((link, index) => {
            const colors = colorStyles[link.color];
            const isHovered = hoveredIndex === index;

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative flex items-center gap-4
                  px-6 py-5 glass-panel
                  border ${colors.border} ${colors.bg}
                  transition-all duration-400
                `}
                style={{
                  boxShadow: isHovered ? `0 0 30px ${colors.glow}` : undefined,
                }}
              >
                {/* Icon with glow */}
                <span className={`
                  transition-all duration-300
                  ${isHovered ? colors.text : "text-neutral-400"}
                `}>
                  {link.icon}
                </span>

                {/* Label */}
                <span className={`
                  text-sm font-mono transition-colors duration-300
                  ${isHovered ? "text-white" : "text-neutral-300"}
                `}>
                  {link.label}
                </span>

                {/* External link indicator */}
                {link.external && (
                  <ArrowUpRight className={`
                    w-3.5 h-3.5 transition-all duration-300
                    ${isHovered 
                      ? `${colors.text} translate-x-0.5 -translate-y-0.5` 
                      : "text-neutral-600"
                    }
                  `} />
                )}

                {/* Active node indicator */}
                <div className={`
                  absolute -top-1 -right-1 w-2 h-2 rounded-full
                  transition-all duration-300
                  ${isHovered 
                    ? `${colors.text.replace('text-', 'bg-')} shadow-[0_0_8px_currentColor]` 
                    : "bg-transparent"
                  }
                `} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Decorative network visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <svg 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
            viewBox="0 0 600 200"
            fill="none"
          >
            {/* Network lines converging to center */}
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${100 + i * 100} 200 Q 300 100 300 50`}
                stroke="url(#contact-gradient)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
              />
            ))}
            <defs>
              <linearGradient id="contact-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
