/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "./Button";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative overflow-hidden about-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-terminal-green via-code-blue to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 sm:mb-12 lg:mb-16 text-white">
          about me
        </h2>
        
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left side - Personal story */}
          <div className="text-left space-y-6 sm:space-y-8">
            <div className="terminal-bg p-4 sm:p-6 lg:p-8 rounded-lg">
              <div className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                <p className="mb-4">
                  I'm the CEO and co-founder of <span className="text-code-blue font-semibold">PersistOS</span>, 
                  where we're exploring the intersection of AI and human cognition.
                </p>
                <p className="mb-4">
                  I specialize in creating elegant, high-performance applications that bridge 
                  the gap between complex AI systems and intuitive user experiences.
                </p>
                <p>
                  When I'm not coding, I write, because the best solutions 
                  come from understanding both logic and emotion.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Company highlights */}
          <div className="space-y-6 sm:space-y-8">
            {/* heycontext.co */}
            <div className="code-glow bg-gradient-to-r from-dark-gray to-medium-gray p-4 sm:p-6 lg:p-8 rounded-lg border border-code-blue">
              <h3 className="text-code-blue text-xl sm:text-2xl mb-3 sm:mb-4">heycontext.co</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                An AI-powered memory and intelligence platform that creates persistent, evolving AI understanding of users through sophisticated content processing and psychological insight generation. Unlike ChatGPT or Claude which offer static memory, HeyContext builds dynamic, evolving AI understanding that grows with every interaction.
              </p>
              <div className="text-gray-300 mb-3 sm:mb-4 space-y-2 text-xs sm:text-sm">
                <p><strong>Core Features:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Thinking Lab:</strong> Context-aware conversations with persistent memory</li>
                  <li><strong>Crystal Intelligence:</strong> AI extracts psychological insights from user content</li>
                  <li><strong>Living Projects:</strong> Dynamic projects that evolve with AI-powered widgets</li>
                  <li><strong>Smart Notes:</strong> AI-enhanced note-taking with rich text editing</li>
                </ul>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                <div>Status: <span className="text-terminal-green">In Development</span></div>
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
              <h3 className="text-accent-purple text-xl sm:text-2xl mb-3 sm:mb-4">The Convergence</h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                Open-source package that bridges different AI models and frameworks. 
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
      </div>
    </section>
  );
}