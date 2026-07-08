import { motion } from 'framer-motion';
import { Shield, Award, ArrowRight, CheckCircle, TrendingUp, Handshake, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@assets/7552418-hd_1080_1920_25fps_1783420764090.mp4';
import heroImage from '@assets/pexels-vlada-karpovich-7433855_1783420874088.jpg';

const PP = 'Poppins, sans-serif';

const About = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          1. HERO — Diagonal split: full-height, no collage
         ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex overflow-hidden">

        {/* Left dark panel */}
        <div className="relative z-10 flex flex-col justify-center px-10 lg:px-20 w-full lg:w-[52%] py-24"
          style={{ backgroundColor: '#a83a00' }}>
          {/* Dot texture */}
          <div className="absolute inset-0 pointer-events-none opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />

          <motion.p className="font-bold text-xs uppercase tracking-[0.25em] mb-5 relative"
            style={{ fontFamily: PP, color: '#fda102' }}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            Who We Are
          </motion.p>

          <motion.h1
            className="font-bold text-white leading-[1.1] mb-8 relative"
            style={{ fontFamily: PP, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            India's Most<br />
            <span style={{ color: '#fda102' }}>Trusted</span><br />
            Labour Law<br />Partner.
          </motion.h1>

          <motion.p
            className="text-sm leading-relaxed mb-10 max-w-sm relative"
            style={{ fontFamily: PP, color: 'rgba(255,255,255,0.75)' }}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Two decades of expertise in labour law compliance, HR governance, statutory filings, and workforce management — serving 500+ organisations across India.
          </motion.p>

          {/* Four stat pills */}
          <motion.div className="grid grid-cols-2 gap-4 max-w-xs relative"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            {[['500+','Clients'],['21+','Years'],['15+','States'],['98%','Retention']].map(([n, l]) => (
              <div key={l} className="rounded-xl p-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <p className="font-bold text-xl" style={{ fontFamily: PP, color: '#fda102' }}>{n}</p>
                <p className="text-xs uppercase tracking-wider text-white/60" style={{ fontFamily: PP }}>{l}</p>
              </div>
            ))}
          </motion.div>

          <motion.div className="mt-10 flex gap-4 relative"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Link to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-sm transition-all hover:scale-[1.03]"
              style={{ backgroundColor: '#fda102', color: '#ffffff', fontFamily: PP }}>
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link to="/services"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-sm border transition-all hover:scale-[1.03]"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', fontFamily: PP }}>
              Our Services
            </Link>
          </motion.div>
        </div>

        {/* Right: full-height image */}
        <motion.div className="hidden lg:block absolute right-0 top-0 bottom-0"
          style={{ width: '52%' }}
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}>
          <video src={heroVideo} autoPlay loop muted playsInline aria-hidden="true"
            className="w-full h-full object-cover" style={{ display: 'block' }} />
          {/* Diagonal mask */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(105deg, #a83a00 12%, transparent 38%)' }} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. OUR STORY — Wide image banner with floating card
         ══════════════════════════════════════════════════════ */}
      <section className="relative bg-white">
        {/* Full-width image strip */}
        <div className="w-full overflow-hidden" style={{ height: '420px' }}>
          <img src={heroImage} alt="" aria-hidden="true"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
        </div>

        {/* Floating content card — overlaps image */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            className="relative -mt-40 lg:-mt-52 bg-white rounded-2xl shadow-2xl p-8 lg:p-14"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left: big label */}
              <div className="lg:w-[30%] shrink-0">
                <p className="font-bold text-xs uppercase tracking-[0.22em] mb-3"
                  style={{ fontFamily: PP, color: '#a83a00' }}>Our Story</p>
                <h2 className="font-bold leading-[1.15] mb-0"
                  style={{ fontFamily: PP, fontSize: 'clamp(1.8rem, 3vw, 3rem)', color: '#111111' }}>
                  Founded<br />on a<br />Vision.
                </h2>
                <div className="mt-6 w-12 h-1 rounded-full" style={{ backgroundColor: '#fda102' }} />
              </div>
              {/* Right: text */}
              <div className="flex-1">
                <div className="space-y-4 mb-8"
                  style={{ fontFamily: PP, fontWeight: 400, color: '#555555', fontSize: '0.93rem', lineHeight: 1.85 }}>
                  <p>Founded in 2003, Maru Consultancy Services began with a singular vision: to bridge the gap between complex legal statutes and practical business operations. What started as a boutique advisory firm in Mumbai has grown into a pan-India compliance powerhouse.</p>
                  <p>We recognized early that compliance is not merely about avoiding penalties — it's about creating an ethical, structured, and highly motivated workforce aligned with India's evolving labour law framework.</p>
                  <p>Today, we manage compliance for over 500 organisations — from dynamic startups to large corporates — processing millions of data points annually while maintaining a pristine record of legal adherence.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    ['500+', 'Corporate Clients'],
                    ['21+',  'Years in Practice'],
                    ['15+',  'States Covered'],
                  ].map(([num, lbl]) => (
                    <div key={lbl} className="rounded-xl p-4 text-center"
                      style={{ backgroundColor: '#f9f5f2', border: '1px solid #ece5df' }}>
                      <p className="font-bold text-2xl mb-0.5" style={{ fontFamily: PP, color: '#a83a00' }}>{num}</p>
                      <p className="text-xs uppercase tracking-wider" style={{ fontFamily: PP, color: '#888' }}>{lbl}</p>
                    </div>
                  ))}
                </div>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold text-sm text-white transition-all hover:scale-[1.02] shadow-md"
                  style={{ backgroundColor: '#a83a00', fontFamily: PP }}>
                  Start a Conversation <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="pb-20" />
      </section>

      {/* ══════════════════════════════════════════════════════
          3. MISSION & VISION — Single split card (no grid)
         ══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ backgroundColor: '#f9f5f2' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-bold text-xs uppercase tracking-[0.22em] mb-3" style={{ fontFamily: PP, color: '#a83a00' }}>Our Purpose</p>
            <h2 className="font-bold" style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: '#111111' }}>
              Mission &amp; Vision
            </h2>
          </motion.div>

          {/* One big horizontal card, split down the middle */}
          <motion.div className="rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}>
            {/* Mission — white */}
            <div className="flex-1 p-10 lg:p-14 bg-white border-b lg:border-b-0 lg:border-r border-gray-100">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7 text-white"
                style={{ backgroundColor: '#a83a00' }}>
                <Shield size={26} />
              </div>
              <p className="font-bold text-xs uppercase tracking-[0.2em] mb-3" style={{ fontFamily: PP, color: '#fda102' }}>Mission</p>
              <h3 className="font-bold text-xl mb-5" style={{ fontFamily: PP, color: '#111111' }}>Empower Through Compliance</h3>
              <p style={{ fontFamily: PP, color: '#555', fontSize: '0.92rem', lineHeight: 1.85 }}>
                To empower businesses with foolproof compliance strategies, enabling them to focus on growth while we secure their legal and operational foundation. We strive to make compliance a seamless, automated part of corporate success.
              </p>
              <div className="mt-8 space-y-3">
                {['Zero-penalty compliance track record', 'Tech-enabled statutory tracking', 'Dedicated consultant per client'].map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <CheckCircle size={15} style={{ color: '#fda102', flexShrink: 0 }} />
                    <span style={{ fontFamily: PP, fontSize: '0.85rem', color: '#444' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision — tinted */}
            <div className="flex-1 p-10 lg:p-14" style={{ backgroundColor: '#a83a00' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <TrendingUp size={26} color="#fda102" />
              </div>
              <p className="font-bold text-xs uppercase tracking-[0.2em] mb-3" style={{ fontFamily: PP, color: '#fda102' }}>Vision</p>
              <h3 className="font-bold text-xl mb-5 text-white" style={{ fontFamily: PP }}>India's Gold Standard</h3>
              <p style={{ fontFamily: PP, color: 'rgba(255,255,255,0.78)', fontSize: '0.92rem', lineHeight: 1.85 }}>
                To be the undisputed authority and most trusted partner in India for comprehensive labour law management, setting the gold standard for HR governance and ethical workforce practices across all industries and all scales of business.
              </p>
              <div className="mt-8 space-y-3">
                {['Pan-India authority in New Labour Codes', 'Ethical and transparent practices', 'Long-term client partnerships'].map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <CheckCircle size={15} style={{ color: '#fda102', flexShrink: 0 }} />
                    <span style={{ fontFamily: PP, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. CORE VALUES — Stacked vertical with side image
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">

            {/* Left: sticky image */}
            <motion.div className="lg:w-[42%] shrink-0"
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ height: '520px' }}>
                  <img src={heroImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 rounded-2xl p-6 shadow-xl"
                  style={{ backgroundColor: '#fda102' }}>
                  <p className="font-bold text-3xl text-white" style={{ fontFamily: PP }}>21+</p>
                  <p className="text-xs uppercase tracking-widest text-white/80" style={{ fontFamily: PP }}>Years of Excellence</p>
                </div>
              </div>
            </motion.div>

            {/* Right: stacked value rows */}
            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="font-bold text-xs uppercase tracking-[0.22em] mb-3" style={{ fontFamily: PP, color: '#a83a00' }}>What Drives Us</p>
                <h2 className="font-bold mb-10" style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: '#111111' }}>
                  Our Core Values
                </h2>
              </motion.div>
              <div className="space-y-0 divide-y divide-gray-100">
                {[
                  { num: '01', icon: <Shield size={22} />, title: 'Absolute Integrity', desc: 'Upholding the highest ethical standards in every engagement — no shortcuts, only rigorous adherence to the letter and spirit of the law.' },
                  { num: '02', icon: <Award size={22} />, title: 'Unmatched Excellence', desc: 'Precision in every detail, backed by profound legal knowledge and a commitment to staying ahead of every regulatory change.' },
                  { num: '03', icon: <Handshake size={22} />, title: 'Client Partnership', desc: 'A genuine extension of your team — deeply invested in your operational continuity, growth, and long-term success.' },
                  { num: '04', icon: <Star size={22} />, title: 'Continuous Innovation', desc: 'Embracing technology and new methodologies to deliver faster, smarter, and more accurate compliance solutions.' },
                ].map((v, i) => (
                  <motion.div key={i}
                    className="flex gap-6 py-7 items-start"
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
                    <p className="font-bold text-sm shrink-0 w-8 pt-1" style={{ fontFamily: PP, color: '#fda102' }}>{v.num}</p>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: '#a83a00' }}>
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1.5 text-base" style={{ fontFamily: PP, color: '#111' }}>{v.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: PP, color: '#666' }}>{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. MILESTONES — Horizontal zigzag timeline
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#f9f5f2' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-bold text-xs uppercase tracking-[0.22em] mb-3" style={{ fontFamily: PP, color: '#a83a00' }}>Our Journey</p>
            <h2 className="font-bold" style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: '#111111' }}>Key Milestones</h2>
          </motion.div>

          {/* Zigzag: odd items above line, even items below */}
          <div className="relative">
            {/* Center horizontal line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 hidden lg:block"
              style={{ backgroundColor: '#fda102', opacity: 0.4 }} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
              {[
                { year: '2003', event: 'Established as a boutique advisory firm in Mumbai with a focus on Factory Act compliance.', above: true },
                { year: '2009', event: 'Expanded operations to Delhi NCR and Bangalore — true pan-India presence.', above: false },
                { year: '2016', event: 'Launched proprietary compliance tracking tools for enterprise-scale clients.', above: true },
                { year: '2023', event: 'Became the go-to authority on New Labour Codes, serving 500+ organisations.', above: false },
              ].map((m, i) => (
                <motion.div key={i}
                  className={`relative flex flex-col ${m.above ? 'lg:flex-col' : 'lg:flex-col-reverse'} items-center`}
                  initial={{ opacity: 0, y: m.above ? -24 : 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}>
                  {/* Text block */}
                  <div className={`rounded-2xl p-6 mx-4 mb-4 lg:mb-0 ${m.above ? 'lg:mb-6' : 'lg:mt-6'}`}
                    style={{ backgroundColor: m.above ? '#ffffff' : '#a83a00', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                    <p className="font-bold text-xl mb-2" style={{ fontFamily: PP, color: m.above ? '#a83a00' : '#fda102' }}>{m.year}</p>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: PP, color: m.above ? '#555' : 'rgba(255,255,255,0.82)' }}>{m.event}</p>
                  </div>
                  {/* Dot on the line */}
                  <div className="w-5 h-5 rounded-full border-4 border-white shadow-md shrink-0"
                    style={{ backgroundColor: '#fda102' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. TEAM — Asymmetric: 1 large founder + 3 small
         ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-bold text-xs uppercase tracking-[0.22em] mb-3" style={{ fontFamily: PP, color: '#a83a00' }}>The People Behind Our Work</p>
            <h2 className="font-bold" style={{ fontFamily: PP, fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', color: '#111111' }}>Our Leadership Team</h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Large founder card */}
            <motion.div className="lg:w-[40%] shrink-0 rounded-3xl overflow-hidden shadow-lg group"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative h-full" style={{ minHeight: '460px', background: 'linear-gradient(145deg, #a83a00 0%, #7a2900 100%)' }}>
                <div className="absolute inset-0 pointer-events-none opacity-5"
                  style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 text-center">
                  <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-5xl font-bold text-white mb-6 group-hover:scale-105 transition-transform"
                    style={{ fontFamily: PP, backgroundColor: 'rgba(253,161,2,0.25)', borderColor: '#fda102' }}>
                    R
                  </div>
                  <div className="w-10 h-0.5 mb-5" style={{ backgroundColor: '#fda102' }} />
                  <h4 className="font-bold text-white text-xl mb-2" style={{ fontFamily: PP }}>Ramesh Maru</h4>
                  <p className="font-semibold text-xs uppercase tracking-widest mb-4" style={{ fontFamily: PP, color: '#fda102' }}>Founder & Managing Director</p>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: PP, color: 'rgba(255,255,255,0.7)' }}>
                    21+ years of expertise in Indian labour law, statutory compliance, and HR governance across all industry verticals.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3 smaller cards in a grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3 gap-6">
              {[
                { name: 'Priya Sharma',  role: 'Head of HR Advisory',            initial: 'P', spec: 'HR Policy & Workforce Management' },
                { name: 'Ankit Verma',   role: 'Director — Payroll & Statutory',  initial: 'A', spec: 'Payroll Processing & PF/ESIC' },
                { name: 'Sunita Patel',  role: 'Senior Legal Consultant',          initial: 'S', spec: 'Labour Litigation & Compliance Audits' },
              ].map((member, i) => (
                <motion.div key={i}
                  className="flex items-center gap-5 rounded-2xl p-6 bg-white border hover:shadow-md transition-all hover:-translate-y-0.5"
                  style={{ borderColor: '#ece5df' }}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
                    style={{ fontFamily: PP, backgroundColor: '#a83a00' }}>
                    {member.initial}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ fontFamily: PP, color: '#111' }}>{member.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ fontFamily: PP, color: '#a83a00' }}>{member.role}</p>
                    <p className="text-xs" style={{ fontFamily: PP, color: '#888' }}>{member.spec}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. CTA — Full-bleed typographic quote
         ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#a83a00' }}>
        {/* Background dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }} />
        {/* Large decorative text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-bold text-white opacity-[0.04]"
            style={{ fontFamily: PP, fontSize: 'clamp(6rem, 18vw, 18rem)', whiteSpace: 'nowrap', lineHeight: 1 }}>
            MARU
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="font-bold text-xs uppercase tracking-[0.25em] mb-6"
            style={{ fontFamily: PP, color: '#fda102' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            Join Our Team
          </motion.p>
          <motion.h2 className="font-bold text-white leading-[1.1] mb-8"
            style={{ fontFamily: PP, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}>
            Are you a sharp legal mind<br />
            looking for your next<br />
            <span style={{ color: '#fda102' }}>big challenge?</span>
          </motion.h2>
          <motion.p className="text-sm leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ fontFamily: PP, color: 'rgba(255,255,255,0.75)' }}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}>
            We are always looking for HR professionals and legal experts who share our dedication to compliance excellence and client success.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.24 }}>
            <Link to="/careers"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-sm transition-all hover:scale-[1.04] shadow-lg"
              style={{ backgroundColor: '#fda102', color: '#ffffff', fontFamily: PP }}>
              View Opportunities <ArrowRight size={16} />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-sm border transition-all hover:scale-[1.04]"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', fontFamily: PP }}>
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
