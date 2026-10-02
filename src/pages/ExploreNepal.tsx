import { useState } from 'react';
import { motion } from 'framer-motion';
import { provinces, allDistricts } from '../data/nepalLocations';

export default function ExploreNepal() {
  const [selectedProvince, setSelectedProvince] = useState<number | null>(
    provinces[0]?.id ?? null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(
    allDistricts.find(d => d.provinceId === (provinces[0]?.id ?? -1))?.id ?? null
  );

  const selectedProv = provinces.find(p => p.id === selectedProvince);
  const selectedDist = allDistricts.find(d => d.id === selectedDistrict);
  const districtsForProvince = allDistricts.filter(d => d.provinceId === selectedProvince);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-display font-bold text-gray-900"
          >
            Explore Nepal - Provinces & Districts
          </motion.h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover Nepal's diverse geography across 7 provinces, 77 districts. From the towering Himalayas (Mountain) to the mid-hills (Hill) and fertile plains (Terai). Every location has unique education needs and opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="bi bi-geo-alt-fill text-nepal-600"></i>
              Provinces (प्रदेशहरू)
            </h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {provinces.map((province) => (
                <button
                  key={province.id}
                  onClick={() => {
                    setSelectedProvince(province.id);
                    setSelectedDistrict(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedProvince === province.id
                      ? 'bg-nepal-50 border-2 border-nepal-600 shadow-sm'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{province.name}</p>
                      <p className="text-sm text-gray-600">{province.nameNepali} • {province.code}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        province.region === 'Mountain' ? 'bg-blue-100 text-blue-800' :
                        province.region === 'Hill' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {province.region}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Capital: {province.capital}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="bi bi-map text-nepal-600"></i>
              Districts (जिल्लाहरू)
              {selectedProv && <span className="text-sm font-normal text-gray-600"> - {selectedProv.name}</span>}
            </h2>
            {selectedProvince ? (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {districtsForProvince.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => setSelectedDistrict(district.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedDistrict === district.id
                        ? 'bg-nepal-50 border-2 border-nepal-600 shadow-sm'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{district.name}</p>
                      <p className="text-sm text-gray-600">{district.nameNepali}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div>HQ: {district.headquarter}</div>
                        {district.population && <div>Pop: {district.population.toLocaleString()}</div>}
                        {district.areaKm2 && <div>Area: {district.areaKm2} km²</div>}
                        {district.literacy && <div>Literacy: {district.literacy}%</div>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <i className="bi bi-hand-index-thumb text-4xl mb-3"></i>
                <p>Select a province to view districts</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="bi bi-info-circle text-nepal-600"></i>
              Location Details
            </h2>
            {selectedProv || selectedDist ? (
              <div className="space-y-6">
                {selectedProv && (
                  <div className="p-4 bg-gradient-to-br from-nepal-50 to-white rounded-lg border border-nepal-200">
                    <h3 className="font-semibold text-gray-900">{selectedProv.name} ({selectedProv.nameNepali})</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedProv.code} • Capital: {selectedProv.capital}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedProv.region === 'Mountain' ? 'bg-blue-100 text-blue-800' :
                        selectedProv.region === 'Hill' ? 'bg-green-100 text-green-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {selectedProv.region} Region
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {districtsForProvince.length} Districts
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p><strong>Education Context:</strong> {selectedProv.region === 'Mountain' ? 'Remote, high altitude, limited connectivity, multi-grade teaching needs.' : selectedProv.region === 'Hill' ? 'Mixed access, hilly terrain, growing connectivity, need for localized content.' : 'High population density, better infrastructure but urban-rural gaps, language diversity.'}</p>
                    </div>
                  </div>
                )}
                {selectedDist && (
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900">{selectedDist.name} ({selectedDist.nameNepali})</h3>
                    <p className="text-sm text-gray-600 mt-1">Headquarter: {selectedDist.headquarter}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      {selectedDist.population && (
                        <div>
                          <p className="text-gray-500">Population</p>
                          <p className="font-medium">{selectedDist.population.toLocaleString()}</p>
                        </div>
                      )}
                      {selectedDist.areaKm2 && (
                        <div>
                          <p className="text-gray-500">Area</p>
                          <p className="font-medium">{selectedDist.areaKm2} km²</p>
                        </div>
                      )}
                      {selectedDist.literacy && (
                        <div>
                          <p className="text-gray-500">Literacy Rate</p>
                          <p className="font-medium">{selectedDist.literacy}%</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 text-sm text-gray-700">
                      <p><strong>Focus Areas:</strong> Rural access, teacher training, offline resources, and bridging digital divide based on local terrain and connectivity.</p>
                    </div>
                  </div>
                )}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-lightbulb-fill text-blue-600 text-xl mt-0.5"></i>
                    <div>
                      <h4 className="font-medium text-blue-900">Tiny Details Matter</h4>
                      <p className="text-sm text-blue-800 mt-1 leading-relaxed">
                        Each location's unique terrain (mountain/hill/terai), remoteness, language, and infrastructure shape education needs. Study Hub tailors resources to these local realities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <i className="bi bi-geo text-4xl mb-3"></i>
                <p>Select province/district to see details</p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <i className="bi bi-info-square"></i>
            Nepal at a Glance - Geographic Context
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 flex items-center gap-2"><i className="bi bi-mountains"></i> Mountain (Himalayan)</h4>
              <p className="mt-1">High altitude, remote, limited infrastructure & connectivity. Prioritizes offline-first, solar power, and mobile learning units.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 flex items-center gap-2"><i className="bi bi-hill"></i> Hill (Pahad)</h4>
              <p className="mt-1">Hilly terrain with mixed urban-rural access. Needs localized content, teacher training, and improved connectivity solutions.</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 flex items-center gap-2"><i className="bi bi-tree"></i> Terai (Plains)</h4>
              <p className="mt-1">Fertile plains, higher population density, greater diversity. Focus on equity, language barriers, and quality education for all.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}