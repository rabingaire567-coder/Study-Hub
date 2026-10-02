import { useState } from 'react';
import { motion } from 'framer-motion';
import { problemsSolutions } from '../data/problemsSolutions';

const categories = [
  { id: 'all', label: 'All', icon: 'bi-grid' },
  { id: 'access', label: 'Access', icon: 'bi-door-open' },
  { id: 'digital', label: 'Digital Divide', icon: 'bi-wifi' },
  { id: 'language', label: 'Language', icon: 'bi-translate' },
  { id: 'gender', label: 'Gender', icon: 'bi-gender-female' },
  { id: 'disability', label: 'Disability', icon: 'bi-universal-access' },
  { id: 'teacher', label: 'Teachers', icon: 'bi-person-workspace' },
  { id: 'economic', label: 'Economic', icon: 'bi-cash-stack' },
  { id: 'infrastructure', label: 'Infrastructure', icon: 'bi-building' },
];

const regions = [
  { id: 'all', label: 'All Regions' },
  { id: 'Mountain', label: 'Mountain' },
  { id: 'Hill', label: 'Hill' },
  { id: 'Terai', label: 'Terai' },
];

export default function ProblemsSolutions() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showNepali, setShowNepali] = useState(false);

  const filtered = problemsSolutions.filter(ps => {
    const catMatch = selectedCategory === 'all' || ps.category === selectedCategory;
    const regMatch = selectedRegion === 'all' || ps.region.includes(selectedRegion as any);
    return catMatch && regMatch;
  });

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-green-100 text-green-800 border-green-200',
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
            Problems & Solutions - Education for All
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
            Research-based analysis of education challenges in Nepal and practical, implementable solutions. Addressing access, equity, quality, and inclusion across all 7 provinces and regions.
          </p>
        </div>

        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-nepal-700 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className={cat.icon}></i>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Region:</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-nepal-500 focus:border-nepal-500"
                >
                  {regions.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </div>
              <button
                onClick={() => setShowNepali(!showNepali)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                  showNepali ? 'bg-nepal-50 border-nepal-600 text-nepal-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className="bi bi-translate"></i>
                {showNepali ? 'Hide Nepali' : 'Show Nepali'}
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filtered.length} of {problemsSolutions.length} problem-solution pairs
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((ps, i) => (
            <motion.div
              key={ps.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${priorityColors[ps.priority]}`}>
                      {ps.priority.toUpperCase()} PRIORITY
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {ps.region.map(r => (
                        <span key={r} className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          r === 'Mountain' ? 'bg-blue-100 text-blue-800' :
                          r === 'Hill' ? 'bg-green-100 text-green-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="bi bi-exclamation-triangle-fill text-red-600"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Problem</h3>
                        <p className="text-gray-700 mt-1 leading-relaxed">{ps.problem}</p>
                        {showNepali && ps.problemNepali && (
                          <p className="text-gray-600 mt-2 leading-relaxed border-l-2 border-gray-300 pl-3">{ps.problemNepali}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="bi bi-lightbulb-fill text-green-600"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Solution</h3>
                        <p className="text-gray-700 mt-1 leading-relaxed">{ps.solution}</p>
                        {showNepali && ps.solutionNepali && (
                          <p className="text-gray-600 mt-2 leading-relaxed border-l-2 border-gray-300 pl-3">{ps.solutionNepali}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <i className="bi bi-search text-4xl text-gray-400"></i>
            <p className="mt-3 text-gray-600">No results match the selected filters.</p>
          </div>
        )}

        <div className="mt-10 card bg-gradient-to-br from-nepal-50 to-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-nepal-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <i className="bi bi-book-half text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Education for All - Our Approach</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                These solutions are designed to be practical and implementable in Nepal's context - prioritizing offline-first approaches, low-cost solutions, community involvement, and respect for local languages and cultures. The focus is on equity, inclusion, and leaving no one behind across Mountain, Hill, and Terai regions.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-nepal-200 text-nepal-800">
                  <i className="bi bi-wifi-off"></i> Offline-First
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-nepal-200 text-nepal-800">
                  <i className="bi bi-coin"></i> Low-Cost
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-nepal-200 text-nepal-800">
                  <i className="bi bi-people"></i> Community-Based
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-nepal-200 text-nepal-800">
                  <i className="bi bi-globe2"></i> Culturally Relevant
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-full border border-nepal-200 text-nepal-800">
                  <i className="bi bi-universal-access"></i> Inclusive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}