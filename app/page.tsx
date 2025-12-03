import CardCatalogHero from "./components/CardCatalogHero";

export default function Home() {
  return (
    <main className="relative min-h-screen pt-20 lg:pt-0 lg:pl-48 pb-24 lg:pb-8">
      <CardCatalogHero />
      
      {/* Footer */}
      <footer className="relative border-t border-glass-border py-12">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-meta">
              ARIA HAN · SAN FRANCISCO · 2025
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cognition animate-pulse shadow-[0_0_8px_rgba(0,217,255,0.5)]" />
              <p className="text-xs text-neutral-500">
                Architecture over capability
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
