import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PrismaLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function PrismaLogo({ size = 120, className = '', animated = true }: PrismaLogoProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const orbit1Ref = useRef<SVGCircleElement>(null);
  const orbit2Ref = useRef<SVGCircleElement>(null);
  const orbit3Ref = useRef<SVGCircleElement>(null);
  const triangleRef = useRef<SVGPolygonElement>(null);

  useEffect(() => {
    if (!animated || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Orbit animations
      gsap.to(orbit1Ref.current, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(orbit2Ref.current, {
        rotation: -360,
        transformOrigin: '50% 50%',
        duration: 15,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(orbit3Ref.current, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      // Triangle pulse
      gsap.to(triangleRef.current, {
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animated]);

  const center = size / 2;
  const radius = (size * 0.35);

  // Triangle vertices (equilateral)
  const trianglePoints = [
    [center, center - radius],
    [center - radius * 0.866, center + radius * 0.5],
    [center + radius * 0.866, center + radius * 0.5],
  ].map(p => p.join(',')).join(' ');

  return (
    <svg
      ref={containerRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${className}`}
    >
      {/* Outer orbit ring */}
      <circle
        ref={orbit1Ref}
        cx={center}
        cy={center}
        r={radius * 1.3}
        fill="none"
        stroke="rgba(60, 79, 255, 0.2)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />

      {/* Middle orbit ring */}
      <circle
        ref={orbit2Ref}
        cx={center}
        cy={center}
        r={radius * 1.15}
        fill="none"
        stroke="rgba(245, 245, 245, 0.1)"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      {/* Inner orbit ring */}
      <circle
        ref={orbit3Ref}
        cx={center}
        cy={center}
        r={radius * 0.85}
        fill="none"
        stroke="rgba(60, 79, 255, 0.15)"
        strokeWidth="1"
        strokeDasharray="1 4"
      />

      {/* Central triangle */}
      <polygon
        ref={triangleRef}
        points={trianglePoints}
        fill="none"
        stroke="#F5F5F5"
        strokeWidth="1.5"
      />

      {/* Inner triangle (hollow center) */}
      <polygon
        points={[
          [center, center - radius * 0.4],
          [center - radius * 0.35, center + radius * 0.2],
          [center + radius * 0.35, center + radius * 0.2],
        ].map(p => p.join(',')).join(' ')}
        fill="none"
        stroke="rgba(60, 79, 255, 0.4)"
        strokeWidth="1"
      />

      {/* Center dot */}
      <circle
        cx={center}
        cy={center}
        r={2}
        fill="#3C4FFF"
      />
    </svg>
  );
}
