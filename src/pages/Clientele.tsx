import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { ALL_CLIENTS } from '../components/ClientLogos';

const Clientele = () => {
  const clients = ALL_CLIENTS.slice(0, 8);

  const industries = [
    { name: 'Banking & Finance',    count: '85+'  },
    { name: 'Manufacturing',        count: '120+' },
    { name: 'Information Technology', count: '95+' },
    { name: 'Retail & FMCG',        count: '70+'  },
    { name: 'Hospitality',          count: '45+'  },
    { name: 'Healthcare & Pharma',  count: '55+'  },
  ];

  const testimonials = [
    { text: "Labour Codes transformed our chaotic compliance process into a streamlined, risk-free system. Their expertise in the New Wage Code is unmatched in the industry.", author: "Rajesh Sharma", role: "HR Director, TechNova", initials: "RS" },
    { text: "Their proactive approach to statutory audits saved us from significant penalties. They don't just consult — they become an extension of your team.", author: "Meera Reddy", role: "CEO, Manufacturing Corp", initials: "MR" },
    { text: "The contract staffing solutions provided by LC allowed us to scale rapidly during our peak season without any compliance headaches whatsoever.", author: "Vikram Singh", role: "VP Operations, Retail Giant", initials: "VS" },
    { text: "We've worked with multiple compliance firms. Labour Codes stands apart in their responsiveness, depth of knowledge, and ability to handle multi-state complexity.", author: "Ananya Patel", role: "CFO, Logistics Corp", initials: "AP" },
    { text: "The POSH training and HR policy review they conducted for us was thorough and practical. Our ICC is now fully constituted and documented as required.", author: "Suresh Kumar", role: "CHRO, IT Company", initials: "SK" },
    { text: "Our factory audit revealed gaps we didn't know existed. The remediation plan was actionable and their team was available every step of the way.", author: "Priya Nair", role: "GM Compliance, Industrial Group", initials: "PN" },
  ];

  return (
    <div className="w-full">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 'calc(100vh - 114px)', minHeight: '500px', maxHeight: '820px' }}>
        <img src="/assets/service-hr.png" alt="Our Clientele"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/50 to-navy-900/10" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 h-full flex items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl max-w-md">
            <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">Trusted Partners</p>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-navy-900 mb-4 leading-snug">
              Our Esteemed Clientele
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Trusted by India's largest corporations to safeguard their compliance, manage their workforce regulations, and navigate complex labour law challenges.
            </p>
            <nav className="flex items-center gap-2 text-xs font-semibold">
              <Link to="/" className="bg-navy-900 text-white px-3 py-1.5 rounded-lg hover:bg-teal-600 transition-colors">Home</Link>
              <span className="text-gray-300">›</span>
              <span className="text-teal-600">Clientele</span>
            </nav>
          </motion.div>
        </div>
      </section>

      {/* ── Industries ────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">Industry Spread</p>
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-3">Sectors We Serve</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">Our compliance expertise spans every major sector of the Indian economy.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="rounded-xl p-5 text-center border border-gray-100 bg-[#f8fafb] hover:border-teal-200 hover:bg-white transition-all">
                <div className="text-2xl font-display font-bold mb-1 text-teal-500">{ind.count}</div>
                <div className="text-xs font-semibold leading-tight text-gray-500">{ind.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Grid ───────────────────────────────────── */}
      <section className="py-20 bg-[#f8fafb]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">Our Portfolio</p>
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">Companies We've Served</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">From nimble startups to Fortune 500 conglomerates — our expertise spans every scale and sector of Indian industry.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map(({ name, Logo }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="bg-white border border-gray-100 aspect-[3/2] rounded-2xl flex items-center justify-center px-8 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all group cursor-default grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
              >
                <Logo />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-teal-500 font-bold text-[11px] uppercase tracking-[0.18em] mb-3">What They Say</p>
            <h2 className="text-3xl font-display font-bold text-navy-900 mb-3">Client Testimonials</h2>
            <p className="text-gray-500 text-sm">Hear from the HR directors and compliance heads who trust us daily.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-[#f8fafb] border border-gray-100 rounded-2xl p-7 hover:shadow-md transition-shadow">
                <div className="flex text-teal-500 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="currentColor" />)}
                </div>
                <p className="text-navy-900 text-sm italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm">{t.author}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-teal-500 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #ffffff 0%, transparent 60%)' }} />
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-display font-bold mb-5">Join industry leaders who trust Labour Codes.</h2>
          <p className="text-white/80 mb-8 leading-relaxed">Let's discuss how we can support your compliance and HR requirements across every state you operate in.</p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-navy-800 transition-colors shadow-xl">
            Discuss Your Requirements <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Clientele;
