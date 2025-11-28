"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, Github, BookOpen, Linkedin } from "lucide-react";

interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
  icon: React.ReactNode;
}

const contactLinks: ContactLink[] = [
  {
    label: "aria@persistos.co",
    href: "mailto:aria@persistos.co",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/ariaxhan",
    external: true,
    icon: <Github className="w-5 h-5" />,
  },
  {
    label: "Medium",
    href: "https://medium.com/@ariaxhan",
    external: true,
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ariahan/",
    external: true,
    icon: <Linkedin className="w-5 h-5" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Contact() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-mono text-gray-500 mb-4">05_CONTACT</p>
          <h2 className="text-4xl lg:text-6xl font-light mb-6">Get in Touch</h2>
          <p className="text-gray-400 text-lg">
            Building something interesting? Let&apos;s talk.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              variants={linkVariants}
              className="group flex items-center gap-3 px-6 py-4 border border-gray-800 hover:border-blue-500 hover:bg-blue-500/5 transition-all duration-300 rounded-sm"
            >
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                {link.icon}
              </span>
              <span className="text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
              {link.external && (
                <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-blue-500 transition-colors" />
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
