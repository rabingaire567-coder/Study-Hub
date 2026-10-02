import { useState } from 'react';
import { motion } from 'framer-motion';
import { learningResources } from '../data/learningResources';
import { provinces } from '../data/nepalLocations';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'primary', label: 'Primary' },
  { id: 'secondary', label: 'Secondary' },
  { id: 'higher', label: 'Higher' },
  { id: 'vocational', label: 'Vocational' },
  { id: 'digital', label: 'Digital' },
  { id: 'inclusive', label: 'Inclusive' },
];

const levels = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

export default function LearningResources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = learningResources.filter(r => {
    const catMatch = selectedCategory === 'all' || r.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || r.level === selectedLevel;
    const searchMatch = search === '' ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return catMatch && levelMatch && searchMatch;
  });

  const categoryColors: Record<string, string> = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    higher: 'bg-indigo-100 text-indigo-800',
    vocational: 'bg-amber-100 text-amber-800',
    digital: 'bg-cyan-100 text-cyan-800',
    inclusive: 'bg-emerald-100 text-emerald-800',
  };

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-display font-bold text-gray-900"
          >
            Learning Resources
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Curated educational resources tailored to Nepal's needs - offline-first, low-bandwidth, multilingual, and mapped to local contexts across all provinces.
          </p>
        </div>

        <div className="card mb-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Resources</label>
              <div className="relative">
                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, description, or tags..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-500 focus:border-nepal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-500 focus:border-nepal-500"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-500 focus:border-nepal-500"
              >
                {levels.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filtered.length} of {learningResources.length} resources
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((res, i) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[res.category]}`}>
                    {res.category}
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[res.level]}`}>
                    {res.level}
                  </span>
                </div>
                {res.offline && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <i className="bi bi-wifi-off"></i> Offline
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{res.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{res.description}</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                  <i className="bi bi-translate"></i>
                  <span>{res.language === 'mixed' ? 'Nepali & English' : res.language === 'nepali' ? 'नेपाली' : 'English'}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {res.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-nepal-700 hover:text-nepal-800 transition-colors">
                  <i className="bi bi-journal-text"></i>
                  View Details
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-nepal-600 text-white text-sm font-medium rounded-lg hover:bg-nepal-700 transition-colors">
                  <i className="bi bi-download"></i>
                  Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 card bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="bi bi-info-circle-fill text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Province-Specific Resources</h3>
              <p className="mt-2 text-blue-800 leading-relaxed">
                Content can be filtered and customized by province/district. Resources are designed with local context - geography (Mountain/Hill/Terai), culture, languages, and specific challenges of each location.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
                {provinces.map(p => (
                  <div key={p.id} className="bg-white/80 rounded-lg p-2 text-center border border-blue-200">
                    <p className="font-medium text-blue-900">{p.name}</p>
                    <p className="text-blue-700">{p.region}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}