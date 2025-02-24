'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <motion.button
              className="funky-border px-8 py-4 rounded-full text-lg font-medium relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 gradient-text">View All Projects</span>
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