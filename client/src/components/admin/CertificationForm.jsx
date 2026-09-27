import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { uploadFile } from '../../services/portfolioService';

const CertificationForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    fileUrl: '',
    fileType: '',
    order: 0
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        issuer: initialData.issuer || '',
        date: initialData.date || '',
        fileUrl: initialData.fileUrl || '',
        fileType: initialData.fileType || '',
        order: initialData.order || 0
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
    
    // Determine file type
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const newFileType = isPdf ? 'pdf' : 'image';
    
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      setFormData(prev => ({ 
        ...prev, 
        fileUrl: url,
        fileType: newFileType
      }));
    } catch (error) {
      console.error('Failed to upload file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      order: formData.order ? parseInt(formData.order) : 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 p-4">
      <div className="bg-bg-card rounded-xl w-full max-w-xl border border-border-subtle shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-bg-card z-10">
          <h2 className="text-xl font-bold text-text-primary">
            {initialData ? 'Edit Certification' : 'Add New Certification'}
          </h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors duration-300">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Certification Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Issuing Organization *</label>
            <input type="text" name="issuer" value={formData.issuer} onChange={handleChange} required className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Date *</label>
              <input type="text" name="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" placeholder="e.g. Jan 2026" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Display Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full px-3 py-2 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Certificate File (PDF, JPG, PNG)</label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                name="fileUrl" 
                value={formData.fileUrl} 
                onChange={handleChange} 
                className="flex-1 px-3 py-2 bg-bg-base border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-sm" 
                placeholder="https://example.com/cert.pdf" 
              />
              <div className="relative flex-shrink-0">
                <input 
                  type="file" 
                  id="certFile" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept=".pdf,image/*" 
                />
                <label 
                  htmlFor="certFile" 
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-bg-card-hover border border-border-subtle hover:bg-border-subtle text-text-primary rounded-lg cursor-pointer transition-colors h-full whitespace-nowrap"
                >
                  <Upload className="h-4 w-4" />
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                </label>
              </div>
            </div>
            {formData.fileType && (
              <p className="text-xs text-text-muted mt-1">
                Detected Type: <span className="font-semibold uppercase">{formData.fileType}</span>
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border-subtle">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-bg-card-hover border border-border-subtle hover:bg-border-subtle text-text-primary rounded-lg transition-colors duration-300">Cancel</button>
            <button type="submit" disabled={isUploading} className="px-4 py-2 bg-btn-bg text-btn-text rounded-lg transition-colors duration-300 disabled:opacity-50">
              {initialData ? 'Update Certification' : 'Add Certification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationForm;
