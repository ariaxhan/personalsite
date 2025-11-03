/* eslint-disable react/no-unescaped-entities */
"use client";

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
        
        {/* Main content */}
        <div className="max-w-3xl mx-auto">
          <div className="terminal-bg p-4 sm:p-6 lg:p-8 rounded-lg">
            <div className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed text-left">
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
      </div>
    </section>
  );
}