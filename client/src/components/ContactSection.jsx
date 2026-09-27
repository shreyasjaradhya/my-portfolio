import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { createMessage } from '../services/portfolioService';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      await createMessage({
        senderName: formData.name,
        senderEmail: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to send message:', error);
      setErrorMsg('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-base relative transition-colors duration-300">
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-mono transition-colors duration-300">
            <span className="text-brand-secondary">06.</span> What's Next?
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 transition-colors duration-300">Get In Touch</h3>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mx-auto transition-colors duration-300">
            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-bg-card p-8 rounded-2xl border border-border-subtle shadow-xl transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2 font-mono transition-colors duration-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-base border border-border-subtle rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2 font-mono transition-colors duration-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-bg-base border border-border-subtle rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2 font-mono transition-colors duration-300">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-bg-base border border-border-subtle rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors"
                placeholder="Project Inquiry"
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2 font-mono transition-colors duration-300">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-bg-base border border-border-subtle rounded-md px-4 py-3 text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors resize-none"
                placeholder="Hello, I'd like to talk about..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-md font-medium flex items-center justify-center gap-2 transition-all ${
                isSuccess 
                  ? 'bg-green-600 hover:bg-green-500 text-white' 
                  : 'bg-btn-bg hover:bg-btn-hover text-btn-text disabled:opacity-70 disabled:cursor-not-allowed shadow-md'
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
            {errorMsg && (
              <p className="mt-4 text-red-400 text-sm text-center">{errorMsg}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
