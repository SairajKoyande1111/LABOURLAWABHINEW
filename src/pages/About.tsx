
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, Award, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="w-full">

      {/* ── Page Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '400px' }}>
        <img src="/assets/service-staffing.png" alt="About Us"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/20" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 flex items-center py-16" style={{ minHeight: '400px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl max-w-md">
            <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">Who We Are</p>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-navy-900 mb-4 leading-snug">
              The Standard in Labour Law Compliance
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Over two decades of trusted expertise in Indian labour laws, HR governance, and compliance excellence.
            </p>
            <nav className="flex items-center gap-2 text-xs font-semibold">
              <Link to="/" className="bg-navy-900 text-white px-3 py-1.5 rounded-lg hover:bg-teal-600 transition-colors">Home</Link>
              <span className="text-gray-300">›</span>
              <span className="text-teal-600">About Us</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <motion.div className="lg:w-5/12"
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/assets/service-staffing.png" alt="Our Team" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 left-0 bg-teal-500 text-white p-6 rounded-br-2xl rounded-tl-2xl">
                  <div className="text-4xl font-display font-bold mb-1">21+</div>
                  <div className="text-xs font-bold uppercase tracking-widest">Years of Excellence</div>
                </div>
                <div className="absolute -top-5 -right-5 bg-navy-900 text-white p-5 rounded-2xl shadow-xl hidden md:block">
                  <div className="text-3xl font-display font-bold text-teal-400 mb-1">500+</div>
                  <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">Corporate Clients</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="lg:w-7/12"
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-4">Our Story</p>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6 leading-snug">
                Founded on a Vision of Simplified Compliance
              </h2>
              <div className="space-y-4 text-gray-600 text-[15px] leading-relaxed">
                <p>
                  Founded in 2003, Labour Law began with a singular vision: to bridge the gap between complex legal statutes and practical business operations. What started as a boutique advisory firm in Mumbai has grown into a pan-India compliance powerhouse, trusted by some of India's most respected corporations.
                </p>
                <p>
                  We recognized early that compliance is not merely about avoiding penalties — it's about creating an ethical, structured, and highly motivated workforce. Our evolution has mirrored the transformation of Indian labour laws, culminating in our unmatched expertise in the recent comprehensive Labour Law consolidation.
                </p>
                <p>
                  Today, we manage compliance for over 500 organizations, ranging from dynamic startups to Fortune 500 conglomerates, processing millions of data points annually while maintaining a pristine record of legal adherence.
                </p>
              </div>
              <Link to="/contact"
                className="inline-flex items-center gap-2 mt-9 bg-navy-900 text-white px-7 py-3 rounded-full font-semibold text-sm hover:bg-teal-600 transition-colors shadow-md">
                Start a Conversation <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────── */}
      <section className="py-20 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">Our Purpose</p>
            <h2 className="text-3xl font-display font-bold text-navy-900">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Target size={26} />
              </div>
              <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                To empower businesses with foolproof compliance strategies, enabling them to focus on growth while we secure their legal and operational foundation. We strive to make compliance a seamless, automated, and invisible part of corporate success.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.12 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-navy-900/5 text-navy-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Eye size={26} />
              </div>
              <h3 className="text-2xl font-display font-bold text-navy-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                To be the undisputed authority and most trusted partner in India for comprehensive labour law management, setting the gold standard for HR governance and ethical workforce practices across all industries and all scales of business.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────── */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-teal-400 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">What Drives Us</p>
            <h2 className="text-3xl font-display font-bold mb-3">Our Core Values</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm">The principles that guide every audit, every piece of advice, and every action we take on behalf of our clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { icon: Shield, title: "Absolute Integrity", desc: "We uphold the highest ethical standards in every engagement. In compliance, there are no shortcuts — only rigorous adherence to the letter and spirit of the law." },
              { icon: Award, title: "Unmatched Excellence", desc: "We deliver precision in every detail, backed by profound legal knowledge, continuous learning, and a commitment to staying ahead of every regulatory change." },
              { icon: Users, title: "Client Partnership", desc: "We act as a genuine extension of your team — deeply invested in your operational continuity, your growth, and your long-term success as a compliant enterprise." },
            ].map((value, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition-colors">
                <div className="w-16 h-16 mx-auto border border-teal-500/30 rounded-2xl flex items-center justify-center text-teal-400 mb-6 bg-teal-500/10">
                  <value.icon size={26} />
                </div>
                <h4 className="text-lg font-display font-bold mb-3">{value.title}</h4>
                <p className="text-white/55 leading-relaxed text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">Our Journey</motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.08 }}
              className="text-3xl font-display font-bold text-navy-900">Key Milestones</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: '2003', event: 'Established as a boutique advisory firm in Mumbai with a focus on Factory Act compliance.' },
              { year: '2009', event: 'Expanded operations to Delhi NCR and Bangalore, becoming a true pan-India firm.' },
              { year: '2016', event: 'Launched proprietary compliance tracking software to serve enterprise clients.' },
              { year: '2023', event: 'Became a go-to authority on the New Labour Codes, serving 500+ organizations.' },
            ].map((m, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.25, ease: 'easeOut' }}
                className="relative pl-6 border-l-2 border-teal-500 py-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.25, type: 'spring', stiffness: 300 }}
                  className="absolute left-[-9px] top-3 w-4 h-4 rounded-full bg-teal-500 border-2 border-white shadow" />
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.25 }}
                  className="text-teal-500 font-bold text-sm mb-2">{m.year}</motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.38 + i * 0.25 }}
                  className="text-gray-600 text-sm leading-relaxed">{m.event}</motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers CTA ───────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafb] text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-4">Join Our Team</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.07 }}
            className="text-3xl font-display font-bold text-navy-900 mb-5">Join Our Roster of Experts</motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.14 }}
            className="text-gray-500 mb-8 text-[15px] leading-relaxed">We are always looking for sharp legal minds and HR professionals who share our dedication to compliance excellence and client success.</motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
            <Link to="/careers"
              className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-teal-600 transition-colors shadow-md">
              View Career Opportunities <ChevronRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
