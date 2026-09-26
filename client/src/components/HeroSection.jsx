import { motion } from 'framer-motion';
import { ChevronDown, Code, Cpu } from 'lucide-react';

const HeroSection = ({ profile }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden circuit-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-dark z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-accent-400 font-mono mb-4 flex items-center justify-center gap-2">
              <Code className="w-5 h-5" />
              <span>INITIALIZING_SEQUENCE...</span>
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">{profile?.name || 'Shrey'}</span>
            </h1>
            <h3 className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              {profile?.title || 'Electronics & Communication Engineer | Full-Stack Developer'}
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a href="#projects" className="w-full sm:w-auto px-8 py-3 rounded-md bg-brand-600 hover:bg-brand-500 text-white font-medium transition-colors flex items-center justify-center gap-2">
                <Cpu className="w-5 h-5" />
                View Projects
              </a>
              <a href="#contact" className="w-full sm:w-auto px-8 py-3 rounded-md bg-transparent border border-gray-700 hover:border-gray-500 text-white font-medium transition-colors">
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500"
      >
        <a href="#about" aria-label="Scroll down">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
