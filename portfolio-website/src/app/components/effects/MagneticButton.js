'use client';

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className = '', strength = 40 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX / strength, y: middleY / strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.div>
  );
} 