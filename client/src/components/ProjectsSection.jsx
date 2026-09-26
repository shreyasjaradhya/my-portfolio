import { motion } from 'framer-motion';
import { Code, ExternalLink, Folder } from 'lucide-react';

const ProjectsSection = ({ projects = [] }) => {
  return (
    <section id="projects" className="py-24 bg-bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono flex items-center gap-2">
            <span className="text-accent-400">03.</span> Some Things I've Built
          </h2>
          <div className="w-20 h-1 bg-brand-500 rounded"></div>
        </motion.div>

        {(!projects || projects.length === 0) ? (
          <div className="text-center py-12 bg-bg-card rounded-xl border border-gray-800">
            <p className="text-gray-400">No projects found or unable to load projects from the server.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-card rounded-xl p-6 border border-gray-800 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="flex justify-between items-center mb-6">
                <Folder className="w-10 h-10 text-brand-400" />
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-gray-400 hover:text-accent-400 transition-colors" target="_blank" rel="noreferrer">
                      <Code className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-gray-400 hover:text-accent-400 transition-colors" target="_blank" rel="noreferrer">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-auto pt-4 border-t border-gray-800/50">
                <ul className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <li key={i} className="text-xs font-mono text-accent-500 bg-accent-500/10 px-2 py-1 rounded">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
