"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CatalogCard {
  id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  link?: string;
  color: "cognition" | "emergence" | "memory" | "data";
}

const catalogCards: CatalogCard[] = [
  {
    id: "identity",
    category: "ENTITY",
    title: "Aria Han",
    content: "AI Systems Engineer. Building infrastructure for the agentic era.",
    tags: ["founder", "engineer", "ai", "systems", "builder", "san francisco"],
    color: "cognition",
  },
  {
    id: "thesis",
    category: "THESIS",
    title: "Work With AI's Nature",
    content: "Systems that embrace emergence over explicit programming. Coordination > capability.",
    tags: ["philosophy", "emergence", "coordination", "agents", "architecture"],
    color: "emergence",
  },
  {
    id: "heycontext",
    category: "SYSTEM",
    title: "HeyContext",
    content: "Agent orchestration platform. Adaptive routing. Live in beta.",
    tags: ["agents", "orchestration", "production", "live", "multi-agent", "platform"],
    link: "/systems",
    color: "cognition",
  },
  {
    id: "hackathons",
    category: "EVIDENCE",
    title: "6 Competition Wins",
    content: "AWS, Weavehacks, Multimodal AI, Vertical AI, GPT-4o vs Gemini, AI Agents 2.0.",
    tags: ["hackathon", "winner", "competition", "aws", "google", "evidence"],
    link: "/evidence",
    color: "memory",
  },
  {
    id: "vector-native",
    category: "OPEN SOURCE",
    title: "Vector Native Protocol",
    content: "Symbolic communication for LLMs. ~3.2x compression. Agent-to-agent lingua franca.",
    tags: ["protocol", "compression", "agents", "communication", "open source", "python"],
    link: "/open-source",
    color: "emergence",
  },
  {
    id: "convergence",
    category: "OPEN SOURCE",
    title: "The Convergence",
    content: "RL framework. Evolutionary selection. Published to PyPI. Production deployed.",
    tags: ["reinforcement learning", "evolution", "framework", "pypi", "open source"],
    link: "/open-source",
    color: "data",
  },
  {
    id: "companies",
    category: "TRAJECTORY",
    title: "3 Companies Founded",
    content: "PersistOS → HeyContext. Divertissement → HeyContent. Brink Labs → Brink Mind.",
    tags: ["founder", "ceo", "startup", "company", "entrepreneur"],
    link: "/timeline",
    color: "memory",
  },
  {
    id: "writing",
    category: "WRITING",
    title: "Technical Articles",
    content: "Agent coordination. Self-learning systems. Building meaningful technology.",
    tags: ["medium", "writing", "articles", "technical", "blog"],
    link: "/writing",
    color: "data",
  },
];

const colorMap = {
  cognition: {
    tab: "bg-cognition/20 border-cognition/40 text-cognition",
    card: "border-cognition/30 hover:border-cognition/60",
    glow: "hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]",
  },
  emergence: {
    tab: "bg-emergence/20 border-emergence/40 text-emergence",
    card: "border-emergence/30 hover:border-emergence/60",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  memory: {
    tab: "bg-memory/20 border-memory/40 text-memory",
    card: "border-memory/30 hover:border-memory/60",
    glow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]",
  },
  data: {
    tab: "bg-data/20 border-data/40 text-data",
    card: "border-data/30 hover:border-data/60",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
  },
};

/**
 * Calculate relevance score for a card based on query
 */
function calculateRelevance(card: CatalogCard, query: string): number {
  if (!query.trim()) return 0;
  
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  
  let score = 0;
  
  // Check title (highest weight)
  if (card.title.toLowerCase().includes(q)) score += 100;
  words.forEach(w => {
    if (card.title.toLowerCase().includes(w)) score += 30;
  });
  
  // Check category
  if (card.category.toLowerCase().includes(q)) score += 50;
  words.forEach(w => {
    if (card.category.toLowerCase().includes(w)) score += 20;
  });
  
  // Check content
  words.forEach(w => {
    if (card.content.toLowerCase().includes(w)) score += 15;
  });
  
  // Check tags (good weight for exact matches)
  card.tags.forEach(tag => {
    if (tag.toLowerCase() === q) score += 80;
    words.forEach(w => {
      if (tag.toLowerCase().includes(w)) score += 25;
      if (tag.toLowerCase() === w) score += 40;
    });
  });
  
  return score;
}

/**
 * CardCatalogHero: Portfolio as a queryable filing system
 * 
 * Concept: Information organized like a library card catalog.
 * Type to search—cards physically reorganize by relevance.
 * The most relevant cards rise to the top.
 */
