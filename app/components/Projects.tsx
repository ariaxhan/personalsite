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
      link: "https://devpost.com/software/darwin",
      tech: ["AI", "Machine Learning", "Code Evolution"]
    },
    {
      title: "The Convergence",
      event: "Weavehacks-2 - Self Improving Agents w/ Google Cloud",
      year: "2025",
      award: "Winner: Reinforcement Learning Track",
      description: "Where cutting-edge AI infrastructure meets autonomous learning - agents that improve through experience, collaboration, and evolution.",
      link: "https://devpost.com/software/the-convergence",
      tech: ["AI Infrastructure", "Autonomous Learning", "Agent Systems"]
    },
    {
      title: "Content Creator Connector",
      event: "Multimodal AI Agents",
      year: "2025",
      award: "Winner: Best Use of Agno",
      description: "Enter your company name, and our platform finds the best mid-size content creators, researches your brand, and sends personalized collaboration emails.",
      link: "https://devpost.com/software/content-creator-connector",
      tech: ["Gemini", "Agno", "Weave", "AI Integration"]
    },
    {
      title: "TheraVoice",
      event: "Vertical Specific AI Agents Hackathon",
      year: "2024",
      award: "Winner: Best Use of AI/ML API",
      description: "TheraVoice is an AI therapist that analyzes user input and gives real-time, vocal responses, offering personalized mental health support.",
      link: "https://devpost.com/software/draft_name",
      tech: ["AI", "Voice Technology", "Mental Health"]
    },
    {
      title: "HotAgents",
      event: "GPT-4o vs. Gemini 1.5 Hackathon",
      year: "2024",
      award: "Winner: Best Use of Wordware",
      description: "Effortlessly trigger agents using hotkeys and simplify your workflow by condensing high-impact LLM use cases into easily repeatable actions.",
      link: "https://github.com/ariaxhan/hotagents",
      tech: ["AI Integration", "Keyboard Shortcuts", "Productivity"]
    },
    {
      title: "Freetime - AI Social Planner",
      event: "AI Agents 2.0 Hackathon",
      year: "2024",
      award: "Finalist",
      description: "AI-driven social planning tool that coordinates gatherings based on shared interests.",
      link: "https://github.com/ariaxhan/freetime",
      tech: ["Machine Learning", "Python", "Social Graph"]
    }
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-8 py-32 relative overflow-hidden projects-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terminal-green via-code-blue to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-6xl lg:text-7xl font-bold mb-16 text-white">
          projects
        </h2>
        
        {/* Introduction */}
        <div className="terminal-bg p-8 rounded-lg mb-16">
          <div className="text-lg text-gray-300 leading-relaxed">
            <p className="mb-4">
              A comprehensive portfolio spanning hackathon victories, previous ventures, 
              and ongoing projects that showcase technical innovation and entrepreneurial journey.
            </p>
          </div>
			  </div>
			  
        {/* Previous Ventures */}
        <div className="mb-16">
          <h3 className=" text-poetry-gold text-3xl mb-8">Previous Ventures</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Brink */}
            <div className="poetry-glow bg-gradient-to-r from-dark-gray to-medium-gray p-8 rounded-lg border border-poetry-gold">
              <h4 className=" text-poetry-gold text-2xl mb-4">Brink</h4>
              <p className="text-gray-300 mb-4">
                SwiftUI app with seamless Apple Watch integration. Performed advanced LLM analysis 
                and provided structured guidance through intelligent conversation.
              </p>
              <div className="text-sm text-gray-500">
                <div>Platform: <span className="text-terminal-green">iOS, watchOS</span></div>
                <div>Tech: <span className="text-poetry-gold">SwiftUI, Core ML, HealthKit</span></div>
              </div>
            </div>

            {/* Divertissement AI */}
            <div className="bg-gradient-to-r from-dark-gray to-medium-gray p-8 rounded-lg border border-code-blue">
              <h4 className=" text-code-blue text-2xl mb-4">Divertissement AI</h4>
              <p className="text-gray-300 mb-4">
                Built heycontent - dynamic memory layer technology that connected notes, chats, 
                Instagram, YouTube, and Gmail for enhanced contextual understanding.
              </p>
              <div className="text-sm text-gray-500">
                <div>Focus: <span className="text-terminal-green">Contextual AI, Memory Systems</span></div>
                <div>Outcome: <span className="text-code-blue">Technology integrated into Persistos</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon Wins */}
        <div className="mb-16">
          <h3 className=" text-terminal-green text-3xl mb-8">Hackathon Victories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathonWins.map((achievement, index) => (
              <Link 
                key={index}
                href={achievement.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="code-glow bg-gradient-to-r from-dark-gray to-medium-gray p-6 rounded-lg border border-code-blue hover:border-terminal-green transition-all duration-300 h-full">
                  <div className="mb-4">
                    <div className=" text-xs text-gray-500 mb-2">
                      {achievement.event} • {achievement.year}
                    </div>
                    <h4 className=" text-code-blue text-lg font-semibold mb-2 group-hover:text-terminal-green transition-colors">
                      {achievement.title}
                    </h4>
                    <div className=" text-terminal-green text-sm mb-3">
                      🏆 {achievement.award}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {achievement.description}
                    </p>
                  </div>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {achievement.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-accent-purple text-white text-xs  rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className=" text-xs text-terminal-green">
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
