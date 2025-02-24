'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProjectCard({ project, index }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || (project.image ? [project.image] : []);
  
  // Check if the project is a mobile app (contains 'iOS' or 'mobile' in title or technologies)
  const isMobileApp = project.title.toLowerCase().includes('ios') || 
                     project.technologies.some(tech => 
                       tech.toLowerCase().includes('swift') || 
                       tech.toLowerCase().includes('mobile')
                     );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-foreground/5 rounded-lg overflow-hidden hover:bg-foreground/10 transition-colors"
    >
      {images.length > 0 && (
        <div className={`relative ${isMobileApp ? 'h-80' : 'h-48'} w-full group`}>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              fill
              className={`object-contain ${!isMobileApp && 'object-cover'} transition-transform duration-500 group-hover:scale-105`}
              style={{
                padding: isMobileApp ? '1rem' : '0',
                background: isMobileApp ? 'rgba(0,0,0,0.05)' : 'transparent'
              }}
            />
            
            {/* Image Navigation Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentImageIndex 
                        ? 'bg-white' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Arrow Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(i => (i > 0 ? i - 1 : images.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentImageIndex(i => (i < images.length - 1 ? i + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  →
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-foreground/60 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-full bg-accent1/10 text-accent1"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-accent1 transition-colors"
            >
              View Code →
            </Link>
          )}
          {project.liveDemo && (
            <Link
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-accent2 transition-colors"
            >
              Live Demo →
            </Link>
          )}
          {project.link && !project.liveDemo && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-accent2 transition-colors"
            >
              View Project →
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
} 