export default function CardCatalogHero() {
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Sort cards by relevance to query
  const sortedCards = useMemo(() => {
    if (!query.trim()) {
      return catalogCards;
    }
    
    return [...catalogCards]
      .map(card => ({
        ...card,
        relevance: calculateRelevance(card, query),
      }))
      .sort((a, b) => b.relevance - a.relevance);
  }, [query]);

  // Placeholder suggestions
  const placeholders = [
    "try: agents",
    "try: founder",
    "try: open source",
    "try: hackathon",
    "try: systems",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    if (isSearchFocused) return;
    const interval = setInterval(() => {
      setPlaceholderIndex(i => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isSearchFocused, placeholders.length]);

  return (
    <section className="relative min-h-screen py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h1 className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white/90 mb-3 sm:mb-4 leading-tight">
            Aria Han
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg">
            AI Systems Engineer · Founder · Builder
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16"
        >
          <div 
            className={`
              relative flex items-center gap-3 sm:gap-4
              px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-lg
              border transition-all duration-300
              bg-substrate-deep/80 backdrop-blur-sm
              ${isSearchFocused 
                ? "border-cognition/50 shadow-[0_0_30px_rgba(0,217,255,0.1)]" 
                : "border-glass-border"
              }
            `}
          >
            <Search className={`
              w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 flex-shrink-0
              ${isSearchFocused ? "text-cognition" : "text-neutral-600"}
            `} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder={placeholders[placeholderIndex]}
              className="
                flex-1 bg-transparent outline-none min-w-0
                text-white placeholder:text-neutral-600
                font-mono text-sm sm:text-base
              "
            />
            {query && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-neutral-600 font-mono flex-shrink-0"
              >
                {sortedCards.filter(c => calculateRelevance(c, query) > 0).length} matches
              </motion.span>
            )}
          </div>
          <p className="text-center text-[0.6875rem] sm:text-xs text-neutral-600 mt-2 sm:mt-3 font-mono">
            type to reorganize · cards sort by relevance
          </p>
        </motion.div>

        {/* Card Catalog Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {sortedCards.map((card, index) => {
              const colors = colorMap[card.color];
              const relevance = query ? calculateRelevance(card, query) : 0;
              const isHighlighted = relevance > 0;
              
              const cardContent = (
                <motion.div
                  layout
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: query && !isHighlighted ? 0.4 : 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    layout: { type: "spring", bounce: 0.2, duration: 0.6 },
                    opacity: { duration: 0.3 },
                  }}
                  style={{ order: query ? -relevance : index }}
                  className={`
                    group relative flex flex-col
                    bg-substrate-void/80 backdrop-blur-sm
                    border rounded-lg overflow-hidden
                    min-h-[200px] sm:min-h-[220px] lg:h-[240px]
                    transition-all duration-300
                    ${colors.card} ${colors.glow}
                    ${card.link ? "cursor-pointer" : ""}
                  `}
                >
                  {/* Index tab - like a filing card */}
                  <div className={`
                    absolute -top-px -right-px
                    px-2 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 rounded-bl-lg
                    border-l border-b
                    text-[0.625rem] sm:text-[0.6875rem] lg:text-[10px] font-mono uppercase tracking-wider
                    ${colors.tab}
                  `}>
                    {card.category}
                  </div>

                  {/* Card content */}
                  <div className="p-4 sm:p-5 lg:p-6 pt-6 sm:pt-7 lg:pt-8 flex-1 flex flex-col min-h-0">
                    {/* Title */}
                    <h3 className="text-base sm:text-lg text-white/90 font-light mb-1.5 sm:mb-2 group-hover:text-white transition-colors leading-tight">
                      {card.title}
                    </h3>

                    {/* Content */}
                    <p className="text-sm text-neutral-400 leading-relaxed mb-3 sm:mb-4 flex-1">
                      {card.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-auto">
                      {card.tags.slice(0, 4).map((tag) => {
                        const isTagMatch = query && tag.toLowerCase().includes(query.toLowerCase());
                        return (
                          <span
                            key={tag}
                            className={`
                              inline-flex items-center justify-center
                              text-[0.625rem] sm:text-[0.6875rem] font-mono font-normal
                              px-2 sm:px-2.5 py-0.5 sm:py-1 min-h-[18px] sm:min-h-[20px]
                              rounded border whitespace-nowrap
                              transition-all duration-300
                              ${isTagMatch 
                                ? `${colors.tab}` 
                                : "bg-glass-white text-neutral-500 border border-glass-border"
                              }
                            `}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* Link indicator */}
                    {card.link && (
                      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                        <ArrowRight className={`
                          w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700
                          group-hover:text-neutral-400
                          group-hover:translate-x-1
                          transition-all duration-300
                        `} aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Relevance indicator when searching */}
                  {query && isHighlighted && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(relevance / 2, 100)}%` }}
                      className={`
                        absolute bottom-0 left-0 h-0.5
                        bg-gradient-to-r from-${card.color} to-transparent
                      `}
                    />
                  )}
                </motion.div>
              );

              return card.link ? (
                <Link 
                  key={card.id} 
                  href={card.link} 
                  className="contents touch-manipulation"
                  aria-label={`View ${card.title}`}
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={card.id} className="touch-manipulation">{cardContent}</div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* VN Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 sm:mt-14 lg:mt-16 text-center"
        >
          <Link
            href="/vn"
            className="
              group inline-flex items-center gap-2 sm:gap-3
              px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 rounded-lg border border-emergence/30
              hover:border-emergence/60 hover:bg-emergence/5
              transition-all duration-400 touch-manipulation
              hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
            "
            aria-label="View as Vector Native"
          >
            <span className="text-emergence font-mono text-xs sm:text-sm">∎</span>
            <span className="text-neutral-300 group-hover:text-white transition-colors text-xs sm:text-sm">
              View as Vector Native
            </span>
            <span className="text-[0.625rem] sm:text-xs text-neutral-600 font-mono">
              ~3.2x compression
            </span>
          </Link>
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-[0.6875rem] sm:text-xs text-neutral-600 mt-6 sm:mt-8 font-mono"
        >
          content reorganizes based on what you seek
        </motion.p>
      </div>
    </section>
  );
}

