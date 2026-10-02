import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import nepalMap from '../assets/nepal-map.svg?raw';
import { useState } from 'react';

export default function Home() {
  const [stats] = useState([
    { label: 'Provinces', value: '7', icon: 'bi-geo-alt', desc: 'Koshi • Madhesh • Bagmati • Gandaki • Lumbini • Karnali • Sudurpashchim' },
    { label: 'Districts', value: '77', icon: 'bi-map', desc: 'From mountain peaks to Terai plains' },
    { label: 'Focus', value: 'All', icon: 'bi-people', desc: 'Education for All - inclusive & equitable' },
    { label: 'Resources', value: 'Offline', icon: 'bi-wifi-off', desc: 'Low-bandwidth & offline-first' },
  ]);

  const features = [
    { title: 'Nepal-Focused', desc: 'Detailed location data for all provinces, districts with tiny details tailored to local context.', icon: 'bi-compass', color: 'from-blue-500 to-blue-600' },
    { title: 'AI-Powered Tutor', desc: 'Gemini AI assistant that understands Nepal\'s education challenges and provides localized guidance.', icon: 'bi-robot', color: 'from-purple-500 to-purple-600' },
    { title: 'Problems & Solutions', desc: 'Research-based approach to education challenges with practical, implementable solutions.', icon: 'bi-lightbulb', color: 'from-amber-500 to-amber-600' },
    { title: 'Offline-First', desc: 'Works without internet. Designed for rural/remote areas bridging the digital divide.', icon: 'bi-cloud-download', color: 'from-emerald-500 to-emerald-600' },
    { title: 'Inclusive by Design', desc: 'Accessibility, gender equity, multilingual support - leaving no one behind.', icon: 'bi-universal-access', color: 'from-teal-500 to-teal-600' },
    { title: 'Localized Content', desc: 'Resources mapped to provinces/districts with mountain/hill/terai specific context.', icon: 'bi-geo', color: 'from-cyan-500 to-cyan-600' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-nepal-50 via-white to-himalayan/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nepal-100 text-nepal-800 text-sm font-medium mb-6 shadow-sm animate-pulse-soft">
                <i className="bi bi-stars"></i>
                Education for All • Theme Aligned
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900 leading-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-nepal-700 to-nepal-500">Study Hub</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Empowering learners across Nepal — from the majestic Himalayas to the fertile Terai. Bridging the digital divide with accessible, inclusive, and localized education for every child, youth, and adult.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/explore" className="btn-primary group">
                  Explore Nepal
                  <i className="bi bi-arrow-right transition-transform group-hover:translate-x-1"></i>
                </Link>
                <Link to="/ai" className="btn-secondary group">
                  <i className="bi bi-robot"></i>
                  Ask AI Tutor
                </Link>
                <Link to="/resources" className="btn-secondary group">
                  <i className="bi bi-journal-bookmark"></i>
                  Learning Resources
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <i className="bi bi-check-circle-fill text-nepal-600"></i>
                  Made for Nepal
                </div>
                <div className="flex items-center gap-2">
                  <i className="bi bi-check-circle-fill text-nepal-600"></i>
                  Offline-First
                </div>
                <div className="flex items-center gap-2">
                  <i className="bi bi-check-circle-fill text-nepal-600"></i>
                  AI Integrated
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="relative rounded-2xl p-6 bg-white/70 backdrop-blur-sm border border-gray-200 shadow-xl">
                <div dangerouslySetInnerHTML={{ __html: nepalMap }} className="w-full h-auto" />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-2 rounded-lg shadow-md text-xs font-medium text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nepal-600 animate-pulse"></div>
                  7 Provinces • 77 Districts
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-himalayan to-blue-600 rounded-lg flex items-center justify-center">
                    <i className="bi bi-robot text-white"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">AI Tutor Ready</p>
                    <p className="text-xs text-gray-600">Ask in Nepali or English</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-nepal-100 to-nepal-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className={`${stat.icon} text-nepal-700 text-xl`}></i>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{stat.label}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900">Key Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              Built specifically for Nepal's unique geography, languages, and education challenges with a focus on "Education for All".
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <i className={`${feature.icon} text-white text-xl`}></i>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 text-lg">{feature.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-nepal-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-nepal-700 to-nepal-600 rounded-2xl shadow-xl p-8 sm:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-pattern"></div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Education for All - Leaving No One Behind</h2>
              <p className="mt-4 text-lg text-nepal-50 max-w-3xl mx-auto">
                Aligned with the global Education for All goal, Study Hub addresses Nepal's real challenges: access, equity, quality, inclusion, and lifelong learning opportunities for all.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/problems" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-nepal-800 font-medium rounded-lg hover:bg-nepal-50 transition-colors shadow-sm">
                  View Problems & Solutions
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/ai" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium rounded-lg hover:bg-white/30 transition-colors">
                  <i className="bi bi-robot"></i>
                  Get AI Assistance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}