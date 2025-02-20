'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';

function Particle({ x, y, size, color }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const translateX = useTransform(springX, (latest) => (latest - x) * 0.1);
  const translateY = useTransform(springY, (latest) => (latest - y) * 0.1);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        x: translateX,
        y: translateY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 2, opacity: 0.8 }}
    />
  );
}

export default function Particles({ count = 50 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 + '%',
    y: Math.random() * 100 + '%',
    size: Math.random() * 4 + 2,
    color: `var(--accent${(i % 4) + 1})`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
    </div>
  );
} 