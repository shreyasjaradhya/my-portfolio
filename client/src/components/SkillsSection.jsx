import { motion } from 'framer-motion';

const SkillsSection = ({ skills = [] }) => {
  // Group skills by category if needed, or display as a unified grid
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-24 bg-bg-card border-t border-border-subtle transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-mono flex items-center gap-2 transition-colors duration-300">
            <span className="text-brand-secondary">02.</span> Technical Arsenal
          </h2>
          <div className="w-20 h-1 bg-brand-primary rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-bg-base rounded-xl p-6 border border-border-subtle shadow-md transition-colors duration-300 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6 border-b border-border-subtle pb-2 transition-colors duration-300">{category}</h3>
              <div className="space-y-6">
                {skills.filter(s => s.category === category).map((skill, idx) => (
                  <div key={skill._id || idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-text-primary font-medium text-sm transition-colors duration-300">{skill.name}</span>
                      <span className="text-text-muted text-sm font-mono transition-colors duration-300">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-border-subtle rounded-full h-2 overflow-hidden transition-colors duration-300">
                      <motion.div
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
