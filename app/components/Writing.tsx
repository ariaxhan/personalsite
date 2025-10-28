/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "./Button";

export default function Writing() {
  return (
    <section
      id="writing"
      className="min-h-screen flex flex-col justify-center items-center px-8 py-32 relative overflow-hidden writing-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-code-blue via-accent-purple to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-6xl lg:text-7xl font-bold mb-16 text-white">
          writing
        </h2>
        
        {/* Introduction */}
        <div className="terminal-bg p-8 rounded-lg mb-16">
          <div className=" text-lg text-gray-300 leading-relaxed">
            <p className="mb-4">
              I write about the intersection of technology and humanity, exploring how elegant code 
              can solve complex problems and how poetry can inform our understanding of systems.
            </p>
            <p>
              From technical deep-dives to philosophical musings, my writing bridges the gap 
              between the technical and the human.
            </p>
          </div>
        </div>

        {/* Writing Sections - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Poetry Section */}
          <div>
            <h3 className=" text-poetry-gold text-3xl mb-8">Poetry</h3>
            <div className="bg-gradient-to-r from-dark-gray to-medium-gray p-8 rounded-lg border border-poetry-gold h-full">
              <div className="text-left">
                <h4 className=" text-poetry-gold text-2xl mb-4 italic">
                  Notes on Surviving Eternity
                </h4>
                <p className=" text-sm text-gray-300 leading-relaxed mb-4">
                  This collection of poetry is for anyone who's ever felt the weight of time—the way it bends, 
                  slips, and stretches beyond our control. It's about the pull of eternity and the fragile moments 
                  we try to hold within it. These poems ask what it means to exist in a world where everything is fleeting.
                </p>
                <p className=" text-sm text-gray-300 leading-relaxed mb-6">
                  They explore the tension of free will and fate, the choices we make and the paths we don't take. 
                  They linger in the spaces where memory softens and sharpens time, where love feels eternal even 
                  as it fades, and where questions about the future outnumber the answers.
                </p>
                <div className="space-y-2 mb-6">
                  <div className=" text-xs text-gray-500">
                    <div>Genre: <span className="text-poetry-gold">Contemporary Poetry</span></div>
                    <div>Publisher: <span className="text-code-blue">Self-Published</span></div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    href="https://www.amazon.com/notes-surviving-eternity-Aria-Han-ebook/dp/B0DS3YCKQC" 
                    size="sm"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className=""
                  >
                    Buy on Amazon
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Section */}
          <div>
            <h3 className=" text-code-blue text-3xl mb-8">Technical Writing</h3>
            <div className="code-glow bg-gradient-to-r from-dark-gray to-medium-gray p-8 rounded-lg border border-code-blue h-full">
              <div className="text-left">
                <h4 className=" text-code-blue text-2xl mb-4">Medium Articles</h4>
                <p className=" text-sm text-gray-300 leading-relaxed mb-6">
                  Regular insights into AI development, entrepreneurship, and the art of building 
                  meaningful technology.
                </p>
                <div className="space-y-2 mb-6">
                  <div className=" text-xs text-gray-500">
                    <div>Platform: <span className="text-terminal-green">Medium</span></div>
                    <div>Focus: <span className="text-code-blue">Technical Writing, AI, Entrepreneurship</span></div>
                    <div>Style: <span className="text-poetry-gold">Technical + Philosophical</span></div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button 
                    href="https://medium.com/@ariaxhan" 
                    size="sm"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className=""
                  >
                    Read on Medium
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
