import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { uploadFile } from '../../services/portfolioService';

const ProjectForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    date: '',
    featured: false,
    order: 0
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        imageUrl: initialData.imageUrl || '',
        techStack: initialData.techStack ? initialData.techStack.join(', ') : '',
        githubUrl: initialData.githubUrl || '',
        liveUrl: initialData.liveUrl || '',
        date: initialData.date || '',
        featured: initialData.featured || false,
        order: initialData.order || 0
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse techStack string into array
    const parsedTechStack = formData.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0);
      
    onSubmit({
      ...formData,
      techStack: parsedTechStack,
      order: formData.order ? parseInt(formData.order) : 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 p-4">
      <div className="bg-bg-card rounded-xl w-full max-w-2xl border border-border-subtle shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-bg-card z-10">
          <h2 className="text-xl font-bold text-text-primary">
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors duration-300">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Project Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Image URL</label>
            <div className="flex space-x-2">
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="flex-1 px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" placeholder="https://example.com/image.jpg" />
              <div className="relative">
                <input type="file" id="projectImage" onChange={handleFileUpload} className="hidden" accept="image/*" />
                <label htmlFor="projectImage" className="flex items-center justify-center space-x-2 px-4 py-2 bg-border-subtle hover:bg-slate-500 text-text-primary rounded-lg cursor-pointer transition-colors duration-300 h-full whitespace-nowrap">
                  <Upload className="h-4 w-4" />
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Technologies (comma separated) *</label>
            <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} required className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" placeholder="React, Node.js, MongoDB" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">GitHub URL</label>
              <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Live URL</label>
              <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
              <input type="text" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" placeholder="e.g. Dec 2025" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Display Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 rounded bg-border-subtle border-border-subtle text-blue-600 focus:ring-brand-primary" />
            <label htmlFor="featured" className="text-sm font-medium text-text-primary">Feature this project on home page</label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-border-subtle">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-border-subtle hover:bg-border-subtle text-text-primary rounded-lg transition-colors duration-300">Cancel</button>
            <button type="submit" disabled={isUploading} className="px-4 py-2 bg-btn-bg text-btn-text rounded-lg transition-colors duration-300 disabled:opacity-50">
              {initialData ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
