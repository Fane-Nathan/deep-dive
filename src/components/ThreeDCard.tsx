import React, { useRef, useState } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  maxRotation?: number; // default 12 deg
}

export default function ThreeDCard({ children, id, className = '', maxRotation = 12 }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Find mouse relative to center of card (-width/2 to +width/2)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Pitch & Yaw mapping
    const rotX = -(mouseY / (height / 2)) * maxRotation;
    const rotY = (mouseX / (width / 2)) * maxRotation;

    setRotation({ x: rotX, y: rotY });

    // Glare position percentage (0 to 100)
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-200 cubic-bezier(0.25, 1, 0.5, 1) ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic 3D Glare Sheet overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 250px at ${glarePosition.x}% ${glarePosition.y}%, rgba(103, 232, 249, 0.13) 0%, rgba(255, 255, 255, 0) 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Ambient shadow that responds in reverse depth */}
      <div
        className="absolute inset-0 rounded-2xl bg-black/40 blur-xl pointer-events-none transition-all duration-300 -z-10"
        style={{
          transform: isHovered
            ? `translate3d(${-rotation.y * 1}px, ${rotation.x * 1}px, -20px) scale(0.95)`
            : 'translate3d(0, 0, -5px) scale(0.95)',
        }}
      />

      <div className="h-full" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
}
