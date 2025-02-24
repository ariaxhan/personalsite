// app/page.tsx
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";

// Dynamically import components
const Hero = dynamic(() => import("./components/Hero"), {
  loading: () => <div className="h-screen" />, // Placeholder while loading
});


const Contact = dynamic(() => import("./components/Contact"), {
  loading: () => <div className="min-h-screen" />,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Contact />
    </>
  );
}
