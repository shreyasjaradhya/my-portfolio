import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const TimelineItem = ({ data, isEducation, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 sm:pl-32 py-6 group"
    >
      {/* Timeline Line */}
      <div className="hidden sm:block absolute left-[120px] top-0 bottom-0 w-px bg-border-subtle group-last:bg-gradient-to-b group-last:from-border-subtle group-last:to-transparent transition-colors duration-300"></div>
      
      {/* Timeline Dot */}
      <div className="hidden sm:flex absolute left-[111px] top-8 w-5 h-5 rounded-full bg-bg-base border-2 border-brand-primary items-center justify-center z-10 transition-colors duration-300">
        <div className="w-1 h-1 rounded-full bg-brand-secondary transition-colors duration-300"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
        {/* Date Section */}
        <div className="sm:absolute sm:left-0 sm:w-[100px] text-left sm:text-right pt-1">
          <span className="text-xs font-mono text-brand-secondary flex items-center sm:justify-end gap-1 transition-colors duration-300">
            <Calendar className="w-3 h-3" />
            {new Date(data.startDate).getFullYear()} - {data.isCurrent ? 'Present' : (data.endDate ? new Date(data.endDate).getFullYear() : 'Present')}
          </span>
        </div>

        {/* Content Section */}
        <div className="bg-bg-card p-6 rounded-xl border border-border-subtle hover:border-brand-primary/30 hover:shadow-md transition-all duration-300 flex-grow">
          <div className="flex items-center gap-3 mb-2">
            {isEducation ? <GraduationCap className="w-5 h-5 text-brand-primary" /> : <Briefcase className="w-5 h-5 text-brand-primary" />}
            <h3 className="text-xl font-bold text-text-primary transition-colors duration-300">{isEducation ? data.degree : data.role}</h3>
          </div>
          <h4 className="text-lg text-text-secondary font-medium mb-4 transition-colors duration-300">{isEducation ? data.institution : data.company}</h4>
          <p className="text-text-muted text-sm leading-relaxed transition-colors duration-300">{data.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = ({ experience = [], education = [] }) => {
  return (
    <section id="experience" className="py-24 bg-bg-base transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-mono flex items-center gap-2 transition-colors duration-300">
              <span className="text-brand-secondary">04.</span> Experience
            </h2>
            <div className="w-20 h-1 bg-brand-primary rounded transition-colors duration-300"></div>
          </motion.div>

          <div className="relative">
            {experience.map((exp, idx) => (
              <TimelineItem key={exp._id || idx} data={exp} isEducation={false} index={idx} />
            ))}
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-mono flex items-center gap-2 transition-colors duration-300">
              <span className="text-brand-secondary">05.</span> Education
            </h2>
            <div className="w-20 h-1 bg-brand-primary rounded transition-colors duration-300"></div>
          </motion.div>

          <div className="relative">
            {education.map((edu, idx) => (
              <TimelineItem key={edu._id || idx} data={edu} isEducation={true} index={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
