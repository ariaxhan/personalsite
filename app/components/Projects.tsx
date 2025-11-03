"use client";
import Button from "./Button";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative overflow-hidden projects-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terminal-green via-code-blue to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-12 lg:mb-16 text-white">
          products
        </h2>
        
        {/* Introduction */}
        <div className="terminal-bg p-4 sm:p-6 lg:p-8 rounded-lg mb-8 sm:mb-12 lg:mb-16">
          <div className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
            <p className="mb-4">
              A comprehensive portfolio spanning previous ventures 
              and full-fledged products that showcase technical innovation and entrepreneurial journey.
            </p>
          </div>
			  </div>
			  
        {/* Current Products */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h3 className="text-code-blue text-2xl sm:text-3xl mb-6 sm:mb-8">Current Products</h3>
          <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
            {/* heycontext.co */}
            <div className="code-glow bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 lg:p-8 rounded-lg border border-code-blue">
              <h4 className="text-code-blue text-xl sm:text-2xl mb-3 sm:mb-4">heycontext.co</h4>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                An AI-powered memory and intelligence platform that creates persistent, evolving AI understanding of users through sophisticated content processing and psychological insight generation. Unlike ChatGPT or Claude which offer static memory, HeyContext builds dynamic, evolving AI understanding that grows with every interaction.
              </p>
              <div className="text-gray-300 mb-3 sm:mb-4 space-y-2 text-xs sm:text-sm">
                <p><strong>Core Features:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Thinking Lab:</strong> Context-aware conversations with persistent memory</li>
                  <li><strong>Crystal Intelligence:</strong> AI extracts psychological insights from user content</li>
                  <li><strong>Living Projects:</strong> Dynamic products that evolve with AI-powered widgets</li>
                  <li><strong>Smart Notes:</strong> AI-enhanced note-taking with rich text editing</li>
                </ul>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                <div>Status: <span className="text-terminal-green">Actively being developed while open for Beta Testing, free tier available</span></div>
                <div>Tech: <span className="text-code-blue">AI, Memory Systems, Multi-Platform Integration</span></div>
              </div>
              <div className="flex gap-2 sm:gap-4 justify-center mt-4 sm:mt-6">
                <Button 
                  href="https://heycontext.co" 
                  size="sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className=""
                >
                  Visit Website
                </Button>
              </div>
            </div>

            {/* The Convergence */}
            <div className="bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 lg:p-8 rounded-lg border border-accent-purple">
              <h4 className="text-accent-purple text-xl sm:text-2xl mb-3 sm:mb-4">The Convergence</h4>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Open-source package that solves the learning problem for AI tool usage via evolution and reinforcement learning. 
                Available now on GitHub and PyPI.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                <Button 
                  href="https://github.com/persist-os/the-convergence" 
                  size="sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className=""
                >
                  View on GitHub
                </Button>
                <Button 
                  href="https://pypi.org/project/the-convergence/" 
                  size="sm"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className=""
                >
                  PyPI Package
                </Button>
              </div>
            </div>
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
      </div>
    </section>
  );
}