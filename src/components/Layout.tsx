import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home', icon: 'bi-house-door' },
  { path: '/explore', label: 'Explore Nepal', icon: 'bi-map' },
  { path: '/problems', label: 'Problems & Solutions', icon: 'bi-lightbulb' },
  { path: '/resources', label: 'Resources', icon: 'bi-journal-bookmark' },
  { path: '/ai', label: 'AI Tutor', icon: 'bi-robot' },
  { path: '/about', label: 'About', icon: 'bi-info-circle' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass sticky top-0 z-50 border-b border-gray-200/60 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className="w-9 h-9 bg-gradient-to-br from-nepal-600 to-nepal-800 rounded-lg flex items-center justify-center shadow-md"
                >
                  <i className="bi bi-book-half text-white text-xl"></i>
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg text-gray-900 leading-tight">Study Hub</span>
                  <span className="text-xs text-nepal-700 font-medium -mt-0.5">Education for All • नेपाल</span>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'text-nepal-800 bg-nepal-50'
                        : 'text-gray-700 hover:text-nepal-700 hover:bg-nepal-50/60'
                    }`}
                  >
                    <i className={`${item.icon} text-base`}></i>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-x-2 bottom-1 h-0.5 bg-nepal-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-nepal-500"
              >
                <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-list'} text-xl`}></i>
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                        isActive
                          ? 'bg-nepal-50 text-nepal-800'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <i className={`${item.icon} text-base`}></i>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-900 text-gray-300 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-nepal-600 to-nepal-800 rounded-lg flex items-center justify-center">
                  <i className="bi bi-book-half text-white text-xl"></i>
                </div>
                <div>
                  <span className="font-display font-bold text-lg text-white">Study Hub</span>
                  <p className="text-xs text-gray-400">Education for All - नेपाल</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                Empowering learners across Nepal's 7 provinces - from the Himalayas to Terai. Bridging the digital divide through accessible, inclusive, and localized education.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/explore" className="hover:text-white transition-colors">Explore Nepal</Link></li>
                <li><Link to="/problems" className="hover:text-white transition-colors">Problems & Solutions</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Learning Resources</Link></li>
                <li><Link to="/ai" className="hover:text-white transition-colors">AI Tutor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Focus Areas</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><i className="bi bi-universal-access-circle"></i> Inclusive Education</li>
                <li className="flex items-center gap-2"><i className="bi bi-wifi-off"></i> Offline-First</li>
                <li className="flex items-center gap-2"><i className="bi bi-translate"></i> Multilingual</li>
                <li className="flex items-center gap-2"><i className="bi bi-gender-ambiguous"></i> Gender Equity</li>
                <li className="flex items-center gap-2"><i className="bi bi-signpost-2"></i> Rural & Remote</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Study Hub - Education for All. Made with ❤️ for Nepal.</p>
            <p className="mt-2 md:mt-0">Accessible • Inclusive • Sustainable</p>
          </div>
        </div>
      </footer>
    </div>
  );
}