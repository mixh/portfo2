'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';

export default function CustomCursor() {
  // Only initialize if we're in the browser
  if (typeof window === 'undefined') return null;

  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const rotation = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const rotationSpring = useSpring(rotation, springConfig);

  useEffect(() => {
    // Check if we're on a device that supports hover
    const isHoverableDevice = window.matchMedia('(hover: hover)').matches;
    if (!isHoverableDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Add slight rotation based on mouse movement
      const moveX = e.movementX || 0;
      rotation.set(moveX * 2);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      scale.set(0.9);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
      scale.set(1);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = () => {
      setIsHovering(true);
      scale.set(1.5);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      scale.set(1);
    };

    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll('a, button, .hover-target');
      hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', handleHoverStart);
        target.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, scale, rotation]);

  // Don't render on non-hoverable devices
  if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
    return null;
  }

  return (
    <>
      {/* Cursor wrapper */}
      <motion.div
        className="fixed pointer-events-none z-[100]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: scaleSpring,
          rotate: rotationSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Main cursor */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Outer particles */}
          <div className="absolute -inset-2">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1"
                style={{
                  borderRadius: '50%',
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-12px)`,
                  background: `var(--accent${(i % 6) + 1})`,
                }}
                animate={{
                  scale: isHovering ? [1, 1.5, 1] : 1,
                  opacity: isHovering ? [0.6, 1, 0.6] : 0.6,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Inner ring */}
          <motion.div
            className="absolute -inset-1 rounded-full"
            style={{
              border: '2px solid var(--accent3)',
              opacity: 0.5,
            }}
            animate={{
              rotate: 360,
              scale: isHovering ? [1, 1.2, 1] : 1,
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1,
                repeat: Infinity,
              }
            }}
          />

          {/* Center dot */}
          <motion.div
            className="relative w-4 h-4 rounded-full"
            style={{
              background: `linear-gradient(45deg, var(--accent1), var(--accent2))`,
            }}
            animate={{
              scale: isClicking ? 0.8 : 1,
              rotate: isHovering ? 180 : 0,
            }}
          >
            <motion.div
              className="absolute inset-0.5 rounded-full"
              style={{
                background: `linear-gradient(45deg, var(--accent3), var(--accent4))`,
                opacity: 0.8,
              }}
              animate={{
                rotate: -180,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hover effect */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[99]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="relative w-20 h-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {/* Multiple rings with different colors */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid var(--accent${i + 1})`,
                  opacity: 0.3,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: 360,
                }}
                transition={{
                  duration: 2 + i,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
} 