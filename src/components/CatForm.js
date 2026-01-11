'use client';

import React, { useState } from 'react';

/**
 * Form component to register a new spy cat with premium Tailwind styling
 */
export default function CatForm({ onSubmit, loading, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      years_of_experience: '',
      breed: '',
      salary: '',
    }
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.years_of_experience || !formData.breed || !formData.salary) {
      setError('All files are required for clearance.');
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        years_of_experience: parseInt(formData.years_of_experience),
        salary: parseFloat(formData.salary),
      };
      
      await onSubmit(dataToSubmit);
      
      if (!initialData) {
        setFormData({
          name: '',
          years_of_experience: '',
          breed: '',
          salary: '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to authorize new agent.');
    }
  };

  return (
    <form className="space-y-5 bg-white p-6 rounded-2xl shadow-inner border border-gray-100" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1" htmlFor="name">Agent Code Name</label>
        <input
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Shadow"
          disabled={loading}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1" htmlFor="breed">Breed Classification</label>
        <input
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="e.g. Bengal"
          disabled={loading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1" htmlFor="years_of_experience">Service Years</label>
          <input
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
            type="number"
            id="years_of_experience"
            name="years_of_experience"
            value={formData.years_of_experience}
            onChange={handleChange}
            placeholder="0"
            disabled={loading}
            min="0"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1" htmlFor="salary">Salary ($)</label>
          <input
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="0.00"
            disabled={loading}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 text-sm bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
          {error}
        </div>
      )}

      <button 
        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-black/10"
        type="submit" 
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Authorizing...
          </span>
        ) : initialData ? 'Update Dossier' : 'Register New Agent'}
      </button>
    </form>
  );
}
