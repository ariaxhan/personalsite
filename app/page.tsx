// app/page.tsx
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";

// Dynamically import components
const Hero = dynamic(() => import("./components/Hero"), {
  loading: () => <div className="h-screen bg-dark-gray" />, // Placeholder while loading
});

const About = dynamic(() => import("./components/About"), {
  loading: () => <div className="min-h-screen bg-dark-gray" />,
});

const Writing = dynamic(() => import("./components/Writing"), {
  loading: () => <div className="min-h-screen bg-dark-gray" />,
});

const Projects = dynamic(() => import("./components/Projects"), {
  loading: () => <div className="min-h-screen bg-dark-gray" />,
});

const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="min-h-screen bg-dark-gray" />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Writing />
      <Contact />
    </>
  );
}
