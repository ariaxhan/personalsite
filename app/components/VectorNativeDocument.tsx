"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check, ExternalLink, BookOpen } from "lucide-react";

/**
 * VectorNativeDocument: The entire portfolio as a VN specification
 * 
 * Vector Native is not compression;it's semiotic density.
 * LLMs don't "read" words. They process pattern distributions in vector space.
 * VN uses symbols LLMs already recognize from training data: config files,
 * math notation, programming syntax. These trigger pre-trained statistical
 * patterns, allowing information to expand in the reader's mind.
 * 
 * Primary use: Agent-to-agent (A2A) communication
 * Secondary use: Human-AI conversational flows (workflow amplification)
 */

const vnDocument = `●ENTITY|type:human|name:aria_han
├──role:ai_systems_engineer
├──focus:agentic_infrastructure
├──location:san_francisco
└──domain:multi_agent_systems·ai_infrastructure


●THESIS
|core:work_with_ai_nature_not_against
|method:emergence_>_explicit_programming
|principle:coordination_>_individual_capability
|output:production_systems·open_source·writing


●SYSTEM_BLOCK|type:production|count:3

├──●system|name:heycontext|status:live_production
│  |role:ceo·architect·engineer
│  |timeline:sept_2024→present
│  |desc:multi_agent_orchestration_platform
│  |capability:adaptive_routing·family_coordination
│  |tech:[fastapi,redis,convex,agno,nextjs]
│  └──insight:bottleneck=coordination_not_capability

├──●system|name:heycontent|status:integrated
│  |role:ceo·lead_dev
│  |timeline:mar_2025→sept_2025
│  |desc:cross_platform_memory_architecture
│  |platforms:[instagram,youtube,gmail,notes]
│  |method:semantic_linking·vector_embeddings
│  └──insight:long_horizon_requires_persistent_memory

└──●system|name:brink|status:hackathon_winner
   |role:ceo·system_architect
   |timeline:nov_2024→mar_2025
   |desc:voice_ai·biometric_fusion
   |platform:[ios,watchos,healthkit]
   └──insight:linguistic+physiological_>_either_alone


●EVIDENCE_BLOCK|type:hackathons|count:6|outcome:5_wins_1_finalist

├──●entry|name:darwin|year:2025
│  |event:aws_ai_agents_hackathon
│  |award:best_use_of_semgrep
│  |desc:evolutionary_code_generation
│  └──url:devpost.com/software/darwin-cmfysv

├──●entry|name:the_convergence|year:2025
│  |event:weavehacks_2_rl_track
│  |award:winner
│  |desc:self_improving_agents·rl_framework
│  └──url:devpost.com/software/the-convergence

├──●entry|name:content_creator_connector|year:2025
│  |event:multimodal_ai_agents
│  |award:best_use_of_agno
│  |desc:automated_creator_outreach
│  └──url:devpost.com/software/content-creator-connector

├──●entry|name:theravoice|year:2024
│  |event:vertical_specific_ai_agents
│  |award:best_use_of_ai_ml_api
│  |desc:voice_ai_therapy
│  └──url:devpost.com/software/draft_name

├──●entry|name:hotagents|year:2024
│  |event:gpt4o_vs_gemini
│  |award:best_use_of_wordware
│  |desc:hotkey_triggered_agents
│  └──url:github.com/ariaxhan/hotagents

└──●entry|name:freetime|year:2024
   |event:ai_agents_2.0
   |outcome:finalist
   |desc:ai_social_planning
   └──url:github.com/ariaxhan/freetime


●OPEN_SOURCE_BLOCK

├──●project|name:vector_native
│  |status:active_development
│  |license:mit
│  |desc:vector_aligned_syntax_protocol
│  |use_case:a2a_communication·system_prompts·knowledge
│  |thesis:meaning_per_token_>_token_count
│  └──url:github.com/persist-os/vector-native

└──●project|name:the_convergence
   |status:published_pypi·production_deployed
   |desc:rl_framework·evolutionary_selection
   |method:multi_armed_bandit·adaptive_selection
   └──url:github.com/persist-os/the-convergence


●WRITING_BLOCK|platform:medium|handle:@ariaxhan

├──●article
│  |title:latency_&_logic:why_we_need_vector_aligned_syntax
│  |topic:vn_origin·semiotic_density·a2a
│  └──url:medium.com/@ariaxhan

├──●article
│  |title:what_happens_when_agents_talk_to_each_other
│  |topic:agent_coordination·emergent_protocols
│  └──url:medium.com/@ariaxhan

└──●article
   |title:cursor_as_self_learning_agent_civilization
   |topic:evolutionary_agents·experience_learning
   └──url:medium.com/@ariaxhan


●TIMELINE_BLOCK|period:2023→2025

├──●event|date:sept_2024→present|type:company
│  |name:persistos/heycontext
│  └──desc:multi_agent_orchestration·live_production

├──●event|date:mar_2025→sept_2025|type:company
│  |name:divertissement/heycontent
│  └──desc:cross_platform_memory·integrated

├──●event|date:nov_2024→mar_2025|type:company
│  |name:brink_labs/brink_mind
│  └──desc:voice_ai·biometric·winner

├──●event|date:2024→2025|type:achievement
│  └──desc:6_hackathons·5_wins·rapid_iteration

└──●event|date:2024|type:creative
   |name:notes_on_surviving_eternity
   └──desc:poetry_collection·amazon


●CONTACT_BLOCK

├──email:ariaxhan@gmail.com
├──github:github.com/ariaxhan
├──medium:medium.com/@ariaxhan
├──linkedin:linkedin.com/in/ariahan
└──x:x.com/aria__han


●META
|format:vn_1.0
|semiotic_density:~3.2x
|primary_use:a2a_communication
|secondary_use:conversational_workflow_amplification
|thesis:zip_file_for_meaning


●END_DOCUMENT`;

