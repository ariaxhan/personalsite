/* eslint-disable react/no-unescaped-entities */
"use client";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center px-8 text-center relative overflow-hidden hero-bg">
      {/* Terminal-style background elements */}
      <div className="absolute top-10 left-10  text-xs text-gray-500 opacity-30">
        <div className="text-terminal-green">aria han</div>
      </div>
      

      {/* Main content */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl lg:text-8xl font-extrabold text-white leading-tight animate-fade-in mb-8">
          aria han
        </h1>
        
        {/* Professional title */}
        <div className="mb-8">
          <div className=" text-2xl lg:text-3xl">
            CEO & Co-Founder, Persistos
          </div>
        </div>

        {/* Professional subtitle */}
        <div className=" text-xl lg:text-2xl text-gray-300 mb-12 animate-fade-in">
          Building AI for humans
        </div>


      </div>
    </section>
  );
}
