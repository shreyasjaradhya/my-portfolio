import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EducationForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        institution: initialData.institution || '',
        degree: initialData.degree || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        description: initialData.description || '',
        order: initialData.order || 0
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <div className="bg-bg-card rounded-xl w-full max-w-2xl border border-border-subtle shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-bg-card z-10">
          <h2 className="text-xl font-bold text-text-primary">
            {initialData ? 'Edit Education' : 'Add New Education'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Institution *</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Degree/Certificate *</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"
              placeholder="Describe your coursework, GPA, achievements..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Display Order</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-border-subtle border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border-subtle">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-border-subtle hover:bg-border-subtle text-text-primary rounded-lg transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-btn-bg text-btn-text rounded-lg transition-colors duration-300"
            >
              {initialData ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationForm;
