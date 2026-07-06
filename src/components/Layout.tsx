import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Menu, X, ChevronRight, MessageCircle } from 'lucide-react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Clientele', path: '/clientele' },
    { name: 'Resources', path: '/resources' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Contact Strip */}
      <div className="bg-navy-900 text-white/80 py-2 px-4 md:px-8 text-xs md:text-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={14} className="text-teal-500" /> +91 98765 43210</span>
            <span className="flex items-center gap-1"><Mail size={14} className="text-teal-500" /> contact@labourcodes.in</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>Mumbai | Delhi | Bangalore | Chennai</span>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-navy-900 text-white font-display font-bold text-2xl px-2 py-1 rounded">LC</span>
              <span className="font-display font-bold text-2xl text-navy-900">Labour Codes</span>
            </div>
            <span className="text-xs text-gray-500 font-medium tracking-wider mt-0.5 uppercase">Labour Laws | Compliance | Staffing</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`font-medium transition-colors hover:text-teal-600 ${location.pathname === link.path ? 'text-teal-600' : 'text-navy-900'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-teal-500 text-white px-5 py-2 rounded font-medium hover:bg-teal-600 transition-colors">
              Consult Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-navy-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="px-6 py-4 border-b border-gray-100 font-medium text-navy-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white pt-16 pb-8 border-t-[8px] border-teal-500">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-white text-navy-900 font-display font-bold text-2xl px-2 py-1 rounded">LC</span>
              <span className="font-display font-bold text-2xl text-white">Labour Codes</span>
            </div>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              India's premier professional services firm navigating the complexities of New Labour Codes, HR compliance, and staffing solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer text-sm font-bold">in</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer text-sm font-bold">tw</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer text-sm font-bold">fb</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer text-sm font-bold">yt</a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-teal-500 transition-colors cursor-pointer text-sm font-bold">ig</a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl mb-6 text-white">Recent Updates</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/resources" className="group block">
                  <p className="text-sm text-teal-400 mb-1">Oct 15, 2024</p>
                  <p className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">Understanding the New Wage Code Implications</p>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="group block">
                  <p className="text-sm text-teal-400 mb-1">Oct 02, 2024</p>
                  <p className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">Navigating State-Specific Leave Policies</p>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-white/70 text-sm">
                <MapPin size={18} className="text-teal-500 shrink-0" />
                <span>15th Floor, Nariman Point, Mumbai, Maharashtra 400021</span>
              </li>
              <li className="flex gap-3 text-white/70 text-sm">
                <Phone size={18} className="text-teal-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-white/70 text-sm">
                <Mail size={18} className="text-teal-500 shrink-0" />
                <span>contact@labourcodes.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl mb-6 text-white">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">Subscribe to receive critical compliance updates directly in your inbox.</p>
            <form className="flex flex-col gap-3">
              <input type="email" placeholder="Your Email Address" className="bg-white/10 border border-white/20 text-white rounded px-4 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition-colors" />
              <button type="button" className="bg-teal-500 text-white px-4 py-2.5 rounded text-sm font-bold hover:bg-teal-600 transition-colors">Subscribe Now</button>
            </form>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-white/10 text-center md:text-left text-white/50 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Labour Codes Consulting. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a href="tel:+919876543210" className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 hover:scale-110 transition-all">
          <Phone size={24} />
        </a>
        <a href="https://wa.me/919876543210" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#20b858] hover:scale-110 transition-all">
          <MessageCircle size={28} />
        </a>
      </div>
    </div>
  );
};

export default Layout;