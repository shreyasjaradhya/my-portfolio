import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const AboutSection = ({ profile }) => {
  return (
    <section id="about" className="py-24 bg-bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Futuristic Avatar placeholder */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 opacity-20 blur-xl"></div>
              <div className="relative h-full w-full rounded-2xl border border-gray-800 bg-bg-card flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 circuit-pattern opacity-30"></div>
                <Terminal className="w-32 h-32 text-gray-600" />
                {/* Replace above with actual image when available */}
                {/* <img src="profile.jpg" alt="Shrey" className="object-cover w-full h-full" /> */}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-mono flex items-center gap-2">
              <span className="text-accent-400">01.</span> About Me
            </h2>
            <div className="text-gray-400 space-y-4 text-lg leading-relaxed">
              <p>
                {profile?.bio || "I'm a passionate engineer who loves bridging the gap between hardware and software. With a strong foundation in Electronics and Communication Engineering, I build systems that are not just functionally robust, but also intelligent."}
              </p>
              <p>
                My expertise spans across full-stack web development, embedded systems, and exploring AI/ML applications. I enjoy tackling complex problems and building scalable solutions.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-bg-card p-4 rounded-lg border border-gray-800">
                <h4 className="text-white font-bold mb-1">Education</h4>
                <p className="text-sm text-gray-400">B.Tech ECE</p>
              </div>
              <div className="bg-bg-card p-4 rounded-lg border border-gray-800">
                <h4 className="text-white font-bold mb-1">Focus</h4>
                <p className="text-sm text-gray-400">Hardware + Software</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
