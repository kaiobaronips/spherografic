import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '01',
    title: 'Nexus Banking',
    client: 'Nexus Financial',
    category: 'Fintech',
    year: '2024',
    description: 'Sistema de design completo para plataforma bancária digital, reduzindo tempo de desenvolvimento em 40%.',
    tags: ['Design System', 'UI/UX', 'Motion'],
    color: '#3C4FFF',
  },
  {
    id: '02',
    title: 'Quantum AI',
    client: 'Quantum Labs',
    category: 'Inteligência Artificial',
    year: '2024',
    description: 'Interface para plataforma de machine learning, tornando dados complexos acessíveis.',
    tags: ['Data Viz', 'Dashboard', 'AI'],
    color: '#6366F1',
  },
  {
    id: '03',
    title: 'Aether Cloud',
    client: 'Aether Systems',
    category: 'Cloud Infrastructure',
    year: '2023',
    description: 'Redesign de plataforma de gerenciamento de infraestrutura cloud enterprise.',
    tags: ['Enterprise', 'SaaS', 'B2B'],
    color: '#8B5CF6',
  },
  {
    id: '04',
    title: 'Prism Health',
    client: 'Prism Medical',
    category: 'Healthcare',
    year: '2023',
    description: 'Aplicação de telemedicina com foco em acessibilidade e usabilidade.',
    tags: ['Healthcare', 'Mobile', 'A11y'],
    color: '#EC4899',
  },
  {
    id: '05',
    title: 'Vertex Commerce',
    client: 'Vertex Retail',
    category: 'E-commerce',
    year: '2023',
    description: 'Experiência de checkout omnichannel com conversão aumentada em 28%.',
    tags: ['E-commerce', 'Conversion', 'UX'],
    color: '#F59E0B',
  },
  {
    id: '06',
    title: 'Orbit Analytics',
    client: 'Orbit Data',
    category: 'Analytics',
    year: '2022',
    description: 'Plataforma de análise de dados em tempo real para empresas Fortune 500.',
    tags: ['Analytics', 'Enterprise', 'Data'],
    color: '#10B981',
  },
];

export function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.querySelectorAll('.header-reveal') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      // Grid cards animation
      const cards = gridRef.current?.querySelectorAll('.case-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="header-reveal text-caption text-prisma-blue block mb-4">
              Selected Work
            </span>
            <h1 className="header-reveal text-display text-prisma-white">
              Case Studies
            </h1>
          </div>
          
          <div className="header-reveal flex items-center gap-8">
            <div>
              <span className="text-3xl font-light text-prisma-white">{caseStudies.length}</span>
              <p className="text-label text-prisma-white/40 mt-1">Projetos</p>
            </div>
            <div className="w-px h-12 bg-prisma-white/10" />
            <div>
              <span className="text-3xl font-light text-prisma-white">4</span>
              <p className="text-label text-prisma-white/40 mt-1">Indústrias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className="case-card group relative"
              onMouseEnter={() => setHoveredId(study.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-prisma-graphite/50 border border-prisma-white/10 overflow-hidden transition-all duration-500 hover:border-prisma-blue/30">
                {/* Card Header */}
                <div className="relative h-48 overflow-hidden">
                  {/* Abstract geometric background */}
                  <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundColor: study.color + '15' }}
                  >
                    <svg
                      className="absolute inset-0 w-full h-full opacity-30"
                      viewBox="0 0 400 200"
                      preserveAspectRatio="none"
                    >
                      {/* Geometric pattern */}
                      <defs>
                        <pattern
                          id={`pattern-${study.id}`}
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <polygon
                            points="20,5 35,35 5,35"
                            fill="none"
                            stroke={study.color}
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-${study.id})`} />
                      
                      {/* Accent shapes */}
                      <circle
                        cx="80%"
                        cy="30%"
                        r="40"
                        fill="none"
                        stroke={study.color}
                        strokeWidth="1"
                        opacity="0.2"
                      />
                      <polygon
                        points="50,150 100,50 150,150"
                        fill="none"
                        stroke={study.color}
                        strokeWidth="1"
                        opacity="0.15"
                      />
                    </svg>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 text-xs font-mono uppercase tracking-wider"
                      style={{ 
                        backgroundColor: study.color + '20',
                        color: study.color,
                      }}
                    >
                      {study.category}
                    </span>
                  </div>

                  {/* Year */}
                  <div className="absolute top-4 right-4">
                    <span className="text-label text-prisma-white/40">{study.year}</span>
                  </div>

                  {/* Hover overlay */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-t from-prisma-black via-transparent to-transparent transition-opacity duration-500 ${
                      hoveredId === study.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {/* ID and Title */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-label text-prisma-white/30 block mb-2">
                        {study.client}
                      </span>
                      <h3 className="text-xl font-medium text-prisma-white group-hover:text-prisma-blue transition-colors duration-300">
                        {study.title}
                      </h3>
                    </div>
                    <div 
                      className={`flex-shrink-0 w-10 h-10 border border-prisma-white/20 flex items-center justify-center transition-all duration-300 ${
                        hoveredId === study.id 
                          ? 'border-prisma-blue bg-prisma-blue/10' 
                          : ''
                      }`}
                    >
                      <ArrowUpRight 
                        className={`w-5 h-5 transition-all duration-300 ${
                          hoveredId === study.id 
                            ? 'text-prisma-blue translate-x-0.5 -translate-y-0.5' 
                            : 'text-prisma-white/40'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-prisma-white/50 leading-relaxed mb-6">
                    {study.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-mono text-prisma-white/40 border border-prisma-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress indicator on hover */}
                <div 
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-700 ease-out ${
                    hoveredId === study.id ? 'w-full' : 'w-0'
                  }`}
                  style={{ backgroundColor: study.color }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20">
        <div className="flex items-center justify-between py-8 border-t border-prisma-white/10">
          <p className="text-prisma-white/40">
            Interessado em ver mais trabalhos?
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-prisma-blue hover:text-prisma-white transition-colors duration-300"
          >
            <span className="text-sm font-mono uppercase tracking-wider">Ver Portfólio Completo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