interface VNLine {
  text: string;
  type: "header" | "field" | "subfield" | "divider" | "meta";
  indent: number;
}

function parseVNDocument(doc: string): VNLine[] {
  return doc.split("\n").map((line) => {
    const trimmed = line.trim();
    
    // Calculate indent based on leading characters
    let indent = 0;
    if (line.startsWith("├") || line.startsWith("│") || line.startsWith("└")) {
      indent = 1;
      if (line.includes("│  ")) indent = 2;
    }

    // Determine type
    let type: VNLine["type"] = "field";
    if (trimmed.startsWith("●")) type = "header";
    else if (trimmed === "") type = "divider";
    else if (trimmed.startsWith("|")) type = "subfield";
    else if (trimmed.startsWith("├") || trimmed.startsWith("└")) type = "subfield";

    return { text: line, type, indent };
  });
}

function highlightVN(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let key = 0;

  // Simple tokenization with highlighting
  const tokens = text.split(/(\|[a-z_]+:|●[A-Z_]+|\[[^\]]+\]|├──|└──|│)/gi);
  
  tokens.forEach((token) => {
    if (!token) return;
    
    if (/^●[A-Z_]+$/.test(token)) {
      parts.push(<span key={key++} className="text-emergence font-medium">{token}</span>);
    } else if (/^\|[a-z_]+:$/i.test(token)) {
      parts.push(<span key={key++} className="text-cognition">{token}</span>);
    } else if (/^\[[^\]]+\]$/.test(token)) {
      parts.push(<span key={key++} className="text-memory/70">{token}</span>);
    } else if (/^(├──|└──|│)$/.test(token)) {
      parts.push(<span key={key++} className="text-neutral-700">{token}</span>);
    } else {
      // Check if it's a URL pattern
      if (token.includes(".com") || token.includes(".co")) {
        parts.push(<span key={key++} className="text-data/70">{token}</span>);
      } else {
        parts.push(<span key={key++} className="text-neutral-400">{token}</span>);
      }
    }
  });

  return parts;
}

