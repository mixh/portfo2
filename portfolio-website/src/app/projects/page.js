'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from '@/app/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">All Projects</h1>
          <p className="text-foreground/60">
            A collection of all my projects and work
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 