import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, ShieldCheck, FileText, Users, Building, ChevronRight, Award, Clock, Target, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { value: '500+', label: 'Corporate Clients' },
    { value: '21+', label: 'Years Experience' },
    { value: '50+', label: 'Legal Experts' },
    { value: '15+', label: 'States Covered' },
  ];

  const testimonials = [
    { text: "Labour Codes transformed our chaotic compliance process into a streamlined, risk-free system. Their expertise in the New Wage Code is unmatched.", author: "Rajesh Sharma", role: "HR Director, TechNova" },
    { text: "Their proactive approach to statutory audits saved us from significant penalties. They don't just consult; they partner with you.", author: "Meera Reddy", role: "CEO, Manufacturing Corp" },
    { text: "The contract staffing solutions provided by LC allowed us to scale rapidly during our peak season without any compliance headaches.", author: "Vikram Singh", role: "VP Operations, Retail Giant" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white overflow-hidden py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0 opacity-40">
          <img src="/src/assets/hero-office.png" alt="Corporate Office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-transparent mix-blend-multiply"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block bg-teal-500/20 text-teal-400 font-semibold tracking-widest uppercase text-xs mb-6 px-3 py-1 rounded-full border border-teal-500/30">India's Premier HR & Compliance Firm</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
                Navigate the New Labour Codes with Confidence.
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                Protect your business, optimize payroll, and ensure 100% statutory compliance with India's leading labour law consultants.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-teal-500 text-white px-8 py-4 rounded font-medium hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20 flex items-center gap-2">
                  Get Free Consultation <ArrowRight size={18} />
                </Link>
                <Link to="/services" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded font-medium hover:bg-white/20 transition-colors">
                  Explore Services
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-navy-800 text-white py-16 border-y border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-display font-bold mb-2 text-teal-400">{stat.value}</div>
                <div className="text-white/60 font-medium text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4 block">Why Labour Codes</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-6 leading-tight">Expertise that protects your business and empowers your workforce.</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We don't just file paperwork; we architect robust compliance frameworks. With the landscape of Indian labour laws shifting dramatically, you need a partner who anticipates regulatory changes before they impact your bottom line.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Pan-India Presence", desc: "Expertise across state-specific regulations and central laws." },
                    { title: "Technology-Driven", desc: "Proprietary tools for real-time compliance tracking and audits." },
                    { title: "Proactive Risk Mitigation", desc: "Identifying vulnerabilities before they become liabilities." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 bg-teal-50 text-teal-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-navy-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                  <img src="/src/assets/service-hr.png" alt="HR Experts" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-navy-900 text-white p-8 rounded-lg shadow-xl max-w-xs hidden md:block">
                  <Quote size={32} className="text-teal-500 mb-4 opacity-50" />
                  <p className="font-display text-lg leading-snug">"Compliance is not a cost center; it's the foundation of sustainable growth."</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-4">Comprehensive Compliance Solutions</h2>
            <p className="text-gray-600">Strategic guidance across the entire spectrum of Indian labour laws and human resource management.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Labour Law Compliance', img: '/src/assets/service-labour.png', desc: 'End-to-end compliance with all applicable central and state labour legislation.' },
              { title: 'Payroll & Salary Structuring', img: '/src/assets/service-payroll.png', desc: 'Payroll processing and salary structure auditing optimized for New Labour Codes.' },
              { title: 'Statutory Filings', img: '/src/assets/service-statutory.png', desc: 'PF, ESIC, PT, LWF, TDS management, regular returns and statutory filings.' },
            ].map((service, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-display font-bold text-navy-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
                  <Link to="/services/labour-law-compliance" className="text-teal-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                    Read more <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 text-navy-900 font-bold hover:text-teal-600 transition-colors border-b-2 border-navy-900 hover:border-teal-600 pb-1">
              View All 9+ Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500 via-navy-900 to-navy-900"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-teal-400">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white/5 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="flex text-teal-400 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p className="text-lg font-display italic mb-8 leading-relaxed">"{test.text}"</p>
                <div>
                  <p className="font-bold text-white">{test.author}</p>
                  <p className="text-sm text-white/60">{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientele Strip */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Serving 500+ Corporations Across India</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {['HDFC Bank', 'Tata Motors', 'Reliance', 'Wipro', 'Infosys', 'L&T'].map((client) => (
              <div key={client} className="text-2xl font-display font-black text-navy-900 tracking-tight">{client.toUpperCase()}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2 block">Knowledge Hub</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">Recent Insights & Resources</h2>
            </div>
            <Link to="/resources" className="hidden md:flex items-center gap-2 text-navy-900 font-bold hover:text-teal-600 transition-colors border-b-2 border-navy-900 hover:border-teal-600 pb-1">
              View All Resources <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { category: 'Updates', title: 'Understanding the New Wage Code', desc: 'A comprehensive guide to how the new definitions of wages impact your salary structure.', img: '/src/assets/service-payroll.png' },
              { category: 'Compliance', title: 'Navigating State-Specific Leaves', desc: 'Analyzing the variations in sick, casual, and earned leaves across different Indian states.', img: '/src/assets/service-hr.png' },
              { category: 'Litigation', title: 'Preparing for Labour Inspections', desc: 'Key documents and registers you must have updated before an unexpected factory inspection.', img: '/src/assets/service-audits.png' }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow flex flex-col group">
                <div className="h-48 relative overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">{post.category}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-navy-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{post.desc}</p>
                  <Link to="/resources" className="text-teal-600 font-bold flex items-center gap-2 hover:text-navy-900 transition-colors mt-auto">
                    Read Article <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-teal-600 text-center">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to secure your compliance?</h2>
          <p className="text-teal-100 text-lg mb-10">Schedule a detailed consultation with our legal experts to audit your current HR practices.</p>
          <Link to="/contact" className="inline-block bg-navy-900 text-white px-10 py-4 rounded font-bold hover:bg-navy-800 transition-colors shadow-xl shadow-navy-900/20 text-lg">
            Schedule Consultation Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;