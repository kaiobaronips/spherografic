import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PrismaLogo } from '../prisma/PrismaLogo';
import gsap from 'gsap';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home' },
  { path: '/cases', label: 'Case Studies' },
  { path: '/services', label: 'Services' },
];

// Hook personalizado para detectar scroll
function useScrollThreshold(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Verificar estado inicial no próximo frame para evitar hidratação
    requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

// Hook para bloquear scroll do body
function useLockBodyScroll(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}

// Componente do indicador ativo
const ActiveIndicator: React.FC = () => (
  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-prisma-blue rounded-full" aria-hidden="true" />
);

export function Navigation(): React.ReactElement {
  const [mobileMenuState, setMobileMenuState] = useState({
    open: false,
    pathname: '',
  });
  const location = useLocation();
  const isMobileMenuOpen =
    mobileMenuState.open && mobileMenuState.pathname === location.pathname;
  const isScrolled = useScrollThreshold(50);
  
  // Refs para animações GSAP
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileCtaRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Bloquear scroll quando menu mobile está aberto
  useLockBodyScroll(isMobileMenuOpen);

  // Fechar menu com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setMobileMenuState({ open: false, pathname: location.pathname });
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, location.pathname]);

  // Foco trap no menu mobile
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    // Focar no primeiro link quando abrir
    const focusTimeout = window.setTimeout(() => firstElement?.focus(), 100);

    menu.addEventListener('keydown', handleTabKey);
    return () => {
      window.clearTimeout(focusTimeout);
      menu.removeEventListener('keydown', handleTabKey);
    };
  }, [isMobileMenuOpen]);

  // Animações GSAP do menu mobile
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      // Animação de entrada
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      // Animação dos links
      gsap.fromTo(
        mobileLinksRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: 0.1, 
          ease: 'power2.out',
          delay: 0.1 
        }
      );

      // Animação do CTA
      if (mobileCtaRef.current) {
        gsap.fromTo(
          mobileCtaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.4 }
        );
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuState(prev => {
      const isOpenOnCurrentPath =
        prev.open && prev.pathname === location.pathname;

      return {
        open: !isOpenOnCurrentPath,
        pathname: location.pathname,
      };
    });
  }, [location.pathname]);

  const handleMobileLinkClick = useCallback(() => {
    setMobileMenuState({ open: false, pathname: location.pathname });
  }, [location.pathname]);

  const navLinkClasses = useCallback((path: string) => {
    const isActive = location.pathname === path;
    return `relative px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors duration-300 ${
      isActive
        ? 'text-prisma-white'
        : 'text-prisma-white/50 hover:text-prisma-white focus:text-prisma-white focus:outline-none focus:ring-2 focus:ring-prisma-blue/50 rounded'
    }`;
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-prisma-black/80 backdrop-blur-xl border-b border-prisma-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 sm:gap-4 group focus:outline-none focus:ring-2 focus:ring-prisma-blue/50 rounded-lg p-1"
              aria-label="Spherographic Home"
            >
              <PrismaLogo
                size={32}
                animated={false}
                className="origin-left sm:scale-[1.1] md:scale-[1.25]"
              />
              <span className="text-[10px] sm:text-[11px] md:text-label text-prisma-white/80 group-hover:text-prisma-white transition-colors tracking-[0.18em] sm:tracking-[0.2em] leading-tight max-w-[10rem] sm:max-w-none whitespace-normal">
                SPHEROGRAPHIC™
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={navLinkClasses(item.path)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                  {location.pathname === item.path && <ActiveIndicator />}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                to="/contact"
                className="px-6 py-2.5 border border-prisma-white/20 text-sm font-mono uppercase tracking-wider text-prisma-white/80 hover:text-prisma-white hover:border-prisma-blue hover:bg-prisma-blue/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-prisma-blue/50"
              >
                Start Project
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-prisma-blue/50 rounded"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-haspopup="dialog"
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-4">
                <span
                  className={`absolute left-0 w-full h-px bg-prisma-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-prisma-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute left-0 w-full h-px bg-prisma-white transition-all duration-300 ${
                    isMobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-prisma-black md:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto'
            : 'pointer-events-none opacity-0'
        }`}
        hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              ref={el => { mobileLinksRef.current[index] = el; }}
              to={item.path}
              onClick={handleMobileLinkClick}
              className={`text-3xl font-light tracking-tight transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-prisma-blue/50 rounded px-4 py-2 ${
                location.pathname === item.path
                  ? 'text-prisma-white'
                  : 'text-prisma-white/50 hover:text-prisma-white'
              }`}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div
          ref={mobileCtaRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link
            to="/contact"
            onClick={handleMobileLinkClick}
            className="relative inline-flex items-center justify-center border border-prisma-blue/90 bg-prisma-blue px-12 py-5 text-sm font-mono uppercase tracking-[0.2em] text-prisma-black transition-colors duration-300 hover:bg-prisma-blue/90 focus:outline-none focus:ring-2 focus:ring-prisma-blue focus:ring-offset-2 focus:ring-offset-prisma-black w-full max-w-[280px]"
          >
            START PROJECT
          </Link>
        </div>
      </div>
    </>
  );
}

export default React.memo(Navigation);
