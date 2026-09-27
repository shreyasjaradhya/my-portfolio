import { useState, useEffect } from 'react';
import { updateProfile, uploadFile } from '../../services/portfolioService';
import { Save, Upload } from 'lucide-react';

const ProfileForm = ({ initialData, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    resumeUrl: '',
    email: '',
    github: '',
    linkedin: '',
    phone: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        title: initialData.title || '',
        bio: initialData.bio || '',
        resumeUrl: initialData.resumeUrl || '',
        email: initialData.email || '',
        github: initialData.github || '',
        linkedin: initialData.linkedin || '',
        phone: initialData.phone || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    setMessage('');
    try {
      const url = await uploadFile(file);
      setFormData(prev => ({ ...prev, resumeUrl: url }));
      setMessage('File uploaded successfully! Click Save Profile to apply.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      setMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-bg-card rounded-xl shadow-sm border border-border-subtle p-6">
      <h2 className="text-xl font-bold text-text-primary mb-6">Profile Settings</h2>
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.includes('success') ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Professional Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Bio / About *</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} required rows="5" className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">LinkedIn URL</label>
            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">GitHub URL</label>
            <input type="url" name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Resume URL / Link</label>
          <div className="flex space-x-2">
            <input type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="flex-1 px-4 py-3 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500" placeholder="https://link-to-resume.pdf or upload file" />
            <div className="relative">
              <input type="file" id="resumeUpload" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
              <label htmlFor="resumeUpload" className="flex items-center justify-center space-x-2 px-4 py-3 bg-border-subtle hover:bg-slate-500 text-text-primary rounded-lg cursor-pointer transition-colors duration-300 h-full">
                <Upload className="h-4 w-4" />
                <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border-subtle">
          <button type="submit" disabled={isSaving || isUploading} className="flex items-center space-x-2 px-6 py-3 bg-btn-bg text-btn-text rounded-lg transition-colors duration-300 disabled:opacity-50">
            <Save className="h-5 w-5" />
            <span>{isSaving ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
