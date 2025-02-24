'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/experience';

function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-foreground/5 rounded-lg p-6 hover:bg-foreground/10 transition-colors"
    >
      <h3 className="font-bold text-xl mb-2">
        {item.position || item.degree} {item.field && `in ${item.field}`}
      </h3>
      <p className="text-foreground/60 mb-2 font-medium">{item.company || item.school}</p>
      <p className="text-sm text-foreground/60 mb-4">
        {item.from} - {item.to}
      </p>
      
      <div className="mt-4 text-foreground/80 space-y-2">
        {item.description.split('\n').map((line, i) => (
          <p key={i} className="text-sm leading-relaxed">
            {line.trim()}
          </p>
        ))}
      </div>

      {item.courses && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Key Courses:</p>
          <div className="flex flex-wrap gap-2">
            {item.courses.map((course) => (
              <span
                key={course}
                className="text-xs px-2 py-1 rounded-full bg-accent2/10 text-accent2"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {item.technologies && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-full bg-accent1/10 text-accent1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function SkillCategory({ category, skills }) {
  return (
    <div className="bg-foreground/5 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4 capitalize gradient-text">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="text-sm px-3 py-1 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="py-20" id="experience">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title mb-8">Education</h2>
          <div className="space-y-6">
            {experience.education.map((edu, index) => (
              <ExperienceCard key={edu.school} item={edu} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title mb-8">Work Experience</h2>
          <div className="space-y-6">
            {experience.work.map((work, index) => (
              <ExperienceCard key={work.company} item={work} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          id="skills"
        >
          <h2 className="section-title mb-8">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(experience.skills).map(([category, skills]) => (
              <SkillCategory key={category} category={category} skills={skills} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 