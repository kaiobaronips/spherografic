import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Layers, 
  Zap, 
  Palette, 
  Code, 
  LineChart, 
  Users,
  ArrowRight,
  Check,
  ChevronDown
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
}

const services: Service[] = [
  {
    id: '01',
    icon: Layers,
    title: 'Design Systems',
    description: 'Criamos sistemas de design escaláveis que garantem consistência visual e reduzem tempo de desenvolvimento.',
    deliverables: [
      'Component library',
      'Design tokens',
      'Documentation',
      'Figma/Sketch files',
      'Code implementation',
    ],
    timeline: '8-12 semanas',
  },
  {
    id: '02',
    icon: Zap,
    title: 'Motion Design',
    description: 'Animações intencionais que guiam usuários, comunicam estado e elevam a experiência digital.',
    deliverables: [
      'Motion guidelines',
      'Micro-interactions',
      'Page transitions',
      'Lottie animations',
      'Performance audit',
    ],
    timeline: '4-8 semanas',
  },
  {
    id: '03',
    icon: Palette,
    title: 'Visual Identity',
    description: 'Identidades visuais que comunicam autoridade e diferenciam sua marca no mercado.',
    deliverables: [
      'Logo design',
      'Color system',
      'Typography',
      'Brand guidelines',
      'Asset library',
    ],
    timeline: '6-10 semanas',
  },
  {
    id: '04',
    icon: Code,
    title: 'Frontend Development',
    description: 'Implementação pixel-perfect de interfaces com foco em performance e acessibilidade.',
    deliverables: [
      'React/Vue components',
      'Responsive layouts',
      'Animation implementation',
      'Accessibility audit',
      'Code review',
    ],
    timeline: 'Por sprint',
  },
  {
    id: '05',
    icon: LineChart,
    title: 'UX Research',
    description: 'Descobrimos insights profundos sobre seus usuários para tomar decisões baseadas em dados.',
    deliverables: [
      'User interviews',
      'Usability testing',
      'Journey mapping',
      'Competitive analysis',
      'Recommendations',
    ],
    timeline: '2-4 semanas',
  },
  {
    id: '06',
    icon: Users,
    title: 'Design Workshops',
    description: 'Sessões colaborativas para alinhar equipes e acelerar decisões de design.',
    deliverables: [
      'Workshop facilitation',
      'Design sprints',
      'Stakeholder alignment',
      'Priority mapping',
      'Action plans',
    ],
    timeline: '1-3 dias',
  },
];

const capabilities = [
  { category: 'Design', items: ['UI Design', 'UX Design', 'Design Systems', 'Motion Design', 'Visual Identity'] },
  { category: 'Development', items: ['React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'] },
  { category: 'Tools', items: ['Figma', 'Sketch', 'Principle', 'After Effects', 'Lottie'] },
  { category: 'Process', items: ['Agile', 'Design Sprints', 'User Research', 'A/B Testing', 'Analytics'] },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

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

      // Services accordion animation
      const serviceItems = servicesRef.current?.querySelectorAll('.service-item');
      if (serviceItems) {
        gsap.fromTo(
          serviceItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Capabilities animation
      const capabilityItems = capabilitiesRef.current?.querySelectorAll('.capability-item');
      if (capabilityItems) {
        gsap.fromTo(
          capabilityItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: capabilitiesRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className="header-reveal text-caption text-prisma-blue block mb-4">
              What We Do
            </span>
            <h1 className="header-reveal text-display text-prisma-white">
              Services
            </h1>
          </div>
          
          <div>
            <p className="header-reveal text-body text-prisma-white/60">
              Oferecemos um conjunto completo de serviços de design e desenvolvimento, 
              todos executados com a mesma precisão geométrica que define nossa marca.
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div ref={servicesRef} className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="border-t border-prisma-white/10">
          {services.map((service) => {
            const isExpanded = expandedService === service.id;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="service-item border-b border-prisma-white/10"
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full py-8 flex items-center gap-8 group"
                >
                  {/* Number */}
                  <span className="text-label text-prisma-white/30 w-8">
                    {service.id}
                  </span>

                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 border border-prisma-white/20 flex items-center justify-center transition-all duration-300 ${
                    isExpanded ? 'border-prisma-blue bg-prisma-blue/10' : 'group-hover:border-prisma-blue/50'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${
                      isExpanded ? 'text-prisma-blue' : 'text-prisma-white/60 group-hover:text-prisma-blue'
                    }`} />
                  </div>

                  {/* Title */}
                  <h3 className={`flex-1 text-left text-2xl font-light transition-colors duration-300 ${
                    isExpanded ? 'text-prisma-blue' : 'text-prisma-white group-hover:text-prisma-blue'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Timeline */}
                  <span className="hidden md:block text-label text-prisma-white/40">
                    {service.timeline}
                  </span>

                  {/* Toggle icon */}
                  <ChevronDown className={`w-5 h-5 text-prisma-white/40 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180 text-prisma-blue' : ''
                  }`} />
                </button>

                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pb-8 pl-28 pr-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Description */}
                      <div>
                        <p className="text-prisma-white/60 leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-prisma-blue hover:text-prisma-white transition-colors duration-300"
                        >
                          <span className="text-sm font-mono uppercase tracking-wider">Solicitar proposta</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h4 className="text-label text-prisma-white/40 mb-4">Deliverables</h4>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-prisma-white/70">
                              <Check className="w-4 h-4 text-prisma-blue flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capabilities Grid */}
      <div ref={capabilitiesRef} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-caption text-prisma-blue block mb-4">Capabilities</span>
          <h2 className="text-headline text-prisma-white">
            Nosso Arsenal
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="capability-item bg-prisma-graphite/30 border border-prisma-white/10 p-6 hover:border-prisma-blue/30 transition-all duration-300"
            >
              <h3 className="text-label text-prisma-white/40 mb-6">{cap.category}</h3>
              <ul className="space-y-3">
                {cap.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-prisma-white/70 text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-caption text-prisma-blue block mb-4">Process</span>
            <h2 className="text-headline text-prisma-white mb-6">
              Como Trabalhamos
            </h2>
            <p className="text-body text-prisma-white/60 mb-8">
              Nosso processo é projetado para entregar resultados excepcionais 
              de forma consistente e previsível.
            </p>
            
            <div className="space-y-6">
              {[
                { step: '01', title: 'Discovery', desc: 'Entendemos seu negócio, usuários e objetivos.' },
                { step: '02', title: 'Strategy', desc: 'Definimos a abordagem e criamos o roadmap.' },
                { step: '03', title: 'Design', desc: 'Criamos soluções visuais e interativas.' },
                { step: '04', title: 'Deliver', desc: 'Implementamos e iteramos baseado em feedback.' },
              ].map((phase, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-label text-prisma-blue">{phase.step}</span>
                  <div>
                    <h4 className="text-prisma-white font-medium mb-1">{phase.title}</h4>
                    <p className="text-sm text-prisma-white/50">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative */}
          <div className="relative h-96 hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border border-prisma-white/10 rotate-45" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border border-prisma-blue/20 rotate-12" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-prisma-blue/10" />
            </div>
            <div className="relative z-10 text-center">
              <span className="text-6xl font-light text-prisma-white">4</span>
              <p className="text-label text-prisma-white/40 mt-2">Fases</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
