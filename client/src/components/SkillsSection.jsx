import { motion } from 'framer-motion';

const SkillsSection = ({ skills = [] }) => {
  // Group skills by category if needed, or display as a unified grid
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="py-24 bg-bg-card border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono flex items-center gap-2">
            <span className="text-accent-400">02.</span> Technical Arsenal
          </h2>
          <div className="w-20 h-1 bg-brand-500 rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="bg-bg-dark rounded-xl p-6 border border-gray-800 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-2">{category}</h3>
              <div className="space-y-6">
                {skills.filter(s => s.category === category).map((skill, idx) => (
                  <div key={skill._id || idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                      <span className="text-gray-500 text-sm font-mono">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-brand-500 to-accent-400 h-2 rounded-full"
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
