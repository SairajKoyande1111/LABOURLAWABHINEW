import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import iconLocation from '@assets/placeholder_1783488477011.png';
import iconCall from '@assets/call_1783488542810.png';
import iconMail from '@assets/communication_1783488559887.png';
import { api } from '../lib/api';
import { useLiveContent } from '../hooks/useLiveContent';
import type { ServiceContent } from '../types/content';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  { href: 'https://wa.me/919876543210',               img: '/assets/social-whatsapp.png',  label: 'WhatsApp'  },
  { href: 'https://instagram.com/maruconsultancy',    img: '/assets/social-instagram.png', label: 'Instagram' },
  { href: 'https://linkedin.com/company/maruconsultancy', img: '/assets/social-linkedin.png', label: 'LinkedIn'  },
  { href: 'https://facebook.com/maruconsultancy',     img: '/assets/social-facebook.png',  label: 'Facebook'  },
  { href: 'https://twitter.com/maruconsultancy',      img: '/assets/social-twitter.png',   label: 'Twitter'   },
];

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, setServicesOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [services, setServices] = useState<ServiceContent[]>([]);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const fetchServices = () => {
    api.get<ServiceContent[]>('/services').then(setServices).catch(() => {});
  };
  useEffect(fetchServices, []);
  useLiveContent(fetchServices);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        el.scrollIntoView({ block: 'start' });
        document.documentElement.style.scrollBehavior = prev;
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Clientele', path: '/clientele' },
    { name: 'Resources', path: '/resources' },
    { name: 'Careers', path: '/careers' },
  ];

  // Live from the CMS (Admin → Services), already sorted by rank via the API.
  const serviceLinks = services.map((s) => ({ name: s.title, slug: s.slug }));

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-lg'}`} style={{ backgroundColor: '#172632' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[76px] flex justify-between items-center">

          {/* Logo — full header height, no gaps */}
          <Link to="/" className="self-stretch flex items-stretch -ml-6 lg:-ml-10">
            <img
              src="/assets/maru-logo-new.png"
              alt="Maru Labour Laws — Consultants & Practitioners"
              className="h-full w-auto object-cover block"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const highlighted = active || hoveredLink === link.name;
              return link.hasDropdown ? (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 font-semibold text-[1.05rem] px-4 py-2.5 transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif', color: highlighted ? '#fda102' : '#ffffff' }}
                  >
                    {link.name}
                    <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200" />
                  </Link>
                  {/* Hover underline */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-[2px] transition-transform duration-300 pointer-events-none"
                    style={{ backgroundColor: '#fda102', transform: highlighted ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
                  />
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {serviceLinks.map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`}
                        className="block px-5 py-2.5 text-sm text-gray-700 font-medium transition-colors duration-150"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fda102'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.path}
                    className="font-semibold text-[1.05rem] px-4 py-2.5 block transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif', color: highlighted ? '#fda102' : '#ffffff' }}
                  >
                    {link.name}
                  </Link>
                  {/* Hover underline */}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-[2px] transition-transform duration-300 pointer-events-none"
                    style={{ backgroundColor: '#fda102', transform: highlighted ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
                  />
                </div>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'red' ? 'Switch to Blue & Gold theme' : 'Switch to Red & Yellow theme'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all duration-300 text-xs font-bold"
              style={{
                fontFamily: 'Poppins, sans-serif',
                borderColor: '#fda102',
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#ffffff',
              }}
            >
              <span
                className="relative inline-flex items-center rounded-full transition-colors duration-300"
                style={{ width: 36, height: 20, backgroundColor: '#fda102' }}
              >
                <span
                  className="absolute rounded-full bg-white shadow transition-all duration-300"
                  style={{ width: 14, height: 14, left: theme === 'blue' ? 18 : 3, top: 3 }}
                />
              </span>
              <span style={{ letterSpacing: '0.04em' }}>
                {theme === 'red' ? '🔴 Red' : '🔵 Blue'}
              </span>
            </button>

            <Link to="/contact"
              className="px-7 py-2.5 rounded-full font-bold text-[0.9rem] transition-all duration-200 shadow-sm whitespace-nowrap"
              style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#fda102', color: '#1c3447', border: '2px solid #fda102' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fda102'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fda102'; (e.currentTarget as HTMLElement).style.color = '#1c3447'; }}>
              Contact Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile theme toggle — compact */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="relative flex items-center rounded-full border-2 transition-all duration-300"
              style={{ width: 40, height: 22, borderColor: '#fda102', backgroundColor: '#fda102' }}
            >
              <span
                className="absolute rounded-full bg-white shadow transition-all duration-300"
                style={{ width: 14, height: 14, left: theme === 'blue' ? 21 : 3, top: 2 }}
              />
            </button>
            <button className="p-2 rounded-lg transition-colors" style={{ color: '#ffffff' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                    className="block px-6 py-4 border-b border-gray-100 font-bold text-sm transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif', color: isActive(link.path) ? 'var(--primary)' : '#111111', backgroundColor: isActive(link.path) ? '#fff7ed' : '' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="bg-gray-50">
                      {serviceLinks.map((s) => (
                        <Link key={s.slug} to={`/services/${s.slug}`}
                          className="block pl-10 pr-6 py-3 border-b border-gray-100 text-xs font-semibold transition-colors"
                          style={{ fontFamily: 'Poppins, sans-serif', color: '#444444' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#444444'; }}
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
                  <img src={iconCall} alt="" className="w-4 h-4 object-contain" /> +91 98765 43210
                </a>
                <a href="mailto:contact@labourcodes.in" className="flex items-center gap-2 text-sm text-gray-600">
                  <img src={iconMail} alt="" className="w-4 h-4 object-contain" /> contact@labourcodes.in
                </a>
                <Link to="/contact"
                  className="mt-2 block w-full text-center text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors"
                  style={{ backgroundColor: 'var(--primary)' }}
                  onClick={() => setIsMenuOpen(false)}>
                  Contact Us
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

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="bg-white border-t-4" style={{ borderTopColor: 'var(--primary)' }}>

        {/* Main content grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* ── Col 1: Brand ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}>
              {/* Logo image */}
              <div className="mb-5">
                <img src="/assets/maru-logo-full.png" alt="Maru Consultancy Services"
                  className="h-16 w-auto object-contain" />
              </div>
              {/* Description — black text, base size */}
              <p className="text-base leading-relaxed mb-6"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#111111' }}>
                India's trusted labour law consultancy specializing in HR compliance, statutory filings, payroll, and staffing solutions across 15+ states.
              </p>
              {/* Social icons — uploaded images */}
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map(({ href, img, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-10 h-10 hover:scale-110 transition-transform duration-200">
                    <img src={img} alt={label} className="w-full h-full object-contain" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Col 2: Our Services — all 8 ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h3 className="font-bold text-base mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--primary)' }}>Our Services</h3>
              <ul className="space-y-3">
                {serviceLinks.slice(0, 8).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`}
                      className="text-base flex items-center gap-2.5 transition-colors duration-200"
                      style={{ fontFamily: 'Poppins, sans-serif', color: '#111111' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#111111'; }}>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#fda102' }} />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Col 3: Contact Us ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="font-bold text-base mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--primary)' }}>Contact Us</h3>
              <ul className="space-y-5">
                <li className="flex gap-3" style={{ fontFamily: 'Poppins, sans-serif', color: '#111111' }}>
                  <img src={iconLocation} alt="" aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 object-contain" />
                  <span className="text-base leading-snug">15th Floor, Nariman Point, Mumbai, Maharashtra 400021</span>
                </li>
                <li className="flex gap-3" style={{ fontFamily: 'Poppins, sans-serif', color: '#111111' }}>
                  <img src={iconCall} alt="" aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 object-contain" />
                  <div className="text-base">
                    <a href="tel:+919876543210" className="block transition-colors duration-200 font-medium"
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}>
                      +91 98765 43210
                    </a>
                    <a href="tel:02245678900" className="block transition-colors duration-200"
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}>
                      022 4567 8900
                    </a>
                  </div>
                </li>
                <li className="flex gap-3" style={{ fontFamily: 'Poppins, sans-serif', color: '#111111' }}>
                  <img src={iconMail} alt="" aria-hidden="true" className="w-5 h-5 shrink-0 mt-0.5 object-contain" />
                  <a href="mailto:contact@labourcodes.in"
                    className="text-base transition-colors duration-200 font-medium"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = ''; }}>
                    contact@labourcodes.in
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* ── Col 4: Newsletter ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <h3 className="font-bold text-base mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--primary)' }}>Newsletter</h3>
              <p className="text-base mb-5 leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, color: '#111111' }}>
                Subscribe for critical compliance alerts and regulatory updates.
              </p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="rounded-lg px-4 py-3 text-base focus:outline-none transition-colors"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    backgroundColor: '#f9fafb',
                    border: '1.5px solid #e5e7eb',
                    color: '#111111',
                  }}
                  onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; }}
                  onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; }}
                />
                <button type="submit"
                  className="px-4 py-3 rounded-lg text-base font-bold text-white transition-all duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: 'var(--primary)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#fda102';
                    (e.currentTarget as HTMLElement).style.color = '#1a1a1a';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--primary)';
                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                  }}>
                  Subscribe Now
                </button>
              </form>
            </motion.div>
          </div>

          {/* ── Google Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-10"
            style={{ height: '300px' }}>
            <iframe
              title="Maru Consultancy Services Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0530!2d72.82161!3d18.92556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c2a26c9969%3A0x9b74cf8ec1c57f40!2sNariman%20Point%2C%20Mumbai%2C%20Maharashtra%20400021!5e0!3m2!1sen!2sin!4v1720343000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* ── Bottom bar ── */}
          <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: copyright + Airavata */}
            <div className="text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <p className="text-sm font-medium" style={{ color: '#111111' }}>
                &copy; {new Date().getFullYear()} Maru Consultancy Services Pvt. Ltd. All rights reserved.
              </p>
              <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>
                Designed &amp; Developed by{' '}
                <a href="https://www.airavatatechnologies.com/" target="_blank" rel="noreferrer"
                  className="font-semibold transition-colors duration-200"
                  style={{ color: 'var(--primary)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fda102'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}>
                  Airavata Technologies
                </a>
              </p>
            </div>
            {/* Right: policy links */}
            <div className="flex gap-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((label) => (
                <Link key={label} to="#"
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: '#111111' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#111111'; }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-11 h-11 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
          style={{ backgroundColor: 'var(--primary)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fda102'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--primary)'; }}
          aria-label="Scroll to top">
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
};

export default Layout;
