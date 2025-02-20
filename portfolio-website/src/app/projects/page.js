import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">All Projects</h1>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
} 