/* eslint-disable react/no-unescaped-entities */
"use client";
import dynamic from 'next/dynamic';

// Dynamically import icons
const FaEnvelope = dynamic(() => import('react-icons/fa').then(mod => mod.FaEnvelope), { ssr: false });
const FaLinkedin = dynamic(() => import('react-icons/fa').then(mod => mod.FaLinkedin), { ssr: false });
const FaTwitter = dynamic(() => import('react-icons/fa').then(mod => mod.FaTwitter), { ssr: false });
const FaInstagram = dynamic(() => import('react-icons/fa').then(mod => mod.FaInstagram), { ssr: false });

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-8 py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 via-white to-transparent"></div>
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h2 className="text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight animate-fade-in">get in touch</h2>
        <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl animate-slide-in">
          interested in collaborating, investing, or learning more about my work? let's connect.
        </p>
        <br/> <br/>
        <div className="flex justify-center gap-8">
          <a href="mailto:aria@brinklabs.xyz" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-transform hover:scale-110">
            <FaEnvelope size={36} />
          </a>
          <a href="https://www.linkedin.com/in/ariahan/" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-transform hover:scale-110">
            <FaLinkedin size={36} />
          </a>
          <a href="https://twitter.com/aria__han" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-transform hover:scale-110">
            <FaTwitter size={36} />
          </a>
          <a href="https://instagram.com/ariaxhan" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-transform hover:scale-110">
            <FaInstagram size={36} />
          </a>
        </div>
      </div>
    </section>
  );
}
