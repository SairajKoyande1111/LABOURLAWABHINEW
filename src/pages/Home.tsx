import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Star, Quote, TrendingUp, Shield, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_CLIENTS } from '../components/ClientLogos';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
};

const slidingPhrases = [
  'Labour Compliance to',
  'Payroll Solutions to',
  'HR Outsourcing to',
  'Statutory Filings to',
  'Legal Expertise to',
];

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
  const [phraseIndex, setPhraseIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % slidingPhrases.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { text: "Labour Law transformed our chaotic compliance process into a streamlined, risk-free system. Their expertise in the New Wage Code is unmatched.", author: "Rajesh Sharma", role: "HR Director, TechNova" },
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
      <section className="relative overflow-hidden bg-white py-16 lg:py-0 lg:min-h-[620px] lg:flex lg:items-center">
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.55 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* ── Left: Text Content ── */}
            <motion.div
              className="lg:w-1/2 flex flex-col"
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.13 } } }}>

              <motion.h1 variants={fadeUp}
                className="font-bold leading-[1.08] mb-6"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.6rem, 5vw, 3.8rem)' }}>
                <span className="text-navy-900 block">We bring</span>
                {/* Sliding amber phrase */}
                <span className="block overflow-hidden" style={{ height: '2.25em' }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIndex}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="block font-bold" style={{ color: '#9B1C1C' }}>
                      {slidingPhrases[phraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-navy-900 block">your growth.</span>
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-gray-500 text-[15px] leading-relaxed mb-8 max-w-md"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
                Unlock the potential of your business with our comprehensive HR and compliance solutions. From recruitment to payroll management to compliance, we provide tailored services that ensure your business runs smoothly, efficiently, and in full compliance with all regulations.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-navy-900 hover:bg-teal-600 text-white px-8 py-3.5 rounded-lg font-bold text-sm transition-all shadow-lg hover:scale-[1.02]">
                  Get Started Today <ArrowRight size={15} />
                </Link>

                {/* Services dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="inline-flex items-center gap-2 border-2 border-navy-900 text-navy-900 px-7 py-3 rounded-lg font-semibold text-sm hover:bg-navy-900 hover:text-white transition-all">
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

            {/* ── Right: Creative Image Collage ── */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>

              {/* Outer grid wrapper — fixed height */}
              <div className="relative w-full" style={{ height: '480px' }}>

                {/* Slot A — tall portrait, top-left */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute rounded-2xl overflow-hidden shadow-md border-2 border-dashed border-gray-200 bg-gray-50"
                  style={{ top: 0, left: '4%', width: '38%', height: '52%' }}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span className="text-xs font-medium tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Image</span>
                  </div>
                </motion.div>

                {/* Slot B — landscape, top-right */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute rounded-2xl overflow-hidden shadow-md border-2 border-dashed border-gray-200 bg-gray-50"
                  style={{ top: '4%', right: 0, width: '54%', height: '38%' }}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span className="text-xs font-medium tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Image</span>
                  </div>
                </motion.div>

                {/* Slot C — square, center-left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute rounded-2xl overflow-hidden shadow-md border-2 border-dashed border-gray-200 bg-gray-50"
                  style={{ top: '56%', left: '4%', width: '42%', height: '40%' }}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span className="text-xs font-medium tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Image</span>
                  </div>
                </motion.div>

                {/* Slot D — portrait, bottom-right */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="absolute rounded-2xl overflow-hidden shadow-md border-2 border-dashed border-gray-200 bg-gray-50"
                  style={{ bottom: 0, right: 0, width: '52%', height: '56%' }}>
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    <span className="text-xs font-medium tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>Image</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────── */}
      <section className="py-24 bg-navy-900 relative overflow-hidden">

        {/* Background accents */}
        <div className="absolute top-0 left-0 w-full h-1 bg-teal-500" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #9B1C1C, transparent)' }} />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #9B1C1C, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* ── Left: Content ── */}
            <div className="lg:w-[55%]">
              <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}>

                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-teal-500" />
                  <p className="text-teal-400 font-semibold tracking-[0.2em] uppercase text-xs"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>Why Labour Law</p>
                </div>

                {/* Heading */}
                <h2 className="font-bold text-white leading-[1.1] mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.9rem)' }}>
                  Expertise that protects your business &amp; empowers your
                  <span className="text-teal-400"> workforce.</span>
                </h2>

                <p className="text-white/55 mb-10 leading-relaxed text-[15px]"
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
                  We don't just file paperwork — we architect robust compliance frameworks. With India's labour law landscape shifting dramatically under the New Codes, you need a partner who anticipates regulatory changes before they impact your bottom line.
                </p>

                {/* Numbered feature rows */}
                <div className="space-y-0 mb-10">
                  {whyUs.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.12 }}
                      className="flex gap-5 py-5 border-b border-white/8 group">
                      {/* Number */}
                      <span className="text-teal-500 font-black shrink-0 leading-none mt-0.5"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.6rem' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Icon + text */}
                      <div className="flex gap-4 items-start">
                        <div className="mt-0.5 bg-teal-500/10 text-teal-400 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-1 text-[0.95rem]"
                            style={{ fontFamily: 'Poppins, sans-serif' }}>{item.title}</h4>
                          <p className="text-white/50 text-sm leading-relaxed"
                            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>{item.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="grid grid-cols-4 gap-4 mb-10 p-5 bg-white/5 rounded-2xl border border-white/8">
                  {[
                    { num: '500+', label: 'Corporate Clients' },
                    { num: '21+', label: 'Years Experience' },
                    { num: '50+', label: 'Law Experts' },
                    { num: '15+', label: 'States Covered' },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-black text-teal-400 leading-none mb-1"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.6rem' }}>{s.num}</p>
                      <p className="text-white/45 text-[11px] font-medium leading-snug"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>{s.label}</p>
                    </div>
                  ))}
                </motion.div>

                <Link to="/about"
                  className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg hover:scale-[1.02]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Learn Our Story <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Image ── */}
            <div className="lg:w-[45%]">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.65 }} className="relative">

                {/* Teal frame accent */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-teal-500/30 z-0" />

                {/* Image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img src="/assets/service-hr.png" alt="HR Experts" className="w-full h-full object-cover" />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                </div>

                {/* Floating quote card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -bottom-6 -left-6 bg-white text-navy-900 p-5 rounded-2xl shadow-2xl max-w-[260px] hidden md:block z-20 border border-gray-100">
                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mb-3">
                    <Quote size={16} className="text-white" />
                  </div>
                  <p className="text-[13px] font-semibold leading-snug text-navy-900 mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                    "Compliance is not a cost center; it's the foundation of sustainable growth."
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold">LC</div>
                    <span className="text-[11px] text-gray-400 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Labour Law Team</span>
                  </div>
                </motion.div>

                {/* Floating badge top-right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.45 }}
                  className="absolute -top-5 -right-5 w-20 h-20 bg-teal-500 rounded-2xl flex flex-col items-center justify-center shadow-xl z-20 hidden md:flex">
                  <span className="font-black text-white text-xl leading-none" style={{ fontFamily: 'Poppins, sans-serif' }}>21+</span>
                  <span className="text-white/80 text-[9px] font-semibold text-center leading-tight mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Years<br/>Expert</span>
                </motion.div>

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
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #9B1C1C 0%, transparent 60%)' }} />
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
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="py-20 bg-teal-500 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 md:px-10 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-display font-bold text-white mb-5 leading-tight">
            Ready to secure your compliance?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-base mb-10 leading-relaxed">
            Schedule a detailed consultation with our legal experts to audit your current HR practices and identify risks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-10 py-4 rounded-full font-bold hover:bg-navy-800 transition-colors shadow-xl text-sm">
              Schedule Consultation Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
