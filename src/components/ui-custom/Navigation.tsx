import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PrismaLogo } from '../prisma/PrismaLogo';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/cases', label: 'Case Studies' },
  { path: '/services', label: 'Services' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-prisma-black/80 backdrop-blur-xl border-b border-prisma-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group">
              <PrismaLogo size={40} animated={false} />
              <span className="text-label text-prisma-white/80 group-hover:text-prisma-white transition-colors tracking-[0.2em]">
                SPHEROGRAPHIC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${
                    location.pathname === item.path
                      ? 'text-prisma-white'
                      : 'text-prisma-white/50 hover:text-prisma-white'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-prisma-blue rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="px-6 py-2.5 border border-prisma-white/20 text-sm font-mono uppercase tracking-wider text-prisma-white/80 hover:text-prisma-white hover:border-prisma-blue hover:bg-prisma-blue/5 transition-all duration-300"
              >
                Start Project
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-4">
                <span
                  className={`absolute left-0 w-full h-px bg-prisma-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-prisma-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 w-full h-px bg-prisma-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-prisma-black transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-3xl font-light tracking-tight transition-all duration-500 ${
                location.pathname === item.path
                  ? 'text-prisma-white'
                  : 'text-prisma-white/50'
              } ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
