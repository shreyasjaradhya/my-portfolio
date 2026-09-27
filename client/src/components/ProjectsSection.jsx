import { motion } from 'framer-motion';
import { Code, ExternalLink, Folder } from 'lucide-react';

const ProjectsSection = ({ projects = [] }) => {
  return (
    <section id="projects" className="py-24 bg-bg-base relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-mono flex items-center gap-2 transition-colors duration-300">
            <span className="text-brand-secondary">03.</span> Some Things I've Built
          </h2>
          <div className="w-20 h-1 bg-brand-primary rounded"></div>
        </motion.div>

        {(!projects || projects.length === 0) ? (
          <div className="text-center py-12 bg-bg-card rounded-xl border border-border-subtle transition-colors duration-300">
            <p className="text-text-secondary">No projects found or unable to load projects from the server.</p>
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
              className="bg-bg-card rounded-xl border border-border-subtle hover:border-brand-primary/50 hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 group flex flex-col h-full overflow-hidden"
            >
              {project.imageUrl && (
                <div className="w-full h-48 overflow-hidden bg-bg-card-hover">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-6">
                  {!project.imageUrl && <Folder className="w-10 h-10 text-brand-primary" />}
                  <div className={`flex gap-3 ${project.imageUrl ? 'w-full justify-end' : ''}`}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="text-text-secondary hover:text-brand-secondary transition-colors" target="_blank" rel="noreferrer">
                        <Code className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="text-text-secondary hover:text-brand-secondary transition-colors" target="_blank" rel="noreferrer">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-border-subtle transition-colors duration-300">
                  <ul className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, i) => (
                      <li key={i} className="text-xs font-mono text-brand-secondary bg-brand-secondary/10 px-2 py-1 rounded transition-colors duration-300">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
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
