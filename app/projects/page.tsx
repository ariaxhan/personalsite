// app/projects/page.tsx
"use client";
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import blossom1 from '../assets/optimized-blossom1.png';
import brinkIcon from '../assets/optimized-brinkicon.png';
import freetimeTexture from '../assets/optimized-freetime.png';
import hotAgentsTexture from '../assets/optimized-hotagents.png';
import itineratorTexture from '../assets/optimized-itineratorimage.png';
import melodyTexture from '../assets/optimized-moodishmelodies.png';
import Navbar from '../components/Navbar';
import cccIcon from '../assets/optimized-cccicon.png';
interface Project {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
}

const PROJECTS = [
  {
    id: 'ccc',
    title: 'Content Creator Connector',
    description: 'A platform that connects content creators with brands and agencies.',
    image: cccIcon,
    link: 'https://devpost.com/software/content-creator-connector'
  },
  {
    id: 'brinklabs',
    title: 'Brink - AI Mental Health App',
    description: 'Privacy-first mental health software integrating AI and biometrics to empower mental well-being.',
    image: brinkIcon,
    link: 'https://brinklabs.xyz/'
  },
  {
    id: 'freetime',
    title: 'Freetime - AI Social Planner',
    description: 'Freetime is an AI-driven social planning tool designed to enhance social connectivity by coordinating small gatherings based on shared interests.',
    image: freetimeTexture,
    link: 'https://github.com/ariaxhan/freetime'
  },
  {
    id: 'itinerator',
    title: 'Itinerator - AI-Powered Travel Planner',
    description: 'Itinerator creates personalized travel itineraries using AI, tailored to user preferences or spontaneous ideas.',
    image: itineratorTexture,
    link: 'https://itinerator.org/'
  },
  {
    id: 'blossom',
    title: 'Blossom - Mental Health Skills App',
    description: 'An app that supports mental health by teaching new skills through a curated catalog and an AI chatbot.',
    image: blossom1,
    link: 'https://github.com/ariaxhan/blossom'
  },
  {
    id: 'hotagents',
    title: 'Hot Agents - AI Productivity Tool',
    description: 'A hotkey-activated AI assistant that automates tasks like content drafting, coding, and proofreading.',
    image: hotAgentsTexture,
    link: 'https://github.com/ariaxhan/hotagents'
  },
  {
    id: 'moodishmelodies',
    title: 'Moodish Melodies - Mood-Based Playlists',
    description: 'Generates Spotify playlists based on mood and tempo using Spotify API integration.',
    image: melodyTexture,
    link: 'https://github.com/ariaxhan/MoodishMelodiesJS'
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link href={project.link} target="_blank" rel="noopener noreferrer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          group 
          relative
          rounded-2xl
          bg-white
          shadow-md
          hover:shadow-lg
          transition-shadow
          duration-300
          ease-out
          transform
          hover:-translate-y-1
          cursor-pointer
          flex
          flex-col
          h-[23rem]  
          overflow-hidden
        "
      >
        {/* IMAGE SECTION with a consistent height so all images match */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* TEXT SECTION grows to fill remaining space */}
        <div className="flex-1 p-6 md:p-8 space-y-4">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-3">
            {project.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default function ProjectsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Original pinkish radial background & spacing remain untouched */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-200 via-white to-transparent animate-slow-pulse"></div>
      <Navbar />
      
      <main className="relative max-w-7xl mx-auto px-4 pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800"
          >
            projects
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed"
          >
            exploring the intersection of AI, design, and human experience
          </motion.p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12"
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.21, 1.11, 0.81, 0.99]
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}