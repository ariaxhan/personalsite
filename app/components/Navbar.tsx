// app/components/Navbar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname !== '/') {
      e.preventDefault();
      window.location.href = `/${href}`;
    }
    // Close mobile menu when clicking a link
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '#about', label: 'about' },
    { href: '#writing', label: 'writing' },
    { href: '#projects', label: 'products' },
    { href: '#contact', label: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
      isScrolled 
        ? 'bg-dark-gray/90 border-b border-gray-700 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center">
        <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wide text-white hover:text-terminal-green transition-colors">
          aria han
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-gray-300 hover:text-terminal-green transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terminal-green transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2" 
          aria-label="Toggle mobile menu"
          onClick={toggleMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-gray/95 border-t border-gray-700 backdrop-blur-md">
          <div className="px-4 sm:px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className="block text-gray-300 hover:text-terminal-green transition-colors duration-300 py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
