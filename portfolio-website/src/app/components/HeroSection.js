'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './motion/MotionElements';
import { personalInfo } from '@/data/personalInfo';
import Link from 'next/link';

function AnimatedBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-r from-accent1/30 to-accent2/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-l from-accent3/30 to-accent4/30 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [90, 0, 90],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ y: y2 }}
      />

      {/* Interactive particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `var(--accent${(i % 4) + 1})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TypewriterText({ text, delay = 0 }) {
  const letters = Array.from(text);
  
  return (
    <div className="inline-flex overflow-hidden font-tech tracking-wider">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: [0.33, 1, 0.68, 1]
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}

function AnimatedName({ name }) {
  return (
    <motion.div
      className="relative inline-block px-4 py-2 my-4 font-tech tracking-wider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent1/20 to-accent2/20 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.span
        className="relative gradient-text"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.02, 1],
          filter: [
            'brightness(1)',
            'brightness(1.2)',
            'brightness(1)'
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}

function GlitchText({ text, delay = 0 }) {
  return (
    <div className="relative inline-block font-tech tracking-wider">
      {/* Main text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="text-foreground relative z-10"
      >
        {text}
        
        {/* Glitch effects */}
        <motion.div
          className="absolute -inset-0.5 text-accent1"
          aria-hidden="true"
          style={{ clipPath: 'inset(50% 0 50%)' }}
          animate={{
            clipPath: ['inset(50% 0 50%)', 'inset(0% 0 0%)', 'inset(50% 0 50%)'],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          {text}
        </motion.div>
        <motion.div
          className="absolute -inset-0.5 text-accent2"
          aria-hidden="true"
          style={{ clipPath: 'inset(50% 0 50%)' }}
          animate={{
            clipPath: ['inset(50% 0 50%)', 'inset(0% 0 0%)', 'inset(50% 0 50%)'],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 2,
            delay: 0.1,
          }}
        >
          {text}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <motion.div
            className="text-5xl md:text-7xl font-bold mb-6 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="overflow-hidden">
                <GlitchText text="Hello World!" delay={0.5} />
              </div>
              <div className="overflow-hidden flex items-center gap-2">
                <TypewriterText text="I'm" delay={1.5} />
                <AnimatedName name={personalInfo.name} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <p className="body-text mt-6 max-w-2xl mx-auto text-foreground/80">
              {personalInfo.bio}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <Link href="/#projects">
            <motion.button
              className="funky-border px-8 py-4 rounded-full text-lg font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 gradient-text">View My Projects</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent1/10 via-accent2/10 to-accent3/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 