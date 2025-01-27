/* eslint-disable react/no-unescaped-entities */

"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 via-white to-transparent"></div>
      <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight animate-fade-in">
        aria han
      </h1>
      <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl animate-slide-in">
        startup founder and software engineer.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in">
        <Link href="#contact">
          <button className="px-8 py-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 hover:scale-105 transition-transform">
            let's collaborate
          </button>
        </Link>
        <Link href="/projects">
          <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform">
            explore my work
          </button>
        </Link>
      </div>
    </section>
  );
}
