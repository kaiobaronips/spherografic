import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { GeometricPrism } from '../components/prisma/GeometricPrism';
import { ArrowRight, Layers, Zap, Shield, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(
        heroTitleRef.current?.querySelectorAll('.hero-title-line') || [],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5,
        }
      );

      // Hero subtitle animation
      gsap.fromTo(
        heroTitleRef.current?.querySelector('.hero-subtitle') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 1,
        }
      );

      // About section scroll reveal
      gsap.fromTo(
        aboutTextRef.current?.querySelectorAll('.about-reveal') || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Prism entrance
      gsap.fromTo(
        prismRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Interface section scroll reveal
      const interfaceCards = interfaceRef.current?.querySelectorAll('.interface-card');
      if (interfaceCards) {
        gsap.fromTo(
          interfaceCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: interfaceRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Manifesto section
      gsap.fromTo(
        manifestoRef.current?.querySelectorAll('.manifesto-line') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA section
      gsap.fromTo(
        ctaRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const interfaceCards = [
    {
      icon: Layers,
      title: 'Interface Design',
      description: 'Sistemas de design escaláveis com precisão milimétrica.',
      stat: '240+',
      statLabel: 'Componentes',
    },
    {
      icon: Zap,
      title: 'Motion Systems',
      description: 'Animações que comunicam intenção sem palavras.',
      stat: '60fps',
      statLabel: 'Performance',
    },
    {
      icon: Shield,
      title: 'Design Tokens',
      description: 'Consistência absoluta através de toda a experiência.',
      stat: '100%',
      statLabel: 'Consistência',
    },
    {
      icon: Cpu,
      title: 'AI Integration',
      description: 'Interfaces inteligentes que antecipam necessidades.',
      stat: '3x',
      statLabel: 'Eficiência',
    },
  ];

  return (
    <div ref={heroRef} className="min-h-screen">
      {/* Hero Section - Minimalista com SPHEROGRAPHIC grande */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Content */}
        <div 
          ref={heroTitleRef}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center"
        >
          {/* Main Title */}
          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line text-[clamp(28px,9.5vw,120px)] md:text-[10vw] lg:text-[8vw] font-bold text-prisma-white tracking-tight leading-none">
              SPHEROGRAPHIC™
            </h1>
          </div>

          {/* Subtitle */}
          <div className="hero-subtitle">
            <p className="text-[clamp(9px,2.2vw,13px)] text-prisma-blue tracking-[0.12em] sm:tracking-[0.22em] uppercase leading-none whitespace-nowrap mx-auto">
              VISUAL STUDIO / ENGINEERING SYSTEMS
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-label text-prisma-white/30 tracking-widest">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-prisma-white/30 to-transparent" />
        </div>
      </section>

      {/* About Section - Conteúdo do hero anterior movido para cá */}
      <section ref={aboutRef} className="relative min-h-screen flex items-center overflow-hidden py-32">
        {/* Background grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div ref={aboutTextRef} className="space-y-8">
              <div className="space-y-2">
                <span className="about-reveal text-caption text-prisma-blue block">
                  Design Systems Studio
                </span>
                <h2 className="about-reveal text-display text-prisma-white leading-[1.1]">
                  Precisão
                  <br />
                  <span className="text-prisma-white/40">Geométrica</span>
                </h2>
              </div>

              <p className="about-reveal text-body text-prisma-white/60 max-w-md">
                Criamos sistemas de design que transcendem o visual. 
                Cada pixel, cada movimento, cada interação é calculado 
                com propósito matemático.
              </p>

              <div className="about-reveal flex flex-wrap gap-4">
                <Link
                  to="/cases"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-prisma-blue text-prisma-black text-sm font-mono uppercase tracking-wider hover:bg-prisma-white transition-colors duration-300"
                >
                  Ver Cases
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-prisma-white/20 text-prisma-white text-sm font-mono uppercase tracking-wider hover:border-prisma-blue hover:bg-prisma-blue/5 transition-all duration-300"
                >
                  Serviços
                </Link>
              </div>

              {/* Stats */}
              <div className="about-reveal flex gap-12 pt-8 border-t border-prisma-white/10">
                <div>
                  <span className="text-3xl font-light text-prisma-white">127</span>
                  <p className="text-label text-prisma-white/40 mt-1">Projetos</p>
                </div>
                <div>
                  <span className="text-3xl font-light text-prisma-white">48</span>
                  <p className="text-label text-prisma-white/40 mt-1">Clientes</p>
                </div>
                <div>
                  <span className="text-3xl font-light text-prisma-white">12</span>
                  <p className="text-label text-prisma-white/40 mt-1">Prêmios</p>
                </div>
              </div>
            </div>

            {/* 3D Prism */}
            <div ref={prismRef} className="flex justify-center lg:justify-end">
              <GeometricPrism size={450} />
            </div>
          </div>
        </div>
      </section>

      {/* Interface Section */}
      <section ref={interfaceRef} className="relative py-32 bg-prisma-graphite/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-caption text-prisma-blue block mb-4">Capabilities</span>
            <h2 className="text-headline text-prisma-white max-w-2xl">
              Sistemas que escalam com precisão
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interfaceCards.map((card, index) => (
              <div
                key={index}
                className="interface-card group relative bg-prisma-black/50 border border-prisma-white/10 p-8 hover:border-prisma-blue/30 transition-all duration-500"
              >
                {/* Icon */}
                <div className="mb-6">
                  <card.icon className="w-8 h-8 text-prisma-blue group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-title text-prisma-white mb-3">{card.title}</h3>
                <p className="text-sm text-prisma-white/50 mb-8 leading-relaxed">
                  {card.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-prisma-white/10">
                  <span className="text-2xl font-light text-prisma-white">{card.stat}</span>
                  <p className="text-label text-prisma-white/40 mt-1">{card.statLabel}</p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-prisma-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section ref={manifestoRef} className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="manifesto-line text-caption text-prisma-blue block mb-8">Manifesto</span>
          
          <div className="space-y-6">
            <p className="manifesto-line text-2xl md:text-3xl font-light text-prisma-white leading-relaxed">
              &ldquo;O silêncio visual é a forma mais poderosa de comunicação.&rdquo;
            </p>
            
            <div className="manifesto-line w-16 h-px bg-prisma-blue mx-auto my-12" />
            
            <p className="manifesto-line text-body text-prisma-white/60 max-w-2xl mx-auto">
              Acreditamos que o design excepcional não grita — ele ressoa. 
              Cada elemento que removemos fortalece o que permanece. 
              Cada decisão é guiada pela função, não pela moda.
            </p>
            
            <p className="manifesto-line text-body text-prisma-white/60 max-w-2xl mx-auto">
              Não criamos interfaces. Criamos sistemas de pensamento 
              visual que transformam complexidade em clareza.
            </p>
          </div>

          <div className="manifesto-line mt-16">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 text-prisma-blue hover:text-prisma-white transition-colors duration-300"
            >
              <span className="text-sm font-mono uppercase tracking-wider">Nossa Metodologia</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-32 bg-prisma-graphite/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-headline text-prisma-white mb-6">
            Pronto para transformar sua visão em sistema?
          </h2>
          <p className="text-body text-prisma-white/60 mb-12 max-w-xl mx-auto">
            Vamos discutir como podemos criar uma experiência digital 
            que comunica autoridade através do silêncio visual.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-prisma-blue text-prisma-black text-sm font-mono uppercase tracking-wider hover:bg-prisma-white transition-colors duration-300"
            >
              Iniciar Conversa
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-prisma-white/10 to-transparent hidden lg:block" />
        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-prisma-white/10 to-transparent hidden lg:block" />
      </section>
    </div>
  );
}
