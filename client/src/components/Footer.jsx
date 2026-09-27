import { Code, Briefcase, Mail } from 'lucide-react';

const Footer = ({ profile }) => {
  return (
    <footer className="bg-bg-card border-t border-border-subtle py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-xl font-bold font-mono tracking-tight text-text-primary transition-colors duration-300">
              {profile?.name?.toUpperCase().split(' ')[0] || 'SHREYAS'}<span className="text-brand-secondary">.DEV</span>
            </span>
            <p className="text-text-secondary mt-2 text-sm transition-colors duration-300">
              Building the future, one line of code at a time.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-brand-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <Code className="w-6 h-6" />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-brand-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Briefcase className="w-6 h-6" />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="text-text-secondary hover:text-brand-primary transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border-subtle text-center md:text-left text-sm text-text-secondary flex flex-col md:flex-row justify-between transition-colors duration-300">
          <p>&copy; {new Date().getFullYear()} {profile?.name || 'Shreyas Aradhya'}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono text-xs">System Status: <span className="text-brand-secondary">Online</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
