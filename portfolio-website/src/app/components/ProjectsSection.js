'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <section className="py-20" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title text-center mb-12">
            <span className="gradient-text">Featured Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 