import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  });
  
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current?.querySelectorAll('.info-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const budgetOptions = [
    { value: '', label: 'Selecione um orçamento' },
    { value: '10k-25k', label: '$10k - $25k' },
    { value: '25k-50k', label: '$25k - $50k' },
    { value: '50k-100k', label: '$50k - $100k' },
    { value: '100k+', label: '$100k+' },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-8 border border-prisma-blue bg-prisma-blue/10 flex items-center justify-center">
            <Check className="w-10 h-10 text-prisma-blue" />
          </div>
          <h1 className="text-display text-prisma-white mb-6">
            Mensagem Enviada
          </h1>
          <p className="text-body text-prisma-white/60 mb-12">
            Obrigado pelo contato. Analisaremos sua solicitação e 
            retornaremos em até 48 horas úteis.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-prisma-blue text-prisma-black text-sm font-mono uppercase tracking-wider hover:bg-prisma-white transition-colors duration-300"
          >
            Voltar ao Início
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <span className="header-reveal text-caption text-prisma-blue block mb-4">
              Get in Touch
            </span>
            <h1 className="header-reveal text-display text-prisma-white">
              Contact
            </h1>
          </div>
          
          <div>
            <p className="header-reveal text-body text-prisma-white/60">
              Pronto para iniciar um projeto? Preencha o formulário abaixo 
              e retornaremos em até 48 horas.
            </p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label 
                    htmlFor="name"
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'name' || formData.name
                        ? 'top-0 text-xs text-prisma-blue'
                        : 'top-4 text-sm text-prisma-white/40'
                    }`}
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b border-prisma-white/20 py-4 pt-6 text-prisma-white focus:outline-none focus:border-prisma-blue transition-colors duration-300"
                  />
                </div>

                <div className="relative">
                  <label 
                    htmlFor="email"
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'email' || formData.email
                        ? 'top-0 text-xs text-prisma-blue'
                        : 'top-4 text-sm text-prisma-white/40'
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent border-b border-prisma-white/20 py-4 pt-6 text-prisma-white focus:outline-none focus:border-prisma-blue transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Company & Budget Row */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <label 
                    htmlFor="company"
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'company' || formData.company
                        ? 'top-0 text-xs text-prisma-blue'
                        : 'top-4 text-sm text-prisma-white/40'
                    }`}
                  >
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-prisma-white/20 py-4 pt-6 text-prisma-white focus:outline-none focus:border-prisma-blue transition-colors duration-300"
                  />
                </div>

                <div className="relative">
                  <label 
                    htmlFor="budget"
                    className={`absolute left-0 transition-all duration-300 ${
                      focusedField === 'budget' || formData.budget
                        ? 'top-0 text-xs text-prisma-blue'
                        : 'top-4 text-sm text-prisma-white/40'
                    }`}
                  >
                    Orçamento Estimado
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('budget')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-prisma-white/20 py-4 pt-6 text-prisma-white focus:outline-none focus:border-prisma-blue transition-colors duration-300 appearance-none"
                  >
                    {budgetOptions.map(option => (
                      <option 
                        key={option.value} 
                        value={option.value}
                        className="bg-prisma-graphite text-prisma-white"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label 
                  htmlFor="message"
                  className={`absolute left-0 transition-all duration-300 ${
                    focusedField === 'message' || formData.message
                      ? 'top-0 text-xs text-prisma-blue'
                      : 'top-4 text-sm text-prisma-white/40'
                  }`}
                >
                  Conte-nos sobre seu projeto
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-prisma-white/20 py-4 pt-6 text-prisma-white focus:outline-none focus:border-prisma-blue transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-prisma-blue text-prisma-black text-sm font-mono uppercase tracking-wider hover:bg-prisma-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-prisma-black/30 border-t-prisma-black rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-12">
            {/* Email */}
            <div className="info-item">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-prisma-white/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-prisma-blue" />
                </div>
                <span className="text-label text-prisma-white/40">Email</span>
              </div>
              <a 
                href="mailto:Studio@spherografic.com.br"
                className="text-prisma-white hover:text-prisma-blue transition-colors duration-300"
              >
                Studio@spherografic.com.br
              </a>
            </div>

            {/* Phone */}
            <div className="info-item">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-prisma-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-prisma-blue" />
                </div>
                <span className="text-label text-prisma-white/40">Telefone</span>
              </div>
              <a 
                href="tel:+5511992166696"
                className="text-prisma-white hover:text-prisma-blue transition-colors duration-300"
              >
                +55 (11) 9 9216-6696
              </a>
            </div>

            {/* Location */}
            <div className="info-item">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-prisma-white/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-prisma-blue" />
                </div>
                <span className="text-label text-prisma-white/40">Localização</span>
              </div>
              <p className="text-prisma-white/70">
                São Paulo, Brasil
                <br />
                Remoto Globalmente
              </p>
            </div>

            {/* Response Time */}
            <div className="info-item pt-8 border-t border-prisma-white/10">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-prisma-blue rounded-full animate-pulse" />
                <span className="text-sm text-prisma-white/60">
                  Tempo de resposta: até 48h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 right-0 w-96 h-96 pointer-events-none opacity-20">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <polygon
            points="200,50 350,300 50,300"
            fill="none"
            stroke="#3C4FFF"
            strokeWidth="0.5"
          />
          <polygon
            points="200,100 300,275 100,275"
            fill="none"
            stroke="#3C4FFF"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
