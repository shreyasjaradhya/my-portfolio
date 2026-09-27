import { motion } from 'framer-motion';
import { Award, Trophy, ExternalLink, Image as ImageIcon, FileText } from 'lucide-react';

const CertificationsSection = ({ certifications = [], achievements = [] }) => {
  return (
    <section id="certifications" className="py-24 bg-bg-card border-t border-border-subtle transition-colors duration-300">
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
              <h2 className="text-3xl font-bold text-text-primary mb-4 font-mono flex items-center gap-2 transition-colors duration-300">
                <Award className="text-brand-primary w-8 h-8 transition-colors duration-300" />
                Certifications
              </h2>
              <div className="w-16 h-1 bg-brand-secondary rounded transition-colors duration-300"></div>
            </motion.div>

            <div className="space-y-6">
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-base p-6 rounded-xl border border-border-subtle hover:border-brand-primary/30 transition-all duration-300 hover:shadow-md flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  {cert.fileType === 'image' && cert.fileUrl && (
                    <a 
                      href={cert.fileUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="block shrink-0 w-24 h-20 sm:w-32 sm:h-24 rounded overflow-hidden border border-border-subtle relative group"
                    >
                      <img src={cert.fileUrl} alt={cert.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="text-white w-5 h-5" />
                      </div>
                    </a>
                  )}

                  <div className="flex-1 w-full">
                    <h3 className="text-xl font-bold text-text-primary mb-2 transition-colors duration-300">{cert.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-2 mb-3">
                      <span className="text-brand-secondary font-mono transition-colors duration-300">{cert.issuer}</span>
                      <span className="text-text-muted transition-colors duration-300">{cert.date}</span>
                    </div>

                    {cert.fileType === 'pdf' && cert.fileUrl && (
                      <a 
                        href={cert.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 text-sm text-brand-primary hover:text-brand-secondary font-medium transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        View Certificate (PDF)
                      </a>
                    )}
                    {(!cert.fileType || cert.fileType === '') && cert.fileUrl && (
                      <a 
                        href={cert.fileUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 text-sm text-brand-primary hover:text-brand-secondary font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Credential
                      </a>
                    )}
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
              <h2 className="text-3xl font-bold text-text-primary mb-4 font-mono flex items-center gap-2 transition-colors duration-300">
                <Trophy className="text-brand-primary w-8 h-8 transition-colors duration-300" />
                Achievements
              </h2>
              <div className="w-16 h-1 bg-brand-secondary rounded transition-colors duration-300"></div>
            </motion.div>

            <div className="space-y-6">
              {achievements.map((ach, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-bg-base p-6 rounded-xl border border-border-subtle hover:border-brand-primary/30 transition-all duration-300 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-text-primary mb-2 transition-colors duration-300">{ach.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed transition-colors duration-300">{ach.description}</p>
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