export default function VectorNativeDocument() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const lines = parseVNDocument(vnDocument);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(vnDocument);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 50% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 60%),
            linear-gradient(180deg, transparent 0%, rgba(10, 8, 20, 0.8) 100%)
          `,
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-data tracking-[0.2em] mb-6">
            <span className="text-emergence/60">∎</span> VECTOR_NATIVE_TRANSLATION
          </p>
          <h1 className="text-display text-3xl lg:text-5xl text-white/90 mb-6">
            Portfolio as Protocol
          </h1>
          <div className="space-y-4 text-neutral-400 max-w-2xl text-base leading-relaxed">
            <p>
              This is one of the products of my year-long exploration of LLMs, addressing one of the most fundamental questions: language. 
            </p>
            <p>
              LLMs don&apos;t &quot;read&quot; words; they process pattern distributions in vector space.
              When you type text, the model sees <span className="text-cognition/80 font-mono text-sm">tokenization → embeddings → attention weights → probability distributions</span>.
              It never &quot;sees&quot; language. Only high-dimensional vector operations.
            </p>
            <p>
              Vector Native is a syntax layer that works <em>with</em> this nature, not against it.
              Using symbols already dense in LLM training data;<span className="text-emergence/80 font-mono text-sm">●</span> from bullet points,
              <span className="text-emergence/80 font-mono text-sm"> |</span> from config files,
              <span className="text-emergence/80 font-mono text-sm"> ├└</span> from tree structures; we
              trigger pre-trained statistical patterns rather than forcing the model to parse prose.
            </p>
            <p className="text-neutral-500">
              Primary use: <span className="text-cognition/70">agent-to-agent communication</span> where semantic drift and compute waste matter.
              I also use it in conversational flows to amplify my own workflows; articles on that coming soon.
            </p>
          </div>
          
          {/* Meta info + Article link */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex flex-wrap gap-4 text-xs font-mono">
              <span className="text-neutral-600">format: vn_1.0</span>
              <span className="text-neutral-600">semiotic_density: ~3.2x</span>
              <span className="text-neutral-600">meaning_per_token: optimized</span>
            </div>
            <a
              href="https://medium.com/@ariaxhan/latency-logic-why-we-need-a-vector-aligned-syntax-6b7f832603b9"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-3 py-1.5
                rounded border border-data/30 hover:border-data/60
                text-xs font-mono text-data/80 hover:text-data
                hover:bg-data/5 transition-all duration-300
              "
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read the origin story</span>
            </a>
          </div>
        </motion.div>

        {/* Document container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className={`
              absolute -top-12 right-0 flex items-center gap-2
              px-4 py-2 rounded border transition-all duration-300
              ${copied 
                ? "border-cognition/50 bg-cognition/10 text-cognition" 
                : "border-glass-border hover:border-emergence/50 text-neutral-500 hover:text-emergence"
              }
            `}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-xs font-mono">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs font-mono">Copy VN</span>
              </>
            )}
          </button>

          {/* VN Document display */}
          <div 
            className="
              bg-[#0a0814] border border-glass-border rounded-lg
              p-6 lg:p-8 overflow-x-auto
              font-mono text-sm leading-relaxed
            "
          >
            <pre className="whitespace-pre">
              {lines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.01, 1),
                  }}
                  onMouseEnter={() => setHoveredLine(index)}
                  onMouseLeave={() => setHoveredLine(null)}
                  className={`
                    transition-all duration-200 py-0.5 px-2 -mx-2 rounded
                    ${hoveredLine === index ? "bg-emergence/5" : ""}
                    ${line.type === "divider" ? "h-4" : ""}
                  `}
                >
                  {line.type === "divider" ? null : highlightVN(line.text)}
                </motion.div>
              ))}
            </pre>
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              label: "Semiotic Density",
              desc: "Not compression;meaning per token. Like a .zip file for semantics. The model already has the \"unzipped\" definitions.",
              color: "emergence",
            },
            {
              label: "A2A Native",
              desc: "Primary use: agent-to-agent communication. No semantic drift. No compute wasted on pleasantries between machines.",
              color: "cognition",
            },
            {
              label: "Workflow Amplification",
              desc: "I also use VN in my own conversational flows. Dense system prompts, structured handoffs, reusable patterns.",
              color: "memory",
            },
            {
              label: "Training-Aligned",
              desc: "Symbols from config files, math, code. Triggers statistical patterns LLMs already know;information expands in context.",
              color: "data",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`
                p-5 rounded-lg border border-glass-border
                bg-substrate-deep/50
              `}
            >
              <p className={`text-xs font-mono text-${item.color} mb-2`}>
                {item.label.toUpperCase()}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* The insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-6 rounded-lg border border-emergence/20 bg-emergence/5"
        >
          <p className="text-sm text-neutral-300 leading-relaxed">
            <span className="text-emergence font-mono">●insight</span>
            <span className="text-neutral-600 mx-2">|</span>
            The question isn&apos;t &quot;how do we teach AI to understand words like a human?&quot;
            It&apos;s &quot;how do we communicate in a way that works with what they actually are?&quot;
            VN is one answer: selectively remove unnecessary prose, intentionally use symbols
            they already recognize. No code required;just prompting with intention.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://github.com/persist-os/vector-native"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-lg border border-emergence/30
              text-emergence hover:bg-emergence/10 hover:border-emergence/60
              transition-all duration-300
            "
          >
            <span className="text-sm font-mono">View Protocol on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://medium.com/@ariaxhan/latency-logic-why-we-need-a-vector-aligned-syntax-6b7f832603b9"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-lg border border-data/30
              text-data hover:bg-data/10 hover:border-data/60
              transition-all duration-300
            "
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-mono">Read: Latency & Logic</span>
          </a>
        </motion.div>
        
        {/* Coming soon note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 text-center text-xs text-neutral-600 font-mono"
        >
          more articles on conversational VN workflows coming soon
        </motion.p>
      </div>
    </section>
  );
}

