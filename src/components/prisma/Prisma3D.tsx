import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Prisma3DProps {
  size?: number;
  className?: string;
  layers?: number;
}

export function Prisma3D({ size = 400, className = '', layers = 8 }: Prisma3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 25 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous rotation animation
      gsap.to(containerRef.current, {
        rotationY: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    setRotation({
      x: -15 + y * 20,
      y: 25 + x * 20,
    });
  };

  const triangleSize = size * 0.4;
  const layerOffset = 12;

  return (
    <div
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotation({ x: -15, y: 25 });
      }}
    >
      <div
        ref={containerRef}
        className="relative preserve-3d transition-transform duration-300 ease-out"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {Array.from({ length: layers }).map((_, i) => {
          const offset = (i - layers / 2) * layerOffset;
          const scale = 1 - Math.abs(offset) * 0.008;
          const opacity = 1 - Math.abs(offset) * 0.08;

          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center preserve-3d"
              style={{
                transform: `translateZ(${offset}px) scale(${scale})`,
                opacity,
              }}
            >
              <svg
                width={triangleSize}
                height={triangleSize * 0.866}
                viewBox={`0 0 ${triangleSize} ${triangleSize * 0.866}`}
                className="overflow-visible"
              >
                {/* Main triangle */}
                <polygon
                  points={`
                    ${triangleSize / 2},0
                    0,${triangleSize * 0.866}
                    ${triangleSize},${triangleSize * 0.866}
                  `}
                  fill="none"
                  stroke={i === 0 ? '#3C4FFF' : 'rgba(245, 245, 245, 0.3)'}
                  strokeWidth={i === 0 ? 2 : 1}
                  className={isHovering && i === 0 ? 'drop-shadow-[0_0_15px_rgba(60,79,255,0.5)]' : ''}
                />

                {/* Internal lines */}
                {Array.from({ length: 5 }).map((_, j) => {
                  const progress = (j + 1) / 6;
                  const y = triangleSize * 0.866 * progress;
                  const leftX = triangleSize / 2 * progress;
                  const rightX = triangleSize - leftX;

                  return (
                    <line
                      key={j}
                      x1={leftX}
                      y1={y}
                      x2={rightX}
                      y2={y}
                      stroke="rgba(245, 245, 245, 0.1)"
                      strokeWidth="0.5"
                    />
                  );
                })}

                {/* Diagonal lines */}
                <line
                  x1={triangleSize / 2}
                  y1={0}
                  x2={triangleSize * 0.25}
                  y2={triangleSize * 0.433}
                  stroke="rgba(60, 79, 255, 0.2)"
                  strokeWidth="0.5"
                />
                <line
                  x1={triangleSize / 2}
                  y1={0}
                  x2={triangleSize * 0.75}
                  y2={triangleSize * 0.433}
                  stroke="rgba(60, 79, 255, 0.2)"
                  strokeWidth="0.5"
                />
                <line
                  x1={0}
                  y1={triangleSize * 0.866}
                  x2={triangleSize * 0.5}
                  y2={triangleSize * 0.433}
                  stroke="rgba(60, 79, 255, 0.2)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
          );
        })}

        {/* Glow effect */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'translateZ(-20px)' }}
        >
          <div
            className="w-32 h-32 rounded-full bg-prisma-blue/10 blur-3xl"
            style={{
              opacity: isHovering ? 0.6 : 0.3,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
