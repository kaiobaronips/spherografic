import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PrismaLogo } from '../prisma/PrismaLogo';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const progressCircle = progressRef.current;
    if (!container || !progressCircle) return;

    // Animate progress
    const progressObj = { value: 0 };
    
    gsap.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progressObj.value / 100) * circumference;
        progressCircle.style.strokeDashoffset = String(offset);
      },
      onComplete: () => {
        // Fade out loading screen
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            container.style.display = 'none';
            onComplete?.();
          },
        });
      },
    });

    return () => {
      gsap.killTweensOf(progressObj);
      gsap.killTweensOf(container);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-prisma-black"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Logo and Progress Container */}
      <div className="relative flex flex-col items-center gap-12">
        {/* Animated Logo */}
        <div className="relative">
          <PrismaLogo size={100} animated />
          
          {/* Progress Ring */}
          <svg
            className="absolute -inset-4"
            width="132"
            height="132"
            viewBox="0 0 100 100"
          >
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(245, 245, 245, 0.05)"
              strokeWidth="1"
            />
            
            {/* Progress ring */}
            <circle
              ref={progressRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3C4FFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45}
              transform="rotate(-90 50 50)"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(60, 79, 255, 0.5))',
              }}
            />
          </svg>
        </div>

        {/* Progress Text */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-caption text-prisma-white/40">Initializing</span>
          <span className="font-mono text-2xl text-prisma-white tabular-nums">
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-prisma-white/20" />
        <span className="text-label text-prisma-white/30 tracking-[0.2em]">SPHEROGRAPHIC™</span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-prisma-white/20" />
      </div>
    </div>
  );
}
