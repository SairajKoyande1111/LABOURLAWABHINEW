import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ChevronDown, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoMark = () => (
  <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="15" cy="4" r="2.4" fill="#9B1C1C"/>
    <line x1="15" y1="6" x2="15" y2="24" stroke="#9B1C1C" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="27" y2="10" stroke="#9B1C1C" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="5" y1="10" x2="5" y2="14" stroke="#9B1C1C" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="25" y1="10" x2="25" y2="14" stroke="#9B1C1C" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M1 14 Q5 21 9 14" stroke="#9B1C1C" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M21 14 Q25 21 29 14" stroke="#9B1C1C" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <line x1="10" y1="24" x2="20" y2="24" stroke="#9B1C1C" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const LogoMarkWhite = () => (
  <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="15" cy="4" r="2.4" fill="white"/>
    <line x1="15" y1="6" x2="15" y2="24" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="27" y2="10" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="5" y1="10" x2="5" y2="14" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="25" y1="10" x2="25" y2="14" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M1 14 Q5 21 9 14" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M21 14 Q25 21 29 14" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <line x1="10" y1="24" x2="20" y2="24" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconFacebook = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Clientele', path: '/clientele' },
    { name: 'Resources', path: '/resources' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Labour Law Compliance', slug: 'labour-law-compliance' },
    { name: 'Payroll & Salary Structuring', slug: 'payroll-structuring' },
    { name: 'Statutory Filings', slug: 'statutory-filings' },
    { name: 'Contract Staffing', slug: 'contract-staffing' },
    { name: 'Audits & Governance', slug: 'audits-governance' },
    { name: 'Registrations & Licensing', slug: 'registrations-licensing' },
    { name: 'HR Policy & Advisory', slug: 'hr-policy-advisory' },
    { name: 'Legal Representation', slug: 'litigation-support' },
    { name: 'Training & Workshops', slug: 'training-workshops' },
  ];

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[76px] flex justify-between items-center">

          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <LogoMark />
            <span className="font-bold text-[1.25rem] text-navy-900 tracking-tight leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>Maru Consultancy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 font-semibold text-[0.95rem] px-4 py-2.5 rounded-md transition-all ${
                      isActive(link.path)
                        ? 'text-teal-600'
                        : 'text-gray-800 hover:text-teal-600'
                    }`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {link.name}
                    <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />
                  </Link>
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {serviceLinks.map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`}
                        className="block px-5 py-2.5 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-semibold text-[0.95rem] px-4 py-2.5 rounded-md transition-all ${
                    isActive(link.path)
                      ? 'text-teal-600'
                      : 'text-gray-800 hover:text-teal-600'
                  }`}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/contact"
              className="bg-navy-900 text-white px-7 py-2.5 rounded-full font-bold text-[0.9rem] hover:bg-teal-600 transition-colors shadow-sm whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              Let's Connect
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-navy-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden absolute top-[72px] left-0 w-full bg-white shadow-xl border-t border-gray-100 z-50 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}>
                  <Link
                    to={link.path}
                    className={`block px-6 py-4 border-b border-gray-50 font-medium text-sm ${isActive(link.path) ? 'text-teal-600 bg-teal-50' : 'text-gray-700'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="bg-gray-50">
                      {serviceLinks.map((s) => (
                        <Link key={s.slug} to={`/services/${s.slug}`}
                          className="block pl-10 pr-6 py-3 border-b border-gray-100 text-xs font-medium text-gray-600 hover:text-teal-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}>
                          › {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="p-5 flex flex-col gap-3">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-teal-500" /> +91 98765 43210
                </a>
                <a href="mailto:contact@labourcodes.in" className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-teal-500" /> contact@labourcodes.in
                </a>
                <Link to="/contact"
                  className="mt-2 block w-full text-center bg-navy-900 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}>
                  Let's Connect
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-4 border-teal-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3.5 mb-5">
                <LogoMarkWhite />
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-xl text-white tracking-tight leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>Maru Consultancy</span>
                  <span className="text-[9px] font-semibold text-teal-400 tracking-[0.22em] uppercase mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Labour Laws Consultants & Practitioners</span>
                </div>
              </div>
              <p className="text-white/55 mb-6 text-sm leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                India's trusted labour law consultancy specializing in HR compliance, statutory filings, payroll, and staffing solutions across 15+ states.
              </p>
              <div className="flex gap-2.5">
                <a href="https://facebook.com" target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <IconFacebook />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <IconLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors">
                  <IconTwitter />
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h3 className="font-bold text-sm mb-6 text-white uppercase tracking-wider">Our Services</h3>
              <ul className="space-y-3">
                {serviceLinks.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}
                      className="text-white/55 hover:text-teal-400 text-sm transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="font-bold text-sm mb-6 text-white uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-white/55 text-sm">
                  <MapPin size={16} className="text-teal-400 shrink-0 mt-0.5" />
                  <span>15th Floor, Nariman Point, Mumbai, Maharashtra 400021</span>
                </li>
                <li className="flex gap-3 text-white/55 text-sm">
                  <Phone size={15} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <a href="tel:+919876543210" className="block hover:text-teal-400 transition-colors">+91 98765 43210</a>
                    <a href="tel:02245678900" className="block hover:text-teal-400 transition-colors">022 4567 8900</a>
                  </div>
                </li>
                <li className="flex gap-3 text-white/55 text-sm">
                  <Mail size={15} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <a href="mailto:contact@labourcodes.in" className="block hover:text-teal-400 transition-colors">contact@labourcodes.in</a>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h3 className="font-bold text-sm mb-6 text-white uppercase tracking-wider">Newsletter</h3>
              <p className="text-white/55 text-sm mb-4 leading-relaxed">Subscribe for critical compliance alerts and regulatory updates.</p>
              <form className="flex flex-col gap-2.5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition-colors placeholder:text-white/35"
                />
                <button type="submit"
                  className="bg-teal-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-teal-600 transition-colors">
                  Subscribe Now
                </button>
              </form>
            </motion.div>
          </div>

          <div className="pt-8 border-t border-white/10 text-white/35 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Maru Consultancy Services Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-navy-900 hover:bg-teal-500 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
          aria-label="Scroll to top">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default Layout;
