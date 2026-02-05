import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomCursor, LoadingScreen, Navigation } from './components/ui-custom';
import { Home, CaseStudies, Services, Contact } from './pages';

gsap.registerPlugin(ScrollTrigger);

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const page = document.querySelector('.page-content');
    if (!page) return;

    gsap.fromTo(
      page,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [location]);

  return <div className="page-content">{children}</div>;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
    
    // Refresh ScrollTrigger after content is shown
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div 
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Page Content */}
        <main className="relative">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cases" element={<CaseStudies />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </main>

        {/* Footer */}
        <footer className="relative py-16 border-t border-prisma-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Brand */}
              <div className="md:col-span-2">
                <span className="text-2xl font-bold text-prisma-white tracking-tight">SPHEROGRAPHIC™</span>
                <p className="text-prisma-white/50 mt-4 max-w-md leading-relaxed">
                  Visual systems engineering studio especializado em criar experiências digitais 
                  com precisão geométrica e autoridade silenciosa.
                </p>
              </div>

              {/* Links */}
              <div>
                <span className="text-label text-prisma-white/40 block mb-6">Navegação</span>
                <ul className="space-y-3">
                  {[
                    { path: '/', label: 'Home' },
                    { path: '/cases', label: 'Case Studies' },
                    { path: '/services', label: 'Services' },
                    { path: '/contact', label: 'Contact' },
                  ].map((link) => (
                    <li key={link.path}>
                      <a
                        href={link.path}
                        className="text-prisma-white/60 hover:text-prisma-blue transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <span className="text-label text-prisma-white/40 block mb-6">Social</span>
                <ul className="space-y-3">
                  {['LinkedIn', 'Dribbble', 'Behance', 'Twitter'].map((social) => (
                    <li key={social}>
                      <a
                        href="#"
                        className="text-prisma-white/60 hover:text-prisma-blue transition-colors duration-300"
                      >
                        {social}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-prisma-white/10">
              <p className="text-sm text-prisma-white/40">
                © 2024 SPHEROGRAPHIC™ Studio. All rights reserved.
              </p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-prisma-white/40 hover:text-prisma-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-prisma-white/40 hover:text-prisma-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
