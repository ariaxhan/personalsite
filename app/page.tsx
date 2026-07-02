import Hero from "./components/Hero";
import LivingDesk from "./components/LivingDesk";
import Manifesto from "./components/Manifesto";
import StudioFooter from "./components/StudioFooter";
import Thesis from "./components/Thesis";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Thesis />
      <Manifesto />
      <LivingDesk />
      <StudioFooter />
    </main>
  );
}
