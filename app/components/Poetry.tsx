"use client";
import Button from "./Button";

export default function Poetry() {
  return (
    <section
      id="poetry"
      className="min-h-screen flex flex-col justify-center items-center px-8 py-32 relative overflow-hidden writing-bg"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-poetry-gold via-accent-purple to-transparent"></div>
      
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-6xl lg:text-7xl font-bold mb-16 text-white">
          poetry
        </h2>
        
        {/* Book showcase */}
        <div className="bg-gradient-to-r from-dark-gray to-medium-gray p-12 rounded-lg border border-poetry-gold mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Book info */}
            <div className="text-left">
              <h3 className=" text-poetry-gold text-3xl mb-6 italic">
                Notes on Surviving Eternity
              </h3>
              <p className=" text-lg text-gray-300 leading-relaxed mb-8">
                A collection of poems exploring the intersection of technology, 
                humanity, and the eternal questions that define our digital age.
              </p>
              <div className="space-y-4 mb-8">
                <div className=" text-sm text-gray-500">
                  <div>Genre: <span className="text-poetry-gold">Contemporary Poetry</span></div>
                  <div>Publisher: <span className="text-code-blue">Self-Published</span></div>
                  <div>Pages: <span className="text-terminal-green">120</span></div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  href="https://www.amazon.com/notes-surviving-eternity-Aria-Han-ebook/dp/B0DS3YCKQC" 
                  size="lg"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className=""
                >
                  Buy on Amazon
                </Button>
              </div>
            </div>
            
            {/* Book cover placeholder */}
            <div className="flex justify-center">
              <div className="w-64 h-80 bg-gradient-to-b from-poetry-gold to-accent-purple rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-black">
                  <div className=" text-xl font-bold mb-2">Notes on</div>
                  <div className=" text-xl font-bold mb-2">Surviving</div>
                  <div className=" text-xl font-bold mb-4">Eternity</div>
                  <div className=" text-sm">by aria han</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample poem */}
        <div className="terminal-bg p-8 rounded-lg">
          <h3 className=" text-code-blue text-xl mb-4">Binary Dreams</h3>
          <div className=" text-gray-300 text-lg leading-relaxed">
            <p className="mb-4">
              In the space between<br />
              zero and one,<br />
              between silence and sound,<br />
              between what is and what could be—
            </p>
            <p className="mb-4">
              there lives a dream<br />
              that speaks in code<br />
              but dreams in verse.
            </p>
            <p className="text-sm  text-gray-500 italic">
              from Notes on Surviving Eternity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}