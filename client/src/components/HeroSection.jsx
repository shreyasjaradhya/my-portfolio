import { motion } from 'framer-motion';
import { ChevronDown, Code, Cpu } from 'lucide-react';

const HeroSection = ({ profile }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 bg-bg-base transition-colors duration-300">
      
      {/* Background with pattern only on the edges using a mask */}
      <div 
        className="absolute inset-0 pointer-events-none circuit-pattern opacity-40 transition-opacity duration-300"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 30%, black 100%)',
          maskImage: 'radial-gradient(ellipse at center, transparent 30%, black 100%)'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
        
        {/* Subtle legible container card to isolate text completely from any background noise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-4xl bg-bg-card/95 backdrop-blur-sm border border-border-subtle rounded-3xl p-8 md:p-16 shadow-lg text-center transition-colors duration-300"
        >
          <h2 className="text-brand-primary font-mono mb-4 flex items-center justify-center gap-2 font-bold tracking-wide transition-colors duration-300">
            <Code className="w-6 h-6" />
            <span>INITIALIZING_SEQUENCE...</span>
          </h2>
          
          {/* Main Heading: No transparency, no gradient, maximum readability */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary mb-6 tracking-tight transition-colors duration-300">
            Hi, I'm {profile?.name || 'J Shreyas Aradhya'}
          </h1>
          
          {/* Subtitle: High contrast, semibold */}
          <h3 className="text-xl md:text-2xl text-text-secondary font-semibold mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            {profile?.title || 'Electronics and Communication Engineering Student | Aspiring VLSI Design Engineer'}
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-btn-bg hover:bg-btn-hover text-btn-text font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:ring-4 focus:ring-brand-primary/30"
            >
              <Cpu className="w-5 h-5" />
              View Projects
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-transparent border-2 border-brand-primary hover:bg-brand-primary/10 text-text-primary font-bold transition-all duration-300 flex items-center justify-center shadow-sm focus:ring-4 focus:ring-brand-primary/30"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Down Arrow */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-brand-primary hover:text-brand-secondary transition-colors duration-300 z-10"
      >
        <a href="#about" aria-label="Scroll down" className="block p-2">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
