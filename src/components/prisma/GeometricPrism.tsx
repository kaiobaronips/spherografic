import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GeometricPrismProps {
  size?: number;
  className?: string;
}

export function GeometricPrism({ size = 300, className = '' }: GeometricPrismProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prismRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous rotation
      gsap.to(prismRef.current, {
        rotationY: 360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      // Floating animation
      gsap.to(prismRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const layerCount = 12;
  const layerHeight = 8;
  const baseSize = size * 0.5;

  return (
    <div
      ref={containerRef}
      className={`relative perspective-1000 ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        ref={prismRef}
        className="absolute inset-0 preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {Array.from({ length: layerCount }).map((_, i) => {
          const zOffset = (i - layerCount / 2) * layerHeight;
          const scale = 1 - Math.abs(zOffset) * 0.015;
          const opacity = Math.max(0.15, 1 - Math.abs(zOffset) * 0.04);
          const isCenter = i === Math.floor(layerCount / 2);

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
              style={{
                transform: `translateZ(${zOffset}px) scale(${scale})`,
              }}
            >
              <svg
                width={baseSize}
                height={baseSize * 0.866}
                viewBox={`0 0 ${baseSize} ${baseSize * 0.866}`}
                className="overflow-visible"
              >
                {/* Outer triangle */}
                <polygon
                  points={`
                    ${baseSize / 2},0
                    0,${baseSize * 0.866}
                    ${baseSize},${baseSize * 0.866}
                  `}
                  fill="none"
                  stroke={isCenter ? '#3C4FFF' : `rgba(245, 245, 245, ${opacity})`}
                  strokeWidth={isCenter ? 2.5 : 1}
                  className={isCenter ? 'drop-shadow-[0_0_20px_rgba(60,79,255,0.6)]' : ''}
                />

                {/* Inner triangle (hollow center) */}
                <polygon
                  points={`
                    ${baseSize / 2},${baseSize * 0.2}
                    ${baseSize * 0.2},${baseSize * 0.72}
                    ${baseSize * 0.8},${baseSize * 0.72}
                  `}
                  fill="none"
                  stroke={`rgba(60, 79, 255, ${opacity * 0.5})`}
                  strokeWidth="0.5"
                />

                {/* Radial lines */}
                {Array.from({ length: 6 }).map((_, j) => {
                  const angle = (j * 60 - 90) * (Math.PI / 180);
                  const innerR = baseSize * 0.15;
                  const outerR = baseSize * 0.35;
                  const cx = baseSize / 2;
                  const cy = baseSize * 0.433;

                  return (
                    <line
                      key={j}
                      x1={cx + Math.cos(angle) * innerR}
                      y1={cy + Math.sin(angle) * innerR}
                      x2={cx + Math.cos(angle) * outerR}
                      y2={cy + Math.sin(angle) * outerR}
                      stroke={`rgba(60, 79, 255, ${opacity * 0.3})`}
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Concentric circles */}
                {Array.from({ length: 3 }).map((_, j) => (
                  <circle
                    key={`circle-${j}`}
                    cx={baseSize / 2}
                    cy={baseSize * 0.433}
                    r={baseSize * (0.1 + j * 0.08)}
                    fill="none"
                    stroke={`rgba(245, 245, 245, ${opacity * 0.1})`}
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                  />
                ))}
              </svg>
            </div>
          );
        })}

        {/* Side faces effect */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
          style={{
            width: baseSize,
            height: baseSize * 0.866,
            transform: 'translateZ(-layerCount * layerHeight / 2)',
          }}
        >
          {/* Left face */}
          <div
            className="absolute origin-left"
            style={{
              width: baseSize,
              height: baseSize * 0.866,
              background: 'linear-gradient(90deg, rgba(60, 79, 255, 0.05), transparent)',
              transform: 'rotateY(-60deg)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
          {/* Right face */}
          <div
            className="absolute origin-right"
            style={{
              width: baseSize,
              height: baseSize * 0.866,
              background: 'linear-gradient(-90deg, rgba(60, 79, 255, 0.05), transparent)',
              transform: 'rotateY(60deg)',
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="w-48 h-48 rounded-full bg-prisma-blue/10 blur-3xl animate-pulse-glow"
        />
      </div>
    </div>
  );
}
