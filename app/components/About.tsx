/* eslint-disable react/no-unescaped-entities */
"use client";

export default function About() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center px-8 py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 via-white to-transparent"></div>
      <div className="max-w-5xl mx-auto text-center animate-fade-in">
        <h2 className="text-6xl lg:text-7xl font-bold mb-10">about me</h2>
        <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl animate-slide-in">
          i'm the ceo and co-founder of brink labs, where we build privacy-first mental health software that leverages ai and biometrics to deliver personalized insights.
          
          <br />     <br />   
          with a passion for creating intuitive, impactful technology, i've led multiple award-winning projects and thrive at the intersection of innovation and user experience.
        </p>
      </div>
    </section>
  );
}
