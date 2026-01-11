'use client';

import React, { useState, useEffect } from 'react';
import { catsApi } from '../lib/api';
import CatList from '../components/CatList';
import CatForm from '../components/CatForm';

export default function Home() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await catsApi.list();
      setCats(data);
    } catch (err) {
      setError(err.message || 'Failed to establish connection with HQ.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCat = async (catData) => {
    setProcessing(true);
    setError('');
    setMessage('');
    try {
      await catsApi.create(catData);
      setMessage('New agent successfully embedded.');
      await fetchCats();
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setError(err.message || 'Authorization failed.');
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  const handleUpdateSalary = async (id, salary) => {
    setProcessing(true);
    setError('');
    setMessage('');
    try {
      await catsApi.updateSalary(id, salary);
      setMessage('Agent compensation updated.');
      await fetchCats();
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setError(err.message || 'Failed to update compensation.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteCat = async (id) => {
    if (!window.confirm('Action required: Confirm agent retirement. This cannot be undone.')) return;
    
    setProcessing(true);
    setError('');
    setMessage('');
    try {
      await catsApi.delete(id);
      setMessage('Agent successfully retired from service.');
      await fetchCats();
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setError(err.message || 'Retirement procedure failed.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-gray-900 uppercase">Spy Cat Agency</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Intelligence Network</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">System Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts Section */}
        <div className="space-y-4 mb-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-bold text-red-700">{error}</p>
              </div>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-bold text-green-700">{message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div>
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 pl-1">Agent Recruitment</h2>
              <CatForm onSubmit={handleCreateCat} loading={processing} />
            </div>
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
              <h3 className="text-sm font-black uppercase tracking-wider mb-2">Agency Protocol</h3>
              <p className="text-xs leading-relaxed opacity-90 font-medium">
                Ensure all agent dossiers are kept up to date. Salary updates require high-level authorization.
              </p>
            </div>
          </aside>

          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div>
              <div className="flex justify-between items-end mb-4 px-1">
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Active Field Agents</h2>
                <button 
                  onClick={fetchCats}
                  className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Refresh Feed
                </button>
              </div>
              <CatList 
                cats={cats} 
                loading={loading} 
                onUpdateSalary={handleUpdateSalary} 
                onDelete={handleDeleteCat} 
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em]">Confidential - Authorized Personnel Only</p>
      </footer>
    </div>
  );
}
