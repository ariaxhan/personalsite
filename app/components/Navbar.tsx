// app/components/Navbar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === '/projects') {
      e.preventDefault();
      window.location.href = '/#contact';
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">aria han</Link>
        <div className="space-x-8">
          <Link href="/">home</Link>
          <Link href="/projects">projects</Link>
          <Link href="#contact" onClick={handleContactClick}>contact</Link>
        </div>
      </div>
    </nav>
  );
}
