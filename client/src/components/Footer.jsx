import { Code, Briefcase, MessageCircle, Mail } from 'lucide-react';

const Footer = ({ profile }) => {
  return (
    <footer className="bg-bg-card border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold font-mono tracking-tight text-white">
              {profile?.name?.toUpperCase().split(' ')[0] || 'SHREYAS'}<span className="text-accent-400">.DEV</span>
            </span>
            <p className="text-gray-400 mt-2 text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Code className="w-6 h-6" />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Briefcase className="w-6 h-6" />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center md:text-left text-sm text-gray-400 flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} {profile?.name || 'Shreyas Aradhya'}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono text-xs">System Status: <span className="text-accent-400">Online</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
