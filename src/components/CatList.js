'use client';

import React, { useState } from 'react';

/**
 * Component to display a list of spy cats with premium Tailwind styling
 */
export default function CatList({ cats, loading, onUpdateSalary, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [tempSalary, setTempSalary] = useState('');

  const handleEditClick = (cat) => {
    setEditId(cat.id);
    setTempSalary(cat.salary);
  };

  const handleSaveClick = (id) => {
    onUpdateSalary(id, parseFloat(tempSalary));
    setEditId(null);
  };

  const handleCancelClick = () => {
    setEditId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12 text-gray-500 animate-pulse">
        <span className="text-lg font-medium">Loading agents...</span>
      </div>
    );
  }

  if (!cats || cats.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-500">
        <p className="text-lg">No spy cats found. Register a new agent to begin.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Breed</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Experience</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Salary</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {cats.map((cat) => (
              <tr key={cat.id} className="hover:bg-blue-50/30 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{cat.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    {cat.breed}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {cat.years_of_experience} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editId === cat.id ? (
                    <input
                      type="number"
                      className="w-24 px-2 py-1 text-sm border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tempSalary}
                      onChange={(e) => setTempSalary(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div className="text-sm font-mono font-bold text-gray-800">${cat.salary.toLocaleString()}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    {editId === cat.id ? (
                      <>
                        <button 
                          onClick={() => handleSaveClick(cat.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancelClick}
                          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleEditClick(cat)}
                          className="px-3 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => onDelete(cat.id)}
                          className="px-3 py-1 text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                        >
                          Retire
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
