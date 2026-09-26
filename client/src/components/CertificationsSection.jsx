import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';

const CertificationsSection = ({ certifications = [], achievements = [] }) => {
  return (
    <section id="certifications" className="py-24 bg-bg-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                <Award className="text-brand-400 w-8 h-8" />
                Certifications
              </h2>
              <div className="w-16 h-1 bg-brand-500 rounded"></div>
            </motion.div>

            <div className="space-y-6">
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-card p-6 rounded-xl border border-gray-800 hover:border-brand-500/30 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-accent-400 font-mono">{cert.issuer}</span>
                    <span className="text-gray-500">{cert.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-4 font-mono flex items-center gap-2">
                <Trophy className="text-brand-400 w-8 h-8" />
                Achievements
              </h2>
              <div className="w-16 h-1 bg-brand-500 rounded"></div>
            </motion.div>

            <div className="space-y-6">
              {achievements.map((ach, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-card p-6 rounded-xl border border-gray-800 hover:border-brand-500/30 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{ach.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{ach.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
