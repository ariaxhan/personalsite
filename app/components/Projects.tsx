"use client";
import Link from "next/link";

export default function Projects() {
  const hackathonWins = [
    {
      title: "Darwin",
      event: "AWS AI Agents Hackathon",
      year: "2025",
      award: "Winner: Best Use of Semgrep",
      description: "Darwin evolves better tool-writing AI. Models compete to generate tools. Semgrep scans. Weak code dies. Strong code survives.",
      link: "https://devpost.com/software/darwin-cmfysv",
      tech: ["AWS Bedrock", "Semgrep", "AI Evolution", "Security"]
    },
    {
      title: "The Convergence",
      event: "Weavehacks-2 - Self Improving Agents w/ Google Cloud",
      year: "2025",
      award: "Winner: Reinforcement Learning Track",
      description: "Where cutting-edge AI infrastructure meets autonomous learning - agents that improve through experience, collaboration, and evolution. Converted into an open-source package and integrated into HeyContext.",
      link: "https://devpost.com/software/the-convergence",
      tech: ["BrowserBase + Stagehand", "Google ADK", "Tavily", "AG-UI", "Daytona", "Weights & Biases Weave", "Coreweave Reinforcement Learning"]
    },
    {
      title: "Content Creator Connector",
      event: "Multimodal AI Agents",
      year: "2025",
      award: "Winner: Best Use of Agno",
      description: "Enter your company name, and our platform finds the best mid-size content creators, researches your brand, and sends personalized collaboration emails.",
      link: "https://devpost.com/software/content-creator-connector",
      tech: ["Gemini", "Agno", "Weave", "Wordware"]
    },
    {
      title: "TheraVoice",
      event: "Vertical Specific AI Agents Hackathon",
      year: "2024",
      award: "Winner: Best Use of AI/ML API",
      description: "TheraVoice, our AI therapy agent built with aiXplain, takes in user input, processes it using advanced AI and NLP, and delivers a vocalized response through text-to-speech (TTS) technology.",
      link: "https://devpost.com/software/draft_name",
      tech: ["aiXplain", "AI/ML"]
    },
    {
      title: "HotAgents",
      event: "GPT-4o vs. Gemini 1.5 Hackathon",
      year: "2024",
      award: "Winner: Best Use of Wordware",
      description: "Effortlessly trigger agents using hotkeys and simplify your workflow by condensing high-impact LLM use cases into easily repeatable actions.",
      link: "https://github.com/ariaxhan/hotagents",
      tech: ["Wordware", "AgentOps", "Electron"]
    },
    {
      title: "Freetime - AI Social Planner",
      event: "AI Agents 2.0 Hackathon",
      year: "2024",
      award: "Finalist",
      description: "AI-driven social planning tool that coordinates gatherings based on shared interests.",
      link: "https://github.com/ariaxhan/freetime",
      tech: ["Groq", "Supabase", "CrewAI", "JigsawStack"]
    }
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative overflow-hidden projects-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terminal-green via-code-blue to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-12 lg:mb-16 text-white">
          projects
        </h2>
        
        {/* Introduction */}
        <div className="terminal-bg p-4 sm:p-6 lg:p-8 rounded-lg mb-8 sm:mb-12 lg:mb-16">
          <div className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
            <p className="mb-4">
              A comprehensive portfolio spanning hackathon victories, previous ventures, 
              and ongoing projects that showcase technical innovation and entrepreneurial journey.
            </p>
          </div>
			  </div>
			  
        {/* Previous Ventures */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-poetry-gold text-2xl sm:text-3xl mb-6 sm:mb-8">Previous Ventures</h3>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Brink */}
            <div className="poetry-glow bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 lg:p-8 rounded-lg border border-poetry-gold">
              <h4 className="text-poetry-gold text-xl sm:text-2xl mb-3 sm:mb-4">Brink</h4>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                SwiftUI app with seamless Apple Watch integration. Performed advanced LLM analysis of biometric and linguistic data
                and provided structured guidance through intelligent conversation and insights.
              </p>
              <div className="text-xs sm:text-sm text-gray-500">
                <div>Platform: <span className="text-terminal-green">iOS, watchOS</span></div>
                <div>Tech: <span className="text-poetry-gold">SwiftUI, Core ML, HealthKit</span></div>
              </div>
            </div>

            {/* Divertissement AI */}
            <div className="bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 lg:p-8 rounded-lg border border-code-blue">
              <h4 className="text-code-blue text-xl sm:text-2xl mb-3 sm:mb-4">Divertissement AI</h4>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Built HeyContent - dynamic memory layer technology that connected notes, chats,
                Instagram, YouTube, and Gmail for enhanced contextual understanding for content creators.
              </p>
              <div className="text-xs sm:text-sm text-gray-500">
                <div>Focus: <span className="text-terminal-green">Contextual AI, Memory Systems</span></div>
                <div>Outcome: <span className="text-code-blue">Technology integrated into PersistOS</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon Wins */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-terminal-green text-2xl sm:text-3xl mb-6 sm:mb-8">Hackathon Victories</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {hackathonWins.map((achievement, index) => (
              <Link 
                key={index}
                href={achievement.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="code-glow bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 rounded-lg border border-code-blue hover:border-terminal-green transition-all duration-300 h-full">
                  <div className="mb-3 sm:mb-4">
                    <div className="text-xs text-gray-500 mb-2">
                      {achievement.event} • {achievement.year}
                    </div>
                    <h4 className="text-code-blue text-base sm:text-lg font-semibold mb-2 group-hover:text-terminal-green transition-colors">
                      {achievement.title}
                    </h4>
                    <div className="text-terminal-green text-xs sm:text-sm mb-2 sm:mb-3">
                      🏆 {achievement.award}
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {achievement.description}
                    </p>
                  </div>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {achievement.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-accent-purple text-white text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-xs text-terminal-green">
                    View Project →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}