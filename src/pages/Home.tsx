import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronRight, Star, Quote, TrendingUp, Shield, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_CLIENTS } from '../components/ClientLogos';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

const servicesList = [
  { name: 'Labour Law Compliance', slug: 'labour-law-compliance' },
  { name: 'Payroll & Salary Structuring', slug: 'payroll-structuring' },
  { name: 'Statutory Compliance & Filings', slug: 'statutory-filings' },
  { name: 'People Outsourcing & Staffing', slug: 'contract-staffing' },
  { name: 'Audits & Governance', slug: 'audits-governance' },
  { name: 'Registrations & Licensing', slug: 'registrations-licensing' },
  { name: 'HR Policy & Advisory', slug: 'hr-policy-advisory' },
  { name: 'Legal Representation', slug: 'litigation-support' },
  { name: 'Training & Workshops', slug: 'training-workshops' },
];

const Home = () => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const testimonials = [
    { text: "Labour Codes transformed our chaotic compliance process into a streamlined, risk-free system. Their expertise in the New Wage Code is unmatched.", author: "Rajesh Sharma", role: "HR Director, TechNova" },
    { text: "Their proactive approach to statutory audits saved us from significant penalties. They don't just consult — they partner with you for the long haul.", author: "Meera Reddy", role: "CEO, Manufacturing Corp" },
    { text: "The contract staffing solutions provided by LC allowed us to scale rapidly during peak season without any compliance headaches.", author: "Vikram Singh", role: "VP Operations, Retail Giant" },
  ];

  const whyUs = [
    { icon: TrendingUp, title: "Pan-India Presence", desc: "Deep expertise across state-specific regulations and all central labour legislations from Kashmir to Kanyakumari." },
    { icon: Shield, title: "Proactive Risk Mitigation", desc: "We identify vulnerabilities before they become liabilities — our audits are proactive, not reactive." },
    { icon: Users, title: "Technology-Driven Approach", desc: "Proprietary compliance tracking tools give you real-time dashboards and automated deadline reminders." },
  ];

  return (
    <div className="w-full">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 114px)', minHeight: '500px', maxHeight: '820px' }}>
        <img src="/assets/hero-office.png" alt="Corporate Office"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/30" />

        {/* Decorative bracket */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-1 opacity-70">
          <div className="w-3 h-3 border-t-2 border-l-2 border-teal-400" />
          <div className="w-0.5 h-40 bg-teal-400/40 mx-1" />
          <div className="w-3 h-3 border-b-2 border-l-2 border-teal-400" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="max-w-2xl">

            <motion.span variants={fadeUp}
              className="inline-block text-teal-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">
              LABOUR CODES
            </motion.span>

            <motion.h1 variants={fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.15] mb-5">
              Future is perfect when your present makes sense
            </motion.h1>

            <motion.div variants={fadeUp} className="space-y-1.5 mb-7 text-white/80 text-sm font-medium">
              <p>✦ 500+ Corporate Clients across India</p>
              <p>✦ 21+ Years of uninterrupted compliance excellence</p>
              <p>✦ 50+ Dedicated Labour Law Experts</p>
              <p>✦ 15+ States covered with local regulatory expertise</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-7 py-3 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02]">
                Free Consultation <ArrowRight size={15} />
              </Link>

              {/* Services dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/25 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-white/20 transition-all">
                  Our Services
                  <ChevronDown size={15} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    {servicesList.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-2.5 px-5 py-2.5 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                        {s.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-14 items-center">

            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.55 }}>
                <p className="text-teal-500 font-bold tracking-[0.18em] uppercase text-xs mb-4">Why Labour Codes</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-5 leading-snug">
                  Expertise that protects your business and empowers your workforce.
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed text-[15px]">
                  We don't just file paperwork — we architect robust compliance frameworks. With India's labour law landscape shifting dramatically under the New Codes, you need a partner who anticipates regulatory changes before they impact your bottom line.
                </p>
                <div className="space-y-5">
                  {whyUs.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-0.5 bg-teal-50 text-teal-500 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-navy-900 mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/about"
                  className="inline-flex items-center gap-2 mt-9 bg-navy-900 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-teal-600 transition-colors shadow-md">
                  Learn Our Story <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>

            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/assets/service-hr.png" alt="HR Experts" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-7 -left-7 bg-navy-900 text-white p-6 rounded-2xl shadow-2xl max-w-xs hidden md:block border border-white/5">
                  <Quote size={24} className="text-teal-400 mb-3 opacity-60" />
                  <p className="font-display text-sm leading-relaxed italic">"Compliance is not a cost center; it's the foundation of sustainable growth."</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Preview ──────────────────────────────── */}
      <section className="py-20 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-teal-500 font-bold tracking-[0.18em] uppercase text-xs mb-3">Our Expertise</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-4">Comprehensive Compliance Solutions</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Strategic guidance across the entire spectrum of Indian labour laws and human resource management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { title: 'Labour Law Compliance', img: '/assets/service-labour.png', slug: 'labour-law-compliance', desc: 'End-to-end compliance with all applicable central and state labour legislation, shielding your business from penal consequences.' },
              { title: 'Payroll & Salary Structuring', img: '/assets/service-payroll.png', slug: 'payroll-structuring', desc: 'Payroll processing and salary structure auditing fully optimized for the new Labour Code definitions of wages.' },
              { title: 'Statutory Filings', img: '/assets/service-statutory.png', slug: 'statutory-filings', desc: 'PF, ESIC, PT, LWF, TDS management with regular returns and on-time statutory filings.' },
            ].map((service, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={service.img} alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/25 to-transparent" />
                </div>
                <div className="p-7 flex-grow flex flex-col">
                  <h3 className="text-lg font-display font-bold text-navy-900 mb-3">{service.title}</h3>
                  <p className="text-gray-500 mb-6 flex-grow text-sm leading-relaxed">{service.desc}</p>
                  <Link to={`/services/${service.slug}`}
                    className="text-teal-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2.5 transition-all mt-auto">
                    Explore Details <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services"
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-teal-600 transition-colors shadow-md">
              View All 9 Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #00C2A0 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-14">
            <p className="text-teal-400 font-bold tracking-[0.18em] uppercase text-xs mb-3">Client Feedback</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Trusted by Industry Leaders</h2>
            <p className="text-white/45 text-sm">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((test, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/8 transition-colors">
                <div className="flex text-teal-400 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-medium italic mb-7 leading-relaxed text-white/85">"{test.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm shrink-0">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{test.author}</p>
                    <p className="text-xs text-white/45 mt-0.5">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scrolling Client Logos ────────────────────────── */}
      <section className="py-10 bg-white border-y border-gray-100 overflow-hidden">
        <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.22em] mb-8">Serving 500+ Corporations Across India</p>
        <div className="overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="animate-marquee">
            {[...ALL_CLIENTS, ...ALL_CLIENTS].map(({ name, Logo }, i) => (
              <div key={i} title={name}
                className="flex items-center justify-center mx-10 shrink-0 h-14 transition-all duration-300 cursor-default">
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Insights ───────────────────────────────── */}
      <section className="py-20 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-teal-500 font-bold tracking-[0.18em] uppercase text-xs mb-2">Latest Insights ——</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">Stay informed with expert guidance</h2>
            </div>
            <Link to="/resources"
              className="hidden md:flex items-center gap-2 text-navy-900 font-semibold text-sm hover:text-teal-600 transition-colors border-b border-navy-900 hover:border-teal-600 pb-0.5">
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { category: 'New Labour Codes', title: 'Understanding the New Wage Code', desc: 'A comprehensive guide to how the new definitions of wages impact your salary structure and PF contributions.', img: '/assets/service-payroll.png', date: 'Oct 15, 2024' },
              { category: 'Compliance', title: 'Navigating State-Specific Leave Policies', desc: 'Analyzing the variations in sick, casual, and earned leaves across different Indian states.', img: '/assets/service-hr.png', date: 'Oct 02, 2024' },
              { category: 'Labour Audit', title: 'Preparing for Labour Inspections', desc: 'Key documents and statutory registers you must have updated before an unexpected factory inspection.', img: '/assets/service-audits.png', date: 'Sep 28, 2024' },
            ].map((post, i) => (
              <div key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
                <div className="relative overflow-hidden h-48">
                  <img src={post.img} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-teal-500 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-[11px] text-teal-500 font-semibold mb-2 uppercase tracking-wider">{post.date}</p>
                  <h3 className="text-base font-display font-bold text-navy-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-5 flex-grow leading-relaxed">{post.desc}</p>
                  <Link to="/resources"
                    className="text-teal-600 font-bold text-sm flex items-center gap-1.5 hover:text-navy-900 transition-colors mt-auto">
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="py-20 bg-teal-500 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 md:px-10 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">Ready to secure your compliance?</h2>
          <p className="text-white/80 text-base mb-10 leading-relaxed">Schedule a detailed consultation with our legal experts to audit your current HR practices and identify risks.</p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-10 py-4 rounded-full font-bold hover:bg-navy-800 transition-colors shadow-xl text-sm">
            Schedule Consultation Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